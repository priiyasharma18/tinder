const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const userModel=require('../modules/user')


exports.isAuthenticated=async(req,resp,next)=>{
    try{
     const {token}=req.cookies
     if(!token){
         resp.status(400).json({
             status:"failed",
             message:"authentication failed..."
         })
     }
     
    const decodedData=  jwt.verify(token,process.env.JWT_SECRET)
    //console.log(decodedData,'isauthenticated')
     console.log(decodedData)
    const {data}=decodedData
    const user= await userModel.findById(data)
    console.log(user)
     if(!user){
        throw new Error("User not found.")
     }else{
        req.user=user   //attach the user to request object with user key..IMP
        next()
         //it gives back the control to request handler
     }
   

 
    }catch(err){
        resp.status(400).json({
         status:"error",
         message: err.message
     })
    }
 }
 