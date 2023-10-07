const knex = require("../../conexao")

const comentar = async (req, res) => {
    const { id } = req.usuario
    const { postagemId } = req.params 
    const { texto } =req.body

    if (!texto) {
        return res.status(400).json({ mensagem: "Para comentar nessa postagem é necessario informar o texto"})
    }

    try {
        const postagem = await knex("postagens").where({ id: postagemId }).first()

        if (!postagem) {
            return res.status(400).json({ mensagem: "Postagem não encontrada."})
        }

        const comentario = await knex("postagem_comentarios")
        .insert({
            usuario_id: id,
            postagem_id:postagem.id,
            texto
        })

        if (!comentario) {
            return res.status(400).json({ mensagem: "Não foi possivel comentar essa postagem"})
        }
        return res.status(200).json({mensagem: "postagem comentada com sucesso"})
        
    } catch (error) {
        return res.status(400).json(res.message)
    }
}


module.exports = {
    comentar
}