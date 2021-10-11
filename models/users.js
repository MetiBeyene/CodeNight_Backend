const mongoose= require('mongoose')

Schema=mongoose.Schema

const UserSchema= new Schema({
    Name:{
        type: String,
        //required: true
    },
     email:{
        type: String,
       //required: true,
       unique: true
    },
    password:{
        type: String,
        
    },
    UserName: {
        type: String,
        unique:true
    },
    isFreelancer: {
        type: Boolean,
      // required: true
    },
    Proffesion: {
        type:String
    },
    Bio: {
        type:String
    },
    avatar: {
        type:String
    },
    contact: {
        type: Object,
       // required: true
    },
    skill: {
        type:String
    },
    Education: {
         type:Object
    },
    Privious_Projects: {
        type:Object
    },
    date:{
        type: Date,
       default: Date.now()
    },
});

module.exports=users=mongoose.model('Users', UserSchema )