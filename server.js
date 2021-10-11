const express= require('express')
const mongoose = require('mongoose')
const fileupload = require("express-fileupload");
const cors =require('cors')
const config=require('config')
const path =require('path')
//const fileupload = require("express-fileupload");
const app=express();


 app.use(fileupload());
 app.use(express.json())
 app.use(cors())
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db= config.get("mongoURI")
 mongoose.connect(db)
 .then(()=>console.log('Mongo DB Connected....'))
 .catch(err=>console.log(err));

app.use(express.static('./public'))
app.use(express.static('./public/uploads'))
app.use(express.static('.'))
 app.use('/api/users', require('./routes/api/users'))
 app.use('/api/auth', require('./routes/api/auth'))
 //app.use('/api/login',require('./routes/api/login'))
 app.use('/api/jobs',require('./routes/api/jobs'))

 const port = process.env.PORT ||5000;
 if(process.env.NODE_ENV==='production'){
   app.use(express.static('client/build'))

   app.get('*', (req,res)=>{
     res.sendFile(path.resolve(__dirname,'client','build','index.html'))

   })
 }
 app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  