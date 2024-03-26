const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
  f_userName: { type: String, unique: true },
  f_email: { type: String, unique: true },
  f_pwd: String,
});

const signUp = mongoose.model('t_login', signUpSchema);

module.exports = signUp;
