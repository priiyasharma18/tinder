const connectionModel=require('../modules/connection')
const userModel=require('../modules/user')
const UserDetailModel=require('../modules/userDetail')

exports.connectionRequest=async (req,res)=>{
    try{
 
        const status=req.params.status
        const receiverId=req.params.receiverid
        const senderId=req.user._id
        const senderProfileId=await UserDetailModel.findOne(
            {
                userId:senderId
            }
        )

        const receiverProfileId= await UserDetailModel.findOne(
            {
                userId:receiverId
            }
    )
//console.log(senderProfileId,"senderprofile id",receiverProfileId,'receiver profile id')
       // console.log(senderId,'sender id')
        const isReceiverExist=await userModel.findById(receiverId)
        if(!isReceiverExist){
            throw new Error("this connection is not possible.")
        }
         //check whether the sender and receiver is same if yes then err throw youb cannot send self request
         // .equals() is used to comapre object id returned by mongo and normal receiver id
         if(senderId.equals(receiverId)){
            throw new Error("You can not send self request..")

         }


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
                senderId,senderProfileId,receiverId,receiverProfileId,status
            })
            await connection.save()
            res.status(200).json({
                status:"success",
                message:`${req.user.firstName}  is ${status} in you.` 
            })
         }
    }catch(e){
       res.status(400).json({
        status:"failed",
        message:e.message
       }) 
    }
}

exports.requestReview=async(req,res)=>{
    try{

        // step 1-> status received
        //step 2 -> received userId of requested user
        //step 3-> status must be received as accepted or rejected
        // step 4 -> requested Id will be sender id in database 
        //step 5 -> check whether the requestedId is present in database or not.

        const status=req.params.status
        const receiverId=req.params.requestid

        const allowedStatus=['accepted','rejected'] 
        const isAllowed=allowedStatus.includes(status)

        if(!isAllowed){
          throw new Error("status not allowed..")
        }
        const findConnection=await connectionModel.findOne({_id:receiverId,receiverId:req.user._id,status:'intrested'})
         //receiver id must be the logged in Id to proceed further function to accept or reject...because you are the receiver of request

        if(!findConnection){
            throw new Error("connection not found..")
        }
        else
        {
           findConnection.status=status
          //const updatedData= await connectionModel.findByIdAndUpdate(receiverId,status)
           
         //await updatedData.save()
         await findConnection.save()
           res.status(200).json({
            status:"success",
            data:findConnection
           })
        }

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
           })  
    }
}

