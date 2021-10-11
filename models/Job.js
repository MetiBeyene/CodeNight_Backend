const { text } = require("body-parser");
const mongoose = require("mongoose");

Schema = mongoose.Schema;

const JobSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Short_Description: {
    type: String,
    required: true,
  },
   Full_Description: {
    type: String,
    required: true,
  },
  Catagory: {
     type: String,
    required: true,
  },
   Job_Type: {
     type: String,
     required: true,
     enum: ["Permanent", "Contract", "internship"],
   },
  isOpen: {
    type: Boolean,
    default:true,
    required: true,
   
  },
  User_id: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Job = mongoose.model("Job", JobSchema);
