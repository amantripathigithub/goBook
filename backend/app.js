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
// for hotel schema
const Hotel = require('./model/hotel');

const bodyParser = require("body-parser");

const path = require("path");
//var popup = require('popups');
let alert = require('alert'); 



// change 2
app.set("view engine", "ejs");


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
            //changes are here
        const hotel= await Hotel.find({});


// change for search bar
const city_data=[];
for( i=0;i<hotel.length;i++){
    city_data.push(hotel[i].city);
}
    

            res.render(path.join(__dirname,"../frontend", "/home.ejs"),{hotel:hotel,city_data:city_data});
           //res.sendFile(path.join(__dirname,"../frontend", "/home.html"));
          } else {
           // if password not match
           return res.json({error: "invalid details !!"});
         }
        } else {

            // if user email is not exist 
            res.sendFile(path.join(__dirname, "../frontend", "/signup.html"));

        }
      } catch (error) {
        res.status(400).json({ error });
      }
});

// for search page


app.get("/search", (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.join(__dirname, "../frontend", "/search.ejs"));
});


app.post("/search", async function(req, res){

    var search_data=req.body.query;
    const hotel= await Hotel.find({city:search_data});
       const hotel2=await Hotel.find({});
// change for search bar 
const city_data=[];
for( i=0;i<hotel2.length;i++){
    city_data.push(hotel2[i].city);
}
    res.render(path.join(__dirname,"../frontend", "/search.ejs"),{hotel:hotel,city_data:city_data});


});

// for hotel wala page


app.get("/hotel", (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.join(__dirname, "../frontend", "/hotel.ejs"));
});



app.post("/hotel", async function(req, res){

    var search_data=req.body.query2;
    const hotel= await Hotel.findOne({name:search_data});

    res.render(path.join(__dirname,"../frontend", "/hotel.ejs"),{hotel:hotel});


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




// for hotal signup page


app.get("/signuphotel", (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.join(__dirname, "../frontend", "/signuphotel.html"));
});




app.post('/signuphotel',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    const name=req.body.name;
    const  price=req.body.price;
    const  city=req.body.city;
    const address=req.body.address;
    const  contact=req.body.contact;
    const  rating=3;
   
    if(password!=cpassword){
        
        return res.json({error: "password not match!!"});
    }
    
    // checking for correct number

    
    con=String(contact);
    if(con.length!=10)
        return res.json({error: "not a valid number!!"});
    


    Hotel.findOne({email:email,password:password})
    .then((userExist)=>{
        if(userExist)
        return res.status(422).json({ error :"email exists already"});
        
        const hotel = new Hotel({email:email,password:password,name:name,price:price,city:city,address:address,contact:contact,rating:rating});

        hotel.save().then(() => {
            res.status(201).json({message: "registered !! "});
        }).catch((err) => res.status(500).json({error: "failed to register !! "}));


    }).catch(err => {console.log(err); });

    //console.log(req.body);
    //res.json({message:req.body});
});



app.get("/signinhotel", (req, res) => {
    app.use(express.static("../frontend"));
    res.sendFile(path.join(__dirname, "../frontend", "/signinhotel.html"));
});




app.post("/signinhotel", async function(req, res){
    try {
        // check if the user exists
        const hotel = await Hotel.findOne({ email: req.body.email });
        if (hotel) {
          //check if password matches
         // console.log("mil gya");
          const result = req.body.psw === hotel.password;
          if (result) {
           res.sendFile(path.join(__dirname,"../frontend", "/homehotel.html"));
          } else {
            return res.status(422).json({ error :"email password does not match !!!!"});
         }

        } else {

           // hotel register hi ni to go to register page
          return res.sendFile(path.join(__dirname,"../frontend", "/signuphotel.html"));
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});




app.listen(port, () => {
 console.log("Server listening on port " + port);
});