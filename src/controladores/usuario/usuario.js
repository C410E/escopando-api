const knex = require("../../conexao")
const bcrypt = require("bcrypt")

const cadastroUsuario = async (req, res) => {
    const {username, senha} = req.body

    if (!username) {
        return res.status(404).json({mensagem: "O campo username é obrigatorio"})
    }
    if (!senha) {
        return res.status(404).json({mensagem: "O campo senha é obrigatorio"})
    }
    if (senha.length < 5) {
        return res.status(404).json({mensagem: "A senha deve conter, no minimo 5 caracteres"})
    }
    try {
        const quantidadeUsuario = await knex("usuarios").where({ username }).first()

        if (quantidadeUsuario) {
            return res.status(400).json({mensagem: "o username já existe"})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuario = await knex("usuarios").insert({
            username,
            senha: senhaCriptografada
        })

        if (!usuario) {
            return res.status(400).json({mensagem: "o usuario não foi cadastrado"})
        }

        return res.status(200).json({mensagem: "usuario cadastrado com sucesso"})
    } catch (error) {
        console.log(error)
        return res.json(error.message)
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario)
}

const atualizarPerfil = async (req, res) => {
    let {
        nome,
        email,
        senha,
        imagem,
        username,
        site,
        bio,
        telefone,
        genero
    } = req.body

    const { id } = req.usuario

    if (!nome && !email && !senha && !imagem && !username && !site && !bio && !telefone && !genero) {
        return res.status(404).json({mensagem: "é obrigatorio informar ao menos um campopara atualização"})
    }

    try {

        if (senha) {
            if (senha.length < 5) {
                return res.status(404).json({mensagem: "A senha deve conter, no minimo 5 caracteres"})
            }
            senha = await bcrypt.hash(senha, 10)
        }

        if (email != req.usuario.email) {
            const emailUsuarioExiste = await knex("usuarios").where({ email }).first()

            if (emailUsuarioExiste) {
                return res.status(404).json({mensagem: "email já existe"})
            }
        }

        if (username != req.usuario.username) {
            const usuarioExiste = await knex("usuarios").where({username}).first()

            if (usuarioExiste) {
                return res.status(404).json({mensagem: "username já existe"})
            }
        }

        const usuarioAtualizado = await knex("usuarios")
        .where({id})
        .update({
            nome,
            email,
            senha,
            imagem,
            username,
            site,
            bio,
            telefone,
            genero
        })
        if (!usuarioAtualizado) {
            return res.status(400).json({mensagem: "usuario não atualizado"})
        }

        return res.status(200).json("usuario atualizado com sucesso")

    } catch (error) {
        return res.json(error.message)
    }
}

module.exports = {
    cadastroUsuario,
    obterPerfil,
    atualizarPerfil,
}