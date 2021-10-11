const mongoose= require('mongoose')

Schema=mongoose.Schema

const EmployerSchema= new Schema({
   
    companyName: {
        type: String,
       required: true
    },
     companyDiscription: {
        type: String,
       required: true
    },
    Projects: {
        type: Array,
    },
    date:{
        type: Date,
       default: Date.now()
    },

});

module.exports=Employer=mongoose.model('Employer', EmployerSchema )