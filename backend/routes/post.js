const express = require("express")
const mongoose = require("mongoose")
const requireLogin = require("../middleware/requireLogin");
const Post = require("../models/Post")
const router = express.Router()


// router.get("/viewpost", (req, res) => {
//     res.send("this is the post view")
// })


router.post("/createpost", requireLogin, (req, res) => {
    const { title, body,pic} = req.body;
    if (!title || !body || !pic ) {
        return res.status(544).json({ error: "Please Add all the fields " })

    }
    req.user.password = undefined;
    console.log(req.user);
    const post = new Post({
        title,
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then(postData => {
        // res.status(201).json({ Message: "successfully Created" })
        res.status(201).json({"post":postData});
        console.log("postdata", postData);
    }).catch(err => {
        console.log(err)
    })

})



router.get("/allpost", requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy","_id username")
        .then(posts => {
            res.status(201).json({ posts });
        })
        .catch(err => {
            console.log(err);
        })
})


router.get("/mypost", requireLogin, (req, res) =>{
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id username")
        .then(myPost => {
            res.status(201).json({ myPost })
        }).catch(err => {
            console.log(err)
        })
})





module.exports = router;