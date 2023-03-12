const dotenv = require('dotenv');

var express = require("express");
const mongoose = require('mongoose');
var app = express();
dotenv.config({path: './config.env'});
const PORT = process.env.PORT;
//isse connection ho jayega
require('./db/connection');

//app.use(require('./router/auth'));
const User = require('./model/user');

const bodyParser = require("body-parser");

const path = require("path");
//var popup = require('popups');
let alert = require('alert'); 


// middleware



app.use(bodyParser.urlencoded({
    extended:true
}));

var port = 3000;

app.get("/", (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.join(__dirname, "../frontend", "/signin.html"));
});
 /*
app.post("/" , function(req,res){
    email=req.body.email;
    pasws=req.body.psw;


   
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){

        console.log("exist");
        User.find({}, function(err,User) {
            if (err) throw err;
            // object of all the users
            console.log("ok");
            res.render('index',{User:User});
        });}
        else{
            console.log("not exist"); 
        }
     
    }).catch(err => {"error"});


   // console.log(req.body);
    res.json({message:req.body});

    
});
*/

app.post("/", async function(req, res){
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          //check if password matches
          const result = req.body.psw === user.password;
          if (result) {
           res.sendFile(path.join(__dirname,"../frontend", "/home.html"));
          } else {
            // popup.alert({
            //     content: 'Hello!'
            // });     
            //alert("nikal");    
         }
        } else {

            // popup.alert({
            //     content: 'Hello!'
            // });
            //alert("nikal");    
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});




// for signup page


app.get("/signup", (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.join(__dirname, "../frontend", "/signup.html"));
});




app.post('/signup',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    

    if(!email || !password || !cpassword){
        
        return res.json({error: "fill properly!!"});

    }
    if(password!=cpassword){
        
        return res.json({error: "password not match!!"});
    }

    User.findOne({email:email,password:password})
    .then((userExist)=>{
        if(userExist)
        return res.status(422).json({ error :"email exists already"});
        
        const user = new User({email:email,password:password});

        user.save().then(() => {
            res.status(201).json({message: "registered !! "});
        }).catch((err) => res.status(500).json({error: "failed to register !! "}));


    }).catch(err => {console.log(err); });


    //console.log(req.body);
    //res.json({message:req.body});
});





app.listen(port, () => {
 console.log("Server listening on port " + port);
});