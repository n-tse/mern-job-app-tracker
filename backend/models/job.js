const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  applicationStatus: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  _dateModified: {
    type: Date,
    default: Date.now,
  }
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
