const jwt = require("jsonwebtoken")
function verifyToken(req,res,next){
    const Authorization=req.header("Authorization")
    if(!Authorization){
        res.status(401).send("Access Denied. No token provided")
        return 0;
    }
    const token=req.header("Authorization").split(" ")[1]
    jwt.verify(token , process.env.SECRET,(err,decoded)=>{
        if(err){
            res.status(401).send("Invalid token.")
            return 0;
        }
       /*  req.userId=decoded._id */
        next();
    });
    
}

module.exports=verifyToken;