const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  f_name: { type: String, required: true },
  f_email: { type: String, required: true, unique: true },
  f_mobile: { type: String, required: true, unique: true },
  f_role: { type: String, required: true },
  f_department: { type: String, required: true },
  f_description: { type: String, required: true },
  f_dob: { type: Date, required: true },
  f_doj: { type: Date, required: true },
});

const user = mongoose.model('t_user', userSchema);

module.exports = user;
