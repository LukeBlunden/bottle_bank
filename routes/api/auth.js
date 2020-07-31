const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User model
const User = require("../../models/User");

// @route GET api/auth/user
// @desc Get user data
// @access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// @route POST api/auth
// @desc Authenticate the user
// @access public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({
        msg:
          "Invalid credentials, please check email and/or password and try again",
      });
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          msg:
            "Invalid credentials, please check email and/or password and try again",
        });
      }
      // If password matches then get token
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          // Return token and saved user without password
          console.log(user);
          res.json({
            token,
            user: {
              _id: user.id,
              name: user.name,
              email: user.email,
              regDate: user.regDate,
              __v: user.__v,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
