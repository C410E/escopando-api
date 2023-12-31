const knex = require("../../conexao")

const novaPostagem = async (req, res) => {
    const { id } = req.usuario
    const { texto, fotos } = req.body

    if (!fotos || fotos.length === 0) {
        return res.status(404).json({mensagem: "É preciso postar ao menos uma foto."})
    }
    try {
        const postagem = await knex("postagens").insert({texto, usuario_id: id}).returning("*")

        if (!postagem) {
            return res.status(400).json({mensagem: "Não foi possivel concluir a postagem"})
        }

        for (const foto of fotos) {
           foto.postagem_id = postagem[0].id  
        }

        const fotosCadastradas = await knex("postagens_fotos").insert(fotos)

        if (!fotosCadastradas) {
            await knex("postagens").where({ id: postagem[0].id }).del()
            return res.status(400).json({mensagem: "Não foi possivel concluir a postagem"})
        }

        return res.status(200).json({mensagem: "Postagem realizada com sucesso"})
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    novaPostagem
}

// exemplo do body de /postagem

// {
//     "texto" : "gatoPacoca é muito bonito",
//     "fotos": [
//         {
//             "imagem": "https://fotogatolaranja"
//         }
//     ]
// }