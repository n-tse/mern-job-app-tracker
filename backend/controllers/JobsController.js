const Job = require("../models/Job");

exports.getAllJobs = (req, res) => {
  Job.find()
    .then((job) => res.json(job))
    .catch((e) =>
      res.status(404).json({ message: "Job not found", error: e.message })
    );
};

exports.createJob = (req, res) => {
  Job.create(req.body)
    .then((data) => res.json({ message: "Job successfully added", data }))
    .catch((e) =>
{      console.log(req.body);
      res.status(400).json({ message: "Failed to add job", error: e.message })}
    );
};

exports.updateJob = (req, res) => {
  Job.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((data) => res.json({ message: "Job successfully updated", data }))
    .catch((e) =>
      res
        .status(400)
        .json({ message: "Failed to update job", error: e.message })
    );
};

exports.deleteJob = (req, res) => {
  Job.findByIdAndDelete(req.params.id, req.body)
    .then((data) => res.json({ message: "Job successfully deleted", data }))
    .catch((e) =>
      res
        .status(404)
        .json({ message: "Job not found", error: e.message })
    );
};
