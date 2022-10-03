const { model, Schema } = require("mongoose");

const HandOutSchema = new Schema(
  {
    course_code: String,
    level: String,
    course_title: String,
    term: String,
    file: String,
  },
  { timestamps: true }
);

module.exports = model("HandOut", HandOutSchema);
