const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Send back the user's details (excluding password for security)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    res.json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Add Form Details
exports.addFormDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const formDetails = req.body; // Expecting an object, not an array

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.formDetails.push(formDetails); // Push the object directly
    await user.save(); // Save the changes

    res.status(201).json({ message: 'Form details added successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User's Form Details
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.formDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User's Form Details
exports.updateUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.formDetails = req.body; // Replace with new data
    await user.save();

    res.status(200).json({ message: 'Form details updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User's Form Details
exports.deleteUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.formDetails = []; // Clear form details
    await user.save();

    res.status(200).json({ message: 'Form details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};