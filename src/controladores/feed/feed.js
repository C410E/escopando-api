const knex = require("../../conexao")


const feed = async (req, res) => {
    const { id } = req.usuario
    const { offset} = req.query

    const o = offset ? offset : 0

    try {
        // const postagens = await knex("postagens").limit(10).offset(o)
        const postagens = await knex("postagens")
        .where("usuario_id", "!=", id)
        .limit(10)
        .offset(o)

        if (postagens.length === 0) {
            return res.status(200).json(postagens)
        }

        for (const postagem of postagens) {
            //usuario
            const usuario = await knex("usuarios")
                .where({ id: postagem.id})
                .select("imagem", "username", "verificado")
                .first()

            postagem.usuario = usuario

            //fotos
            const fotos = await knex("postagens_fotos")
                .where({ postagem_id: postagem.id})
                .select("imagem")

            postagem.fotos = fotos

            //curtidas
            const curtidas = await knex("postagens_curtidas")
                .where({ postagem_id: postagem.id})
                .select("usuario_id")
            postagem.curtidas = curtidas.length
            //curtido por min
            postagem.curtidaPorMin = curtidas.find(curtida => curtida.usuario_id === id) ? true : false
            //comentarios

            const comentarios = await knex("postagem_comentarios")
                .leftJoin("usuarios", "usuarios.id", "postagem_comentarios.usuario_id")
                .where({ postagem_id: postagem.id })
                .select("usuarios.username", "postagem_comentarios.texto");

            postagem.comentarios = comentarios;

            //parei em 13:43 do video criação feed
        }

        return res.status(200).json(postagens)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}


module.exports = {
    feed
}