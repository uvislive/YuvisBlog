
const express = require("express")
// const mongoose = require("mongoose")
const router = express.Router()
const User = require("../models/User")
// const User= mongoose.model("User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const requireLogin = require("../middleware/requireLogin")


router.get("/server", (req, res) => {
    res.status(200).json({ message: "this is the right message" });
})


router.get("/alluser",requireLogin,(req,res)=>{
    User.find().then((user)=>{
        res.status(201).json({"users": user});
    })
    .catch(err=>{
        console.log(err);
    })
})


router.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(533).json({ error: "Please add all fields" })
    }

    User.findOne({ email: email }).then(savedUser => {
        if (savedUser) {
            return res.status(544).json({ error: "user already Exist" })
        }
        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
                username,
                email,
                password: hashedPassword,
            })
            user.save().then(userData => {
                res.status(200).json({ message: "user successfully created" })
                console.log(userData)
            }).catch(err => {
                console.log(err);
            })
        })

    }).catch(err => {
        console.log(err)
    })

})


router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(444).json({ error: "please add All fields " })
    }
    User.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(444).json({ error: "invalid Username or Password" })
        }
        bcrypt.compare(password, savedUser.password).then(doMatch => {
            if (!doMatch) {
                return res.status(440).json({ error: "invalid Username or Password" })
            }
            const token = jwt.sign({ _id: savedUser._id }, "process.env.secret_key")
            const { _id, username, email } = savedUser;
            res.status(222).json({ token, user: { _id, username, email } })
            console.log("token:" +token)
        }).catch(err => {
            console.log(err)
        }).catch(err => {
            console.log(err)
        })
    })

})


router.get("/protected", requireLogin, (req, res) => {
    res.status(202).json({ messages: "This is Protected Resources" })
})


module.exports = router;