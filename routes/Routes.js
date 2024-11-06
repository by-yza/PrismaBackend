const express = require('express')
const Controller = require('../controllers/Controller')

const router = express.Router()

router.get('/proprietarios/',Controller.listarProprietarios)
router.get('/produtos/',Controller.listarProdutos)
router.get('/proprietarios/nome/:nome',Controller.proprietarioPorNome)
router.get('/produtos/maiorquantidade',Controller.produtoMaiorQuantidade)
router.get('/produtos/maiorvalor',Controller.produtoMaiorValor)
router.get('/produtos/maiorvalortotal',Controller.produtoMaiorValorTotal)
router.get('/proprietarios/maiorquantidade',Controller.proprietarioMaiorQuantidade)
//router.post('/funcionario',FuncionarioController.criarFuncionarios)
//router.delete('/funcionario/:id', FuncionarioController.deletarFuncionario)
//router.put('/funcionario/:id',FuncionarioController.atualizarFuncionario)

module.exports = router;