const mongoose = require("mongoose")
const validator = require('validator')

const userDetailSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        userName: { 
            type: String, 
            required: true,
             minLength: 3,
              maxlength: 20 
            },
        contact: { 
            type: Number,
             maxLength: 10, 
             required: true 
            },
        bio: { 
            type: String, 
            maxLength: 200,
            default:'Hi there! I am using tinder' 
        },
        age: {
             type: Number,
             maxLength:10,
              required: true 
            },
        location: { 
            type: String,
             required: true

         },
        createdAt: {
            type: Date,
            default: Date.now
        },
        image: [
            {
                public_id: {
                    type: String,
                    required: false
                },
                url: {
                    type: String,
                    required: false
                }}],
        gender: { 
            type: String, 
            required: true ,
            validate(value){

            //data sanitisation 

            if(!["male","female","Others"].includes(value))
                {
                throw new Error("Enter gender is not allowed.")
            }
        }},
        intrested:{
            type:String,
             required:true,
             enum:["women","male"]
        }

    }
)

module.exports=mongoose.model("UserDetail",userDetailSchema)