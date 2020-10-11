const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userBiodataSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  jobs: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: "user_game",
  },
});

module.exports = mongoose.model("user_game_biodata", userBiodataSchema);
