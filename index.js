
const express = require("express")
const app = express()
const validator = require("validator")
const bodyParser = require('body-parser')
const userModel = require('./modules/user')
const port = 8081;
const connectDb = require('./config/database')
const bcrypt = require('bcryptjs')

//app.use(bodyParser)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        //data sanitisation and validation 
        if (!validator.isEmail(email)) {
            throw new Error("Entered email id is not valid.")
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Please enter strong password.")
        }

        //if user already exists

        const isEmailexist = await userModel.findOne({
            email: email
        })

        if (isEmailexist) {
            throw new Error('credential error.')
        } else {
            //encrypting password
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword
            })
            //console.log(firstName)

            await user.save()

            res.status(200).json({
                data: user

            })

        }




    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})


app.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        const isUserExist = await userModel.findOne({
            email:email
        })

        if (!isUserExist) {
            throw new Error("credential error.")
        }

        const isPasswordvalid = await bcrypt.compare(password, isUserExist.password)

        if (!isPasswordvalid) {
            throw new Error('Invalid Credential..')
        } else {
            res.status(200).json({
                message: "Logged in successfully!"
            })
        }

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
connectDb().then(() => {

    console.log("database connected..")

    app.listen(port, () => {
        console.log("server is listening on port 8081")
    })
}).catch((err) => {
    console.log(err)
})
