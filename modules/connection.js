const mongoose = require("mongoose")

const connectionSchema=mongoose.Schema(
    {
        senderId:{
            type:mongoose.Types.ObjectId,  
            required:true,
             ref:"User"
        },
        senderProfileId:{
            type:mongoose.Types.ObjectId,
            required:true,
             ref:"UserDetail"
        },
        receiverId:{
            type:mongoose.Types.ObjectId ,
            required:true,
             ref:"User"
        },
        receiverProfileId:{
            type:mongoose.Types.ObjectId ,
            required:true,
             ref:"UserDetail"
        },
        status:{
            type:String,
            required:true,
            enums:["intrested","notintrested","rejected","accepted"]
        },
      
    }
)

module.exports=mongoose.model("ConnectionModel",connectionSchema)