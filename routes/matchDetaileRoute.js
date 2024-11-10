const express=require('express')
const { isAuthenticated } = require('../middleware/authentication')
const {findAllrequest}=require('../routeHandler/matchDetailHandler')
const router=express.Router()

router.route('/request/received').get(isAuthenticated,findAllrequest)

module.exports=router