
const userDetailModel=require('../modules/userDetail')

exports.createProfile=async (req,res)=>{
    try{
     
        const {userName,contact,bio,age,location,image,gender,intrested}=req.body
        
         if(image.length>4){
            throw new Error("You exceeded image limit.")
         }

         const profileData=new userDetailModel({
            userId:req.user._id,userName,contact,bio,age,location,image,gender,intrested
         })

         await profileData.save()

         res.status(200).json({
            status:"success",
            data:profileData
         })


    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}

exports.getProfile=async (req,res)=>{
    try{
       
        const loginId=req.user._id   //extracting id of login user
        
        const userData= await userDetailModel.findOne({userId:loginId})
        res.status(200).json({
            status:"success",
            data:userData
        })

    }catch(e){
        res.status(400).json({
           status:"failed",
           message:e.message 
        })
    }
}

exports.updateProfile=async (req,res)=>{
    try{
        
        const id=req.params.id
        const updatedProfile=await userDetailModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({
            status:"success",
            data:updatedProfile
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}

exports.updateProfile=async (req,res)=>{
    try{
        
        const id=req.params.id
        const updatedProfile=await userDetailModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({
            status:"success",
            data:updatedProfile
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}

exports.deleteProfile=async (req,res)=>{
    try{
        
        const id=req.params.id
        const deleteProfile=await userDetailModel.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            message:"Your profile deleted successfully."
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}