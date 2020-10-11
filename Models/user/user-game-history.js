const mongoose = require("mongoose");
const { ObjectId } = mongoosee.Schema;

const userHistorySchema = new mongoose.Schema({
  score: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user_history", userHistorySchema);
