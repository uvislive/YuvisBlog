
const mongoose = require("mongoose")
const express = require("express");
const Cors = require("cors");
require("./models/User")
require("./models/Post")
const requireLogin = require("./middleware/requireLogin.js")

// username:uvislive1920
// password : teQ9RWrIckyMpeQl



// appconfig /
const app = express();
const port = process.env.PORT || 9000;
const connection_url= "mongodb+srv://uvislive1920:teQ9RWrIckyMpeQl@cluster0.tzehalt.mongodb.net/?retryWrites=true&w=majority";
// middlewares
app.use(express.json());
app.use(Cors());
app.use(require("./routes/auth.js"));
app.use(require("./routes/post"))



// dbconfig
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.once("open", () => {
    console.log("Database Connnected")
})

// Routes
app.get("/", (req, res) => res.status(200).send("Hii How are you "))


// Listeners 

app.listen(port, () => console.log(`the app is running one ${port}`))


