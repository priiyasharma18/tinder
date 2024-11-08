const express=require('express')

const router=express.Router()
const {isAuthenticated}=require('../middleware/authentication')
const {createProfile,getProfile,updateProfile,deleteProfile}=require('../routeHandler/userHandler')

router.route('/create/profile').post(isAuthenticated,createProfile)
router.route('/get/profile').get(isAuthenticated,getProfile)
router.route('/update/profile/:id').patch(isAuthenticated,updateProfile)
router.route('/delete/profile/:id').delete(isAuthenticated,deleteProfile)
module.exports=router