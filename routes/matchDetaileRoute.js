const express=require('express')
const { isAuthenticated } = require('../middleware/authentication')
const {findAllrequest,allMatch}=require('../routeHandler/matchDetailHandler')
const router=express.Router()

router.route('/request/received').get(isAuthenticated,findAllrequest)
router.route('/my/all/match').get(isAuthenticated,allMatch)
module.exports=router