const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/NCS")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
