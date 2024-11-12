const connectionModel = require('../modules/connection')
const userModel = require('../modules/user')
const UserDetailModel=require('../modules/userDetail')


const feed = async (req, res) => {
    try {

        //to create a feed for an logged in user  we need to filter on the basis of connection activity of logged in user
        //step 1-> when a logged in user send a request to someone or he receives the request from someone 
        //step 2-> we need all the users except the user involved in connection activities
        //step 3-> first we will find all the connection data of logged in user from connection db...
        //step 4-> we will be filtering out the restricted id from the usermodel so the feed will be ready
         

        // /feed?page=1&limit=10

       const page=req.query.page
       const limit=req.query.limit||10
        

        const loggedInId = req.user._id

        const allConnectionActivity = await connectionModel.find({
            $or: [
                { senderId: loggedInId },
                { receiverId: loggedInId }
            ]
        }).select("senderId receiverId ")

        const restrictedId = []

        allConnectionActivity.forEach(element => {
            restrictedId.push(element.senderId)
            restrictedId.push(element.receiverId)
        })
        
        //check mongo queruy operators for detailed but here we are blocking the self id in the feed
        //and also we are filtering the users with already interaction with login user exist 

        const feedUser= await userModel.find({
             $and: [{_id: { $nin:restrictedId }}, { _id: { $ne: loggedInId } }  ] 
        }).select('firstName lastName _id').skip((page-1)*limit).limit(limit)

        const feedUserArr=[]
        feedUser.forEach(element=>{
            feedUserArr.push(element._id)
        }

        )
        const feedUsersProfile= await UserDetailModel.find({
            userId: { $in:feedUserArr}
        })
        res.status(200).json({
            status: "success",
            feedData:feedUsersProfile,feedUser
        })

    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message
        })
    }
}


module.exports = {
    feed
}