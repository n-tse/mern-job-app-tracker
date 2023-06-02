const express = require("express");
const app = express();
const cors = require('cors');

const jobRoutes = require('./routes/JobRoutes');

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

// enables CORS for all routes with default options
// can pass an optional 'options' object to the cors middleware
// eg: app.use(cors({ origin:'http://localhost:5173', credentials: true }))
// allows front and backend to communicate 
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// simple test route to check if the server is running correctly
app.get("/", (req, res) => res.send("Server is running"));

app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
