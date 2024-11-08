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
//console.log(isEmailexist,'email')
        if (isEmailexist) {
            throw new Error('credential error..') 
        } else { 
            //encrypting password
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword
            })
           // console.log(firstName)

            await user.save()
             const token= jwt.sign(
                {data:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"1h"})

            res.status(200).cookie('token',token).json({
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
                data:isUserExist._id
            })
          
        }

    } catch (err) {
        res.status(400).json({
            status:"error",
            message: err.message
        })
    }
}

exports.logout=async(req,res)=>{
    try{
      
        res.status(200).cookie('token',null,{
            expires: new Date(Date.now()),
            maxAge:0*1000,
            httpOnly: true,
        }).json({
            status:"success",
            message:"loggeg out"
        })     
    }catch(err){
    res.status(400).json({
    status:"failed",
    message:err.message
    })
    }
}



