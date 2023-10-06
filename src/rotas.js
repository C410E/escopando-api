const express = require("express")
const { 
    obterPerfil, 
    cadastroUsuario, 
    atualizarPerfil 
} = require("./controladores/usuario/usuario")
const { login } = require("./controladores/usuario/login")
const verificaLogin = require("./filtros/verificaLogin")

const rotas = express()

rotas.post("/cadastro", cadastroUsuario)

rotas.post("/login", login)

rotas.use(verificaLogin)

rotas.get("/perfil", obterPerfil)

rotas.put("/perfil", atualizarPerfil)

module.exports = rotas