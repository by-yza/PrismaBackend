const express = require('express')
const Controller = require('../controllers/Controller')

const router = express.Router()

router.post('/proprietarios/criar',Controller.criarProprietario)
router.post('/produtos/criar',Controller.criarProduto)

router.get('/proprietarios/',Controller.listarProprietarios)
router.get('/produtos/',Controller.listarProdutos)
router.get('/proprietarios/nome/:nome',Controller.proprietarioPorNome)
router.get('/produtos/maiorquantidade',Controller.produtoMaiorQuantidade)
router.get('/produtos/maiorvalor',Controller.produtoMaiorValor)
router.get('/produtos/maiorvalortotal',Controller.produtoMaiorValorTotal)
router.get('/proprietarios/maiorquantidade',Controller.proprietarioMaiorQuantidade)

router.put('/proprietarios/:id',Controller.atualizarProprietario)
router.put('/produtos/:id',Controller.atualizarProduto)

router.delete('/proprietarios/id/:id', Controller.deletarProprietario)
router.delete('/produtos/id/:id', Controller.deletarProduto)

module.exports = router;
