const express=require('express')
const { isAuthenticated } = require('../middleware/authentication')
const {feed}=require('../routeHandler/feedHandler')

const router=express.Router()
router.route('/feed').get(isAuthenticated,feed)

module.exports=router