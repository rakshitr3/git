const express=require("express");
const app=express();
const dotenv= require("dotenv").config()         //if we wont import this dotenv then port 3000 will work as PORT=5000 wont fetch
const connectDb=require("./config/connectionDb")
const cors=require("cors")

app.use(express.json())
app.use(cors());              //dont use it like app.use(cors)

// const path = require('path');

// // Serve static files from the 'public/images' folder
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.static("public"))      //making our public folder static so that we can access it

const PORT=process.env.PORT || 3000
connectDb();

app.use("/",require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))       //or we can import above and use it here


app.listen(PORT, (err)=> {
    console.log(`app is listening on port ${PORT}`)
})