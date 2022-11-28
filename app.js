const mongoose = require("mongoose")
const express = require("express")
require("dotenv").config();
const app= express();
const port=process.env.PORT;
const authRouter=require("./routes/auth")
const listRouter=require("./routes/list")

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const cors = require("cors");
const verifyToken = require("./controllers/verifyToken");

/// Parsing Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next()
}) 
/// DB Connection
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connect")
}).catch((err)=>{
    console.log("NOT CONNECTED")
    console.log(err)
})

app.use("/auth",authRouter)
app.use("/list",listRouter)

/* app.use("/lists",verifyToken,listsRouters) */

app.listen(8000,()=>{
    console.log("Server is listening...")
})

module.exports = app