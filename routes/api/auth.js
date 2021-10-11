const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const users = require("../../models/users");

//@ Get request to api/users
//@ desc get all  users
//@ access Private

router.get("/", (req, res) => {
  users
    .find()
    .sort({ date: -1 })
    .then((user) => res.json(user));
});

//@ Get request to api/pets by id
//@ desc Get all pets
//@ access Private

router.get("/:id", (req, res) => {
  users.findOne({ token: req.params.id }).then((user) => res.json(user));
});

//@ post request to api/auth
//@ desc Register Auth user
//@ access Public
router.post("/", (req, res) => {
  const {
    email,
    password,
    UserName,
  } = req.body;
  // Simple authentication
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }
  // Check for exixting user
  users.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exists" });
    }
   // validate password
    bcrypt.compare(password,user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "invalid credientals" });
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                Name: user.Name,
                email: user.email,
                UserName: user.UserName,
                isFreelancer: user.isFreelancer,
                Proffesion: user.Proffesion,
                Bio: user.Bio,
                avatar: user.avatar,
                contact: user.contact,
                skill: user.skill,
                Education: user.Education,
                Privious_Projects: user.Privious_Projects,
              },
            });
          }
        );
      })
  })
});


module.exports = router;
