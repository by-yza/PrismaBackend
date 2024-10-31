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
    async proprietarioPorNome(req,res){
        try {
            const nome = req.params.nome;
            const proprietarios = await prisma.proprietario.findMany({
                where:{
                    nome:{
                        contains:nome
                    }
                }
            });
            res.status(200).json(proprietarios);
        }catch(error){
            res.status(500).json({ error: "Erro ao listar proprietário por nome"})
        }
    },
    async produtoMaiorQuantidade(req,res){
        try {
            const produtos = await prisma.produto.findMany({
                orderBy:{
                    quantidade:"desc"
                }
            });
            res.status(200).json(produtos[0]);
        }catch(error){
            res.status(500).json({ error: "Erro ao listar proprietário por nome"})
        }
    },
    async produtoMaiorValor(req,res){
        try {
            const produtos = await prisma.produto.findMany({
                orderBy:{
                    valor:"desc"
                }
            });
            res.status(200).json(produtos[0]);
        }catch(error){
            res.status(500).json({ error: "Erro ao listar proprietário por nome"})
        }
    },
    async produtoMaiorValorTotal(req,res){
        try {
            const prisma = new PrismaClient().$extends({
                result: {
                    produto: {
                        ValorTotal: {
                            needs: { quantidade: true, valor: true },
                            compute(produto) {
                                return produto.valor*produto.quantidade
                            },
                        },
                    },
                },
            })
            const produtos = await prisma.produto.findMany();
            res.status(200).json(produtos);
        }catch(error){
            res.status(500).json({ error: "Erro ao listar proprietário por nome"})
        }
    }
}