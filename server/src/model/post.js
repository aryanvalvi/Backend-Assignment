const mongoose = require("mongoose")

const textPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users2",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const TextPost = mongoose.model("TextPost2", textPostSchema)

module.exports = TextPost
