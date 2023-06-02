const express = require("express");
const app = express();

const jobRoutes = require('./routes/JobRoutes');

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// simple test route to check if the server is running correctly
app.get("/", (req, res) => res.send("Server is running"));

app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
