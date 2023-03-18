const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let hotel = new Schema({
    email: {
      type: String
    },
    password: {
      type: String
    },
    name: {
      type: String 
    },
    price: {
        type: Number
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    contact: {
        type: Number
    },
    rating:{
      type: Number
    },
    image:{
      type: String
    }
  });

  const hotel_model = mongoose.model("hotels", hotel);

  module.exports = hotel_model;
  