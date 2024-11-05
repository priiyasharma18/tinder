const mongoose=require('mongoose')


const connectDb= async ()=>{
   await mongoose.connect("mongodb+srv://sharmapriya08794:mongoBookingApp@cluster1.siknc.mongodb.net/tinder")
}

module.exports=connectDb

