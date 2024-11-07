const userModel = require('../modules/user')
const bcrypt = require('bcryptjs')
const validator = require("validator")
const dotenv=require('dotenv')

const jwt=require('jsonwebtoken')

exports.signup=async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        //data sanitisation and validation 
        if (!validator.isEmail(email)) {
            throw new Error("Entered email id is not valid.")
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Please enter strong password.")
        }

        //if user already exists

        const isEmailexist = await userModel.findOne({
            email: email
        })

        if (isEmailexist) {
            throw new Error('credential error.')
        } else {
            //encrypting password
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword
            })
            console.log(firstName)

            await user.save()

            res.status(200).json({
                data: user

            })

        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.login=async (req, res) => {
    try {

        const { email, password } = req.body

        const isUserExist = await userModel.findOne({
            email:email
        })
//console.log(isUserExist,'checking')
        if (!isUserExist) {
            throw new Error("credential error.")
        }

        const isPasswordvalid = await bcrypt.compare(password, isUserExist.password)

        if (!isPasswordvalid) {
            throw new Error('Invalid Credential..')
        } else {
           //console.log(process.env.JWT_SECRET)
            const token=jwt.sign(
                {data:isUserExist._id},
                process.env.JWT_SECRET,
                {expiresIn:"1h"}

            )
          //console.log(token,'token')
            return res.status(200).cookie('token',token).json({
                status:"success",
                data:isUserExist._id,
                token
            })
          
        }

    } catch (err) {
        res.status(400).json({
            status:"error",
            message: err.message
        })
    }
}

exports.isAuthenticated=async(req,resp,next)=>{
   try{
    const {token}=req.cookies
    if(!token){
        resp.status(400).json({
            status:"failed",
            message:"token required..."
        })
    }
    
   const verifyToken=  jwt.verify(token,process.env.JWT_SECRET)
   console.log(verifyToken,'isauthenticated')
    
   const user= await userModel.findById(verifyToken.data)
   next()


   }catch(err){
       resp.status(400).json({
        status:"error",
        message: err.message
    })
   }
}