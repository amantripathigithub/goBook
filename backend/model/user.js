const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema({
    email: {
      type: String
    },
    password: {
      type: String
    }
  });

  const user_model = mongoose.model("users", user);

  module.exports = user_model;
  