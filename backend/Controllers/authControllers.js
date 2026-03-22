const admin = require("../firebaseAdmin");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    let phoneNumber = decoded.phone_number;

    // remove spaces
    phoneNumber = phoneNumber.trim();

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        phoneNumber,
        createdAt: new Date(),
      });

      console.log("User saved:", phoneNumber);
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
<<<<<<< HEAD
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide phone number",
      });
    }

    // Normalize phone number
    if (phone.length === 10) {
      phone = "+91" + phone;
    }

    const user = await User.findOne({ phoneNumber: phone });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No account found. Please signup first.",
      });
    }

    console.log("User found:", user.phoneNumber);

    res.status(200).json({
      status: "success",
      message: "Login successful",
=======
    const { firebaseToken } = req.body;
    console.log(firebaseToken);
    if (!firebaseToken) {
      return res.status(400).json({
        message: "Firebase token required",
      });
    }

    // verify firebase token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    console.log(decoded);
    const phoneNumber = decoded.phone_number;

    if (!phoneNumber) {
      return res.status(400).json({
        message: "Invalid phone number",
      });
    }

    // check user
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please create an account",
      });
    }

    res.status(200).json({
      status: "success",
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
      data: {
        user,
      },
    });
  } catch (err) {
<<<<<<< HEAD
    console.error("Login Error:", err.message);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
=======
    console.error(err);

    res.status(401).json({
      message: "Invalid Firebase token",
>>>>>>> e37621d3d03161e4a30b16f7bc125385e0cce2b8
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    console.error("Get Users Error:", err.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};
