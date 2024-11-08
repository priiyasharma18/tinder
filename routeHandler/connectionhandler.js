const connectionModel=require('../modules/connection')
const userModel=require('../modules/user')

exports.connectionRequest=async (req,res)=>{
    try{

        const status=req.params.status
        const receiverId=req.params.receiverid
        const senderId=req.user._id

        const isReceiverExist=await userModel.findById(receiverId)
        if(!isReceiverExist){
            throw new Error("this connection is not possible.")
        }
        //chek whether the sender and receiver is same if yes then err throw youb cannot send self request
        const allowedStatus=['intrested','notintrested']
         const isAllowed=allowedStatus.includes(status)
         if(!isAllowed){
            throw new Error("Invalid status type..")
         }
         
         const existConnection= await connectionModel.findOne({ $or: [ { senderId: senderId,receiverId:receiverId}, { senderId:receiverId,receiverId:senderId } ] })
         if(existConnection){
            throw new Error("connection already exist..")
         }
         else{
            const connection=  await new connectionModel({
                senderId,receiverId,status
            })
            await connection.save()
            res.status(200).json({
                status:"success",
                message:"request sent successfully."
            })
         }
    }catch(e){
       res.status(400).json({
        status:"failed",
        message:e.message
       }) 
    }
}