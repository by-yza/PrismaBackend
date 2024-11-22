const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async criarProprietario(req, res) {
        try {
          const { id, nome, email, endereco } = req.body;
          const novoProprietario = await prisma.proprietario.create({
            data: { id, nome, email, endereco }
          });
          res.status(201).json(novoProprietario);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao cadastrar proprietário' });
        }
    },
    async criarProduto(req, res) {
        try {
          const { id, descricao, quantidade, valor, proprietarioId } = req.body;
          const novoProduto = await prisma.produto.create({
            data: { id, descricao, quantidade, valor, proprietarioId }
          });
          res.status(201).json(novoProduto);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao cadastrar produto' });
        }
    },
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
            res.status(500).json({ error: "Erro ao listar produto de maior quantidade"})
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
            res.status(500).json({ error: "Erro ao listar produto de maior valor"})
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
            produtos.sort((a,b)=>{
                return b.ValorTotal-a.ValorTotal
            })
            res.status(200).json(produtos[0]);
        }catch(error){
            res.status(500).json({ error: "Erro ao listar produto de maior valor total"})
        }
    },
    async proprietarioMaiorQuantidade(req,res){
        try {
            const proprietarios = await prisma.proprietario.findMany({
                include:{
                    _count:{
                        select:{
                            produtos:true
                        }
                    }
                },
                orderBy:{
                    produtos:{
                        _count:"desc"
                    }
                }
            });
            res.status(200).json(proprietarios[0]);
        }catch(error){
            res.status(500).json({ error: "Erro ao listar proprietário com maior quantidade de produtos"})
        }
    },
    async atualizarProprietario(req, res) {
        try {
            const { id } = req.params;
            const {  nome, email, endereco} = req.body;
      
            const proprietario = await prisma.proprietario.update({
              where: { id: Number(id) },
              data: {  nome, email, endereco}
            });
      
            res.status(200).json(proprietario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar proprietário' });
        }
    },
    async atualizarProduto(req, res) {
        try {
            const { id } = req.params;
            const { descricao, quantidade, valor, proprietarioId } = req.body;
      
            const produto = await prisma.produto.update({
              where: { id: Number(id) },
              data: { descricao, quantidade, valor, proprietarioId }
            });
      
            res.status(200).json(produto);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar proprietário' });
        }
    },
    async deletarProprietario(req,res){
        try {
            const {id} = req.params;
            const deletarProp = await prisma.proprietario.delete({
                where: {
                  id: Number(id),
                },
              })
                
            
            res.status(200).json({ message: "Proprietário deletado com sucesso" })

        }catch(error){
            res.status(500).json({ error: "Erro ao deletar proprietário" });
        }
    },
    async deletarProduto(req,res){
        try {
            const {id} = req.params;
            const deletarProd = await prisma.produto.delete({
                where: {
                  id: Number(id),
                },
              })
                
            
            res.status(200).json({ message: "Produto deletado com sucesso" })

        }catch(error){
            res.status(500).json({ error: "Erro ao deletar produto" });
        }
    }
}
