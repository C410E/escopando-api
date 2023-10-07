const knex = require("../../conexao")

const curtir = async (req, res) => {
    const { id } = req.usuario
    const { postagemId } = req.params 

    try {
        const postagem = await knex("postagens").where({ id: postagemId }).first()

        if (!postagem) {
            return res.status(400).json({ mensagem: "Postagem não encontrada."})
        }

        const jaCurtiu = await knex("postagens_curtidas")
        .where({ usuario_id: id, postagem_id: postagem.id})
        .first()

        if (jaCurtiu) {
            return res.status(400).json({ mensagem: "O usuario já curtiu essa postagem"})
        }

        const curtidas = await knex("postagens_curtidas")
        .insert({
            usuario_id: id,
            postagem_id: postagem.id
        })

        if (!curtidas) {
            return res.status(400).json({ mensagem: "Não foi possivel curtir essa postagem"})
        }
        return res.status(200).json({mensagem: "postagem curtida com sucesso"})
        
    } catch (error) {
        return res.status(400).json(res.message)
    }
}


module.exports = {
    curtir
}