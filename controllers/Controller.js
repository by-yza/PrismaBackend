const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async listarProprietarios(req,res){
        try {
            const proprietarios = await prisma.proprietario.findMany();
            res.status(200).json(proprietarios);

        }catch(error){
            res.status(500).json({ error: "Erro ao listar os proprietários"})
        }
    },
    async listarProdutos(req,res){
        try {
            const produtos = await prisma.produto.findMany();
            for(produto of produtos){
                let proprietarioId = produto.proprietarioId
                let proprietario = await prisma.proprietario.findUnique({
                    where: { id: Number(proprietarioId) }
                });
                let proprietarioNome = proprietario.nome
                produto.proprietarioNome = proprietarioNome
            }
            
            res.status(200).json(produtos);

        }catch(error){
            res.status(500).json({ error: "Erro ao listar os produtos"})
        }
    },
}