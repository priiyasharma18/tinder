const express=require('express')
const { isAuthenticated } = require('../middleware/authentication')
const {connectionRequest}=require('../routeHandler/connectionhandler')
const router=express.Router()

router.route('/request/:status/:receiverid').post(isAuthenticated,connectionRequest)

module.exports=router