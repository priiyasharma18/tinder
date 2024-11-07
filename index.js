
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors=require('cors')

const port = 8081;
const connectDb = require('./config/database')
const dotenv=require('dotenv').config();
const cookieParser=require('cookie-parser')

//app.use(bodyParser)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const auth=require('./routes/auth')

 app.use('/',auth)  //
 app.use(cookieParser())
// app.use('/login',)






connectDb().then(() => {

    console.log("database connected..")

    app.listen(port, () => {
        console.log("server is listening on port 8081")
    })
}).catch((err) =>
     {  
    console.log(err)
})
