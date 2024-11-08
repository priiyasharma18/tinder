const mongoose = require("mongoose")

const connectionSchema=mongoose.Schema(
    {
        senderId:{
            type:mongoose.Types.ObjectId,
            required:true,
             ref:"User"
        },
        receiverId:{
            type:mongoose.Types.ObjectId ,
            required:true,
             ref:"User"
        },
        status:{
            type:String,
            required:true,
            enums:["intrested","notintrested","rejected","accepted"]
        },
      
    }
)

module.exports=mongoose.model("ConnectionModel",connectionSchema)