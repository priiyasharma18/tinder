const connectionModel = require('../modules/connection')
const userModel = require('../modules/user')

exports.findAllrequest = async (req, res) => {
    try {

        //step 1 -> i want to see my all pending request for that i need two filters 
        //a-> the id which is saved in database as receivers id (my id)
        //b-> the status filter which is saved as intrested ..

        const userId = req.user._id
        const pendingRequest = await connectionModel.find({ receiverId: userId, status: "intrested" }).populate("senderProfileId", "userName image bio location age gender intrested")

        if (pendingRequest.length == 0) {
            return res.status(404).json({
                status: "You do not any  have request"
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

exports.allMatch = async (req, res) => {
    try {

        //step 1 -> we can develope connection by two ways
        // a-> received request by someone
        //b -> sent request and accepted by that user 
        // c-> in case of received request log in user will be receiver 
        // d-> in case of sent request log in user will be sender

        const loggedInuser = req.user._id

        const myMatch = await connectionModel.find({
            $or: [
                { senderId: loggedInuser, status: "accepted" },
                { receiverId: loggedInuser, status: "accepted" }  //revise this point 
            ]
        }).populate("senderProfileId", "userName image bio location age gender intrested").populate("receiverProfileId", "userName image bio location age gender intrested")
        if (myMatch.length == 0) {
            return res.status(404).json({
                status: "success",
                message: "No matches found."
            })
        }
        return res.status(200).json({
            status:"success",
            data:myMatch
        })
    }
    catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

}