const jwt = require("jsonwebtoken")
const express = require("express")
const User = require("../models/User")

const requireLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(544).json({ error: "you must be Logged In" })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "process.env.secret_key", (err, payload) => {
        if (err) {
            return res.status(444).json({ error: "you must be Logged in" })
        }
        const { _id } = payload;
        User.findById(_id).then(userData => {
            req.user = userData;
            next();
        })

    })

}



module.exports = requireLogin;