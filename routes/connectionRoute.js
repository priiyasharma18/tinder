const express=require('express')
const { isAuthenticated } = require('../middleware/authentication')
const {connectionRequest, requestReview}=require('../routeHandler/connectionhandler')
const router=express.Router()

router.route('/request/:status/:receiverid').post(isAuthenticated,connectionRequest)
router.route('/request/review/:status/:requestid').post(isAuthenticated,requestReview)

module.exports=router