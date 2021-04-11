require("dotenv").config()
const express = require("express")
const router = express.Router()
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/User");

// /api/auth/register
router.post("/register",
    [
        check("email", "Invalid E-mail").isEmail(),
        check("password", "Password must be at least 6 characters long").isLength({min: 6}),
        check("username", "Username must contain at least 4 characters").isLength({min: 4})
    ],
    async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors)
            return res.send({
                status: "errors",
                errors: errors,
                message: "Invalid data"
            })
        }
        const{email, password, username}= req.body
        const sameEmail = await User.findOne({email})
        if(sameEmail){
            return res.json({status: "400",message: "User already exist"})
        }
        const sameUsername = await User.findOne({username})
        if(sameUsername){
            return res.json({status: "400", message: `Username ${username} already exist`})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email,username, password: hashedPassword})

        await user.save()
        res.json({status: "201",message: "User successfully created"})
    }catch (error) {
        console.error(error)
    }
})

// /api/auth/login
router.post("/login",
    [
        check("email", "Enter your E-mail").normalizeEmail().isEmail(),
        check("password", "Enter your password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
               return res.json({
                    status: "400",
                    errors: errors.array,
                    message: "Incorrect data"
                })
            }
            const{email, password}= req.body
            const user = await User.findOne({email})
            if(!user){
                return res.json({status: "400", message: "incorrect e-mail or password"})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.json({status: "400", message: "incorrect e-mail or password"})
            }

            const token = jwt.sign(
                {userID: user._id},
                process.env.JWT_SECRET,
                {expiresIn: "48h"}
            )

            return res.json({token, userID: user._id, username: user.username, status: '201'})



        }catch (error) {
            console.error(error)
        }
})




module.exports = router