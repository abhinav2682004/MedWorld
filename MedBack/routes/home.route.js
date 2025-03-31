const express=require('express')
const homeroutes=express.Router()
const controller=require('../controllers/product.controller')
const cartControl=require('../controllers/cart.controller')
const {authenticateUser} =require('../middlewares/user.middleware')
homeroutes.post('/',controller.getHomeProduct)
homeroutes.post('/getProd/:id',controller.getProdData)
homeroutes.post('/:id',authenticateUser,cartControl.addToCart)
module.exports=homeroutes;