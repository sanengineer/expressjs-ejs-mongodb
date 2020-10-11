const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userHistorySchema = new mongoose.Schema({
  score: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: "user_game",
  },
});

module.exports = mongoose.model("user_game_history", userHistorySchema);
