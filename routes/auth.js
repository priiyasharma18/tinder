const express=require('express')

const router= express.Router()
const {signup,login}=require("../routeHandler/authHandler")
const {isAuthenticated}=require('../routeHandler/authHandler')


router.route('/signup').post(signup)
router.route('/login').post(login)

module.exports=router