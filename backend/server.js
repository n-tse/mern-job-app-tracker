const express = require("express");

const app = express();

app.use(express.json({ extended: false }));
// simple test route to check if the server is running correctly
app.get("/", (req, res) => res.send("Server is running"))
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
