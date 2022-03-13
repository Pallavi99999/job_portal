const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Job = mongoose.model("jobs");

router.get('/', (req, res) => {
    res.render("job/addOrEdit", {
        viewTitle: "ADD JOB",
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var job = new Job();
    job.job_type = req.body.job_type;
    job.job_description = req.body.job_description;
    job.company_name = req.body.company_name;
    job.company_location = req.body.company_location;
    job.company_contact = req.body.company_contact;
    job.company_email_id = req.body.company_email_id;
    job.salary = req.body.salary;
    job.save((err, doc) => {
        if (!err) {
            res.render("job/addOrEdit", {
                viewTitle: "ADD JOB",
                job: req.body
            });
        }
        else {
            console.log("Error during record insertion: " + err);
        }
    });
}

router.get("/list", (req, res) => {
    Job.find((err, docs) => {
        console.log(docs);
        if (!err) {
            res.render("job/list", {
                list: docs
            });
        }
        else {
            console.log("Error is retrieving job list :" + err);
        }
    });
});

module.exports = router;