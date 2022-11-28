
const express =require("express")
const router = express.Router();
const bcrypt = require("bcrypt-nodejs")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

router.post("/register",(req,res)=>{
    console.log("hohh i")

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt)
    const {name,password}= req.body;
    
    const user = new User({name,password:hash});
    user.save().then((user)=>{
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        res.header("Authorization",token).json({accessToken:token})
    }).catch((err)=>{
        res.json(err)
    })
    
})

router.post("/login",(req,res)=>{
    console.log(req.body)
    const {name,password}= req.body;
    console.log(name)
    console.log(password)

    User.findOne({name}).then((user)=>{
        if(!user){
             res.status(400).send("invalid username or password")
             return 0;
        }
        const isValid = bcrypt.compareSync(password,user.password)
        if(!isValid){
            res.status(400).send("invalid username or password")
            return 0;
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        res.header("Authorization",token).json({accessToken:token})
        console.log("passed")
    }).catch((err)=>{
        res.status(400).send("invalid username or password")
        console.log("error")

    })
    
})
module.exports = router

