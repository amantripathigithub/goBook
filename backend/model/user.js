const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

let user = new Schema({
    name:{
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    contact: {
      type: Number
    },
    image:{
      type:String
    },
    tokens:[{
      token:{
        type:String,
        required:true
      }
    }]
  });

  user.methods.generateAuthToken = async function(){
    try{
      const token = jwt.sign({_id:this._id.toString()},"mynameisdeepakduveshbackendwebdeveloper");
      this.tokens = this.tokens.concat({token:token})
      await this.save();
      return token;
    } catch(error){
      res.send("the error part"+error);
    }
  }

  const user_model = mongoose.model("users", user);

  module.exports = user_model;
  