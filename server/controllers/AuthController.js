const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for handling authentication operations

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {

    console.log("login in")
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
