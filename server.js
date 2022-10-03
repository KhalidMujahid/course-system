const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// importing db
require("./config/db");

// middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// routes
app.use("/", require("./routes/router"));

app.listen(PORT, () => console.log("Server running on port.. ", PORT));
