/*******************************************
 * Objetivo: 
 * Data:13/11/2024
 * Autor:Gabriel Silva Guedes
 * Versão:1.0
 *******************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//INICIA A UTILIZACAO DO EXPRESS
const app= express()

app.use((request, response, next)=>{
    //Permissao de onde virao a requisicao na API
    //('*')-Fica liberado para qualquer maquina
    //('ip')-restringe para uma maquina
    response.header('Access-Control-Allow-Origin', '*')
    //Permissão de quais metodos a API irá responder

    /******Metodo do HTTP*********\
    |> get - pegar dados da api   |
    |> post- inserir dados na api |
    |> put- alterar algo na api   |
    |> delete- deletar algo na api|
    \*****************************/

    response.header('Access-Control-Allow-Methods','GET')
    //Aplica as restricoes para o CORS da requisicao
    app.use(cors())
    next()
})

const funcoes = require('./modulo/funcoes.js')

//criando endpoint para retornar todos os estados
app.get('/v1/lion-school/cursos', cors(), async function (request, response){

    //pra conseguir fazer o teste, chama a função e retorna todos os estados
    let cursos = funcoes.getlistarcursos()

    //resposta da api com o json e o status code (dados se tiver conteúdo)
    if(cursos){
        response.status(200)
        response.json(cursos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados cursos para retornar'})
    }

})
app.get('/v1/lion-school/alunos', cors(), async function (request, response){

    //pra conseguir fazer o teste, chama a função e retorna todos os estados
    let alunos = funcoes.getlistaralunos()

    //resposta da api com o json e o status code (dados se tiver conteúdo)
    if(alunos){
        response.status(200)
        response.json(alunos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foram encontrados alunos para retornar'})
    }

})

//endpoint que retorna os dados de um estado filtrando pela sigla (via parametro)
app.get('/v1/ion-school/alunos/:matricula', cors(), async function (request, response) {
    //recebe o conteudo da variavel sigla que sera enviada na url da requisição
    let matricula = request.params.matricula

    //chama a função que irá receber a sigla e retornar os dados referente ao estado
    let alunos = funcoes.getmatricula(matricula)

    if(alunos){
        response.status(200)
        response.json(alunos)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado o aluno informado'})
    }
})

//outra forma de receber a sigla (query string)
app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function (request, response) {
//recebe a variavel sigla atraves do modelo query string
    let materia = request.params.sigla

    let diciplina = funcoes.getdsredes(materia)

    if(diciplina){
        response.status(200)
        response.json(diciplina)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível localizar o curso informado.'})
    }
})

app.get('/v1/lion-school/alunos/filtro:status', cors(), async function (request, response) {

    let status = request.params.status

    let dados = funcoes.getstatus(status)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrada a região'})
    }
})

app.get('/v1/lion-school/alunos/curso/:curso/status/:status', cors(), async function (request, response) {

    let status = request.params.status
    let curso = request.params.curso
    let dados = funcoes.getcursostatus(curso, status)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrada os alunos'})
    }
})

app.get('/v1/lion-school/alunos/curso/:curso/anoconclusao/:ano', cors(), async function (request, response) {

    let anoconclusao = request.params.ano
    let curso = request.params.curso
    let dados = funcoes.getconclusao(curso, anoconclusao)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrada os alunos'})
    }
})


const part=process.env.PORT || 8080
//configurando a porta que a api vai rodar, executa a api e faz com que fique aguardando novas aquisições
app.listen(port, function(){
    console.log('API funcionando e aguardando requisições..')
})
