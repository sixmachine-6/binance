const admin = require("../firebaseAdmin");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { firebaseToken, email } = req.body;

    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    let phoneNumber = decoded.phone_number;

    // remove spaces
    phoneNumber = phoneNumber.trim();

    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        phoneNumber,
        email,
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
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(401).json({
      message: "Invalid Firebase token",
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

exports.deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});

    res.status(200).json({
      status: "success",
      message: "All users deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete users",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { firebaseToken } = req.body;
    console.log(req.body);
    if (!firebaseToken) {
      return res.status(401).json({ message: "No Firebase token provided" });
    }

    // Verify Firebase token using Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decodedToken.phone_number;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    res.json({
      email: user.email || null,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};

exports.addEmail = async (req, res) => {
  try {
    const { firebaseToken, email } = req.body;

    if (!firebaseToken) {
      return res.status(401).json({ message: "No Firebase token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    const phoneNumber = decodedToken.phone_number;

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { email },
      { new: true },
    );

    res.json({
      message: "Email saved",
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
