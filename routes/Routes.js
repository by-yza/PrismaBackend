const express = require('express')
const Controller = require('../controllers/Controller')

const router = express.Router()

router.get('/proprietarios/',Controller.listarProprietarios)
router.get('/produtos/',Controller.listarProdutos)
//router.post('/funcionario',FuncionarioController.criarFuncionarios)
//router.delete('/funcionario/:id', FuncionarioController.deletarFuncionario)
//router.put('/funcionario/:id',FuncionarioController.atualizarFuncionario)

module.exports = router;