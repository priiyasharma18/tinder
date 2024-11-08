const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    profileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserDetail",
        require:true
    },
    firstName: {
         type: String,
          required: true, 
          minLength: 3, 
          maxLength: 20 
        },
    lastName: { 
        type: String, 
        minLength: 3, 
        maxLength: 20 
    },
    email: {
        type: String,
         required: true, 
         unique: true, 
         validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Entered email id is not valid')
            }
        }
    },
    password: { 
        type: String,
         required: true, 
         minLength: 6, 
         maxLength: 200 
        },

})

module.exports = mongoose.model('User', userSchema)