const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');

// POST route to create a new User
router.post('/add', async (req, res, next) => {
  try {
    // Validate request body
    if (
      !req.body.f_name ||
      !req.body.f_email ||
      !req.body.f_mobile ||
      !req.body.f_role ||
      !req.body.f_department ||
      !req.body.f_dob ||
      !req.body.f_doj ||
      !req.body.f_description
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if an User with the same email already exists
    const existingUser = await User.findOne({
      f_email: req.body.f_email,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'An User with this email already exists' });
    }
    // Check if an User with the same mobile number already exists
    const existingUserMobile = await User.findOne({
      f_mobile: req.body.f_mobile,
    });
    if (existingUserMobile) {
      return res
        .status(400)
        .json({ error: 'An User with this mobile number already exists' });
    }

    const newUser = new User(req.body);

    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
});

router.get('/user-list', async (req, res, next) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let skipIndex = (page - 1) * limit;
    const total = await User.countDocuments();
    const Users = await User.find().skip(skipIndex).limit(limit);
    const pagination = {
      total,
      currentPage: page,
      from: skipIndex + 1,
      to: skipIndex + Users.length,
    };
    res.status(200).send({ Users, pagination });
  } catch (error) {
    next(error);
  }
});

router.put('/remove', async (req, res, next) => {
  console.log(req.body);
  try {
    // Validate request body
    if (!req.query.email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find the User by email and remove
    const user = await User.findOneAndDelete({
      f_email: req.query.email,
    });

    if (!user) {
      return res.status(404).json({ error: 'No User found with this email' });
    }

    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
