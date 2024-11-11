
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors=require('cors')
const user=require('./routes/user')
const connection=require('./routes/connectionRoute')
const matchRoute=require('./routes/matchDetaileRoute')
const port = 8081;
const connectDb = require('./config/database')
const dotenv=require('dotenv').config();
const cookieParser=require('cookie-parser')
const feedRoute=require('./routes/feed')

//app.use(bodyParser)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const auth=require('./routes/auth')

 app.use('/',auth)  //
 app.use(cookieParser())
 app.use('/',user)
 app.use('/',connection)
app.use('/',matchRoute)
app.use('/',feedRoute)
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
