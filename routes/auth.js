const express=require('express')

const router= express.Router()
const {signup,login,logout}=require("../routeHandler/authHandler")
const {isAuthenticated}=require('../routeHandler/authHandler')


router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
module.exports=router