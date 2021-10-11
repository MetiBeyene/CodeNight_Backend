const express = require("express");
const router = express.Router();
const Jobs = require("../../models/Job");



//@ Get request to api/jobs
//@ desc Get all Jobs
//@ access Public  

router.get("/", (req, res) => {
  Jobs.find()
    .sort({ date: -1 })
    .then((Job) => res.json(Job))
});

//@ Get request to api/jobs by id
//@ desc Get job
//@ access Private

router.get("/:id", (req, res) => {
  Jobs.findOne({ token: req.params.id }).then((job) => res.json(job));
});


//@ POST request to api/jobs
//@ desc post a job
//@ access Private
router.post("/", (req, res) => {
  let NewJob = new Jobs({
    Title: req.body.Title,
     Short_Description: req.body. Short_Description,
    Full_Description: req.body.Full_Description,
    Catagory: req.body.Catagory,
    Job_Type: req.body.Job_Type,
     isOpen: req.body.isOpen,
    User_id: req.body.User_id,
  });
  NewJob.save().then(job => res.json(job));
});


module.exports = router;
