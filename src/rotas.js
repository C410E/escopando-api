const express = require("express")
const { 
    obterPerfil, 
    cadastroUsuario, 
    atualizarPerfil 
} = require("./controladores/usuario/usuario")
const { login } = require("./controladores/usuario/login")
const { verificaLogin } = require("./filtros/verificaLogin")
const { novaPostagem } = require("./controladores/postagens/postagens")
const { curtir } = require("./controladores/curtir/curtir")
const { comentar } = require("./controladores/comentar/comentar")
const { feed } = require("./controladores/feed/feed")

const rotas = express()

rotas.post("/cadastro", cadastroUsuario)

rotas.post("/login", login)

rotas.use(verificaLogin)

rotas.get("/perfil", obterPerfil)

rotas.put("/perfil", atualizarPerfil)

rotas.post("/postagens", novaPostagem)

rotas.get("/postagens", feed)

rotas.post("/postagens/:postagemId/curtir", curtir)

rotas.post("/postagens/:postagemId/comentar", comentar)

module.exports = rotas