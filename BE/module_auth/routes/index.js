const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const signUp = require('../schema/authSchema');

router.post('/sign-up', async (req, res, next) => {
  try {
    const { f_userName, f_email, f_pwd } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(f_pwd, salt);

    const user = new signUp({ f_userName, f_pwd: hashedPassword, f_email });

    // Save the user
    await user.save();
    res.status(201).json({
      status: 'User Signed Up Successfully',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { f_userName, f_pwd } = req.body;

    // Check if the user exists in the database
    const user = await signUp.findOne({ f_userName });
    if (!user) {
      // If user does not exist, return an error message
      return res.status(400).json({ error: 'User does not exist' });
    }
    // Check if passwords are defined
    if (!f_pwd || !user.f_pwd) {
      return res.status(400).json({ error: 'Password not provided' });
    }

    // Compare the provided password with the stored password
    bcrypt.compare(f_pwd, user.f_pwd, function (err, result) {
      if (err) {
        // handle error
        next(err);
      } else if (!result) {
        // If password is not valid, return an error message
        return res.status(400).json({ error: 'Invalid password' });
      } else {
        userDetails = {
          name: user.f_userName,
        };
        // If username and password are valid, send a success message
        res.status(200).json({
          status: 'Logged in successfully',
          userDetails: userDetails,
        });
      }
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

module.exports = router;
