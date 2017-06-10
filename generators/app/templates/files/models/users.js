/*
users.js

This file creates and exports the User model for the
<%= appName %> web app..
*/

const
mongoose = require('mongoose'),
Schema   = mongoose.Schema;


var usersSchema = new Schema({
                        userName: String,
                          favNum: Number
                      });

//
usersSchema.methods.greet = function() {
  var greeting = 'Well hello ' + this.userName + '!\nYou\'re favorite number is: ' + this.favNum;

  console.log(greeting);
}

var
User = mongoose.model('User', usersSchema);

module.exports = User;
