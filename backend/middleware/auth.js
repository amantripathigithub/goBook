const jwt = require("jsonwebtoken");
const register = require("../model/user");
const path = require("path");

const auth = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;   
        const varifyUser = jwt.verify(token,'mynameisdeepakduveshbackendwebdeveloper');
        //console.log(varifyUser);
        const user = await register.findOne({_id:varifyUser._id})
        //console.log(user);
        next();

    } catch(error){

        res.sendFile(path.join(__dirname, "../../frontend", "/signin.html"));
        // res.status(401).send(error);
    }
    
}


module.exports = auth;