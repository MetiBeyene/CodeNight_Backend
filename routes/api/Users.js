const express = require("express");
 const router = express.Router();
 const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const users = require("../../models/users");

//@ Get request to api/users
//@ desc get all  users
//@ access Private

router.get('/', (req,res)=>{
    users.find()
    .sort({date:-1})
    .then(user=> res.json(user))
    
})

//@ Get request to api/pets by id
//@ desc Get all pets
//@ access Private

router.get("/:id", (req,res)=>{
  users.findOne({token: req.params.id})
  .then(user=> res.json(user))
})

//@ post request to api/users
//@ desc Register user
//@ access Private
router.post("/", (req, res) => {
  const {Name,email,password,UserName,isFreelancer,Proffesion,Bio,avatar,contact,skill,Education,Privious_Projects}= req.body
  if (!Name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }
  users.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }
  })
  users.findOne({ UserName }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User Name already exists" });
    }
  })
  let NewUser = new users({
    Name,
    email,
    password,
    UserName,
    isFreelancer,
     Proffesion,
    Bio,
    avatar,
    contact,
    skill,
     Education,
      Privious_Projects,
  });
   // create salt&hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(NewUser.password, salt, (err, hash) => {
           //if (err) throw err;
           NewUser.password = hash;
    
      NewUser.save().then(user =>{
        jwt.sign({ id: user.id },
        config.get('jwtSecret'),
          { expiresIn: 3600 },
            (err, token) => {
          if(err) throw err
        })
        
        res.json({
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
            Privious_Projects: user.Privious_Projects
      
          }
        })
  });
      })
  })
});



module.exports = router;
