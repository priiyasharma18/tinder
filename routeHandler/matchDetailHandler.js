const connectionModel = require('../modules/connection')
const userModel = require('../modules/user')

exports.findAllrequest = async (req, res) => {
    try {

        //step 1 -> i want to see my all pending request for that i need two filters 
        //a-> the id which is saved in database as receivers id (my id)
        //b-> the status filter which is saved as intrested ..

        const userId = req.user._id
        const pendingRequest = await connectionModel.find({ receiverId: userId, status: "intrested" }).populate("senderId","firstName lastName email")

        if(pendingRequest.length==0){
            return res.status(404).json({
                status:"You do not any  have request"
            })
        }
        console.log(pendingRequest, "all pending request")
        res.status(200).json({
            status: "success",
            data: pendingRequest
        })



    }
    catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}