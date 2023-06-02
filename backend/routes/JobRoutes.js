const express = require('express');
const router = express.Router();

const { getAllJobs, createJob, updateJob, deleteJob } = require('../controllers/JobsController');

router.get('/', getAllJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;