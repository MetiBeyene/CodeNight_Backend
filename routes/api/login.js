const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const users = require("../../models/users");

router.post('/', (req,res)=>{
  console.log(req.body)
    users.findOne({email: req.body.email}).then(user => {
      if(user){
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
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
                avatar: `../../public/uploads/${req.body.values.Name}.jpg`,
                contact: user.contact,
                skill: user.skill,
                Education: user.Education,
                Privious_Projects: user.Privious_Projects,
              },
            });
          }
        );
        })
      } else {
        res.status(400).json({msg:"user not found"})
      }
    })
  })

  module.exports = router