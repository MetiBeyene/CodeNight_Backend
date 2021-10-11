const mongoose = require("mongoose");

Schema = mongoose.Schema;

const FreelancerSchema = new Schema({
  About: {
    type: String,
  },
  Experiance: {
    type: Array,
  },
  Education: {
    type: Array,
  },
  Skill: {
    type: Array,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Freelancer = mongoose.model("Freelancer", FreelancerSchema);
