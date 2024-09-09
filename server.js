/*
    INSTALANDO O NPM (Gerenciador de pacotes do Node)

    npm init (DESSA FORMA PEDE VÁRIAS COISAS)

    npm init -y (CONFIRMA TODAS AS COISAS, MAS PODEMOS ALTERAR NO Package.json)
    
    -----------------------

    INSTALANDO O EXPRESS

    npm i (ou install) express
*/

// ANTIGO
// const express = require("express")

// NOVO

// preciso ter o "type": "module", no package.json

/*
    HTTP Métodos

    GET => Listar
    POST => Criar
    PUT => Editar vários
    PATCH => Editar um
    DELETE => Deletar

    --------------------

    Códigos HTTP

    2xx => Confirmação / Sucesso
    |    200 => Requisição realizada com sucesso
    |    201 => Criado - Requisição de criação realizada com sucesso.

    4xx => Erro do cliente (front-end)
    |    400 => Bad Request
    |    401 => Unauthorized
    |    403 => Forbidden (Proibido)
    |    404 => Not Found (Não foi encontrado)

    5xx => Erro no servidor (falha ao concluir solicitação)
    |    500 => Internal Server Error
    |    502 => Bad Gateway

    ---------------------------------------------------------------

    JSON (JavaScript Object Notation)

    Estrutura (para JAVA, C#...):

    {
        "name": "Gustavo",
        "email": "gustavo@email.com",
        "hobbies": ["Estudar", "Treinar", "Ler"],
        "address": {
            "street": "Rua Dos Bobos",
            "number": 0
    }

    NÃO SE DEVE USAR VÍRGULA NO FINAL
*/

import express from 'express'
import cors from 'cors' // importando o cors => yarn add cors / npm i cors
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express() // node server.js para rodar o servidor

// const users = [] // array para guardar os usuários criados no método post

app.use(express.json()) // AVISANDO O EXPRESS QUE ESTOU USANDO O JSON
app.use(cors()) // liberando o cors | colocar o endereço quando a aplicação subir para o servidor

app.get('/usuarios', async (req, res) => { // req = requisição / res = resposta
    //console.log(req.params) // mostrando a requisição do query params / route params
    
    const users = await prisma.user.findMany()

    res.status(200).json(users) // respondendo o método get mandando os usuários cadastrados
})

app.post('/usuarios', async (req, res) => {
    //users.push(req.body) // gravando a requisição do método post no array users

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(user) // respondendo o método post mandando o usuário
})

app.put('/usuarios/:id', async (req, res) => {
    //users.push(req.body) // gravando a requisição do método post no array users

    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(200).json(user) // respondendo o método post mandando o usuário
})

app.delete('/usuarios/:id', async (req, res) => {
    //users.push(req.body) // gravando a requisição do método post no array users

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado'}) // respondendo o método post mandando o usuário
})

app.listen(3000)

// node --watch server.js = rodando o servidor e iniciado sempre que atualizo

// http://localhost:3000/

// Thunder Client para simular requisições do front end

/*  
    MongoDB:

    gustavo
    gustavo
*/

/*
    INSTALANDO O PRISMA

    npm install prisma --save-dev

    npx prisma init

    INSTALAR AS EXTENSÕES DO PRISMA:
    Prisma e Prisma-Insider
*/