const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  },
  following: [{ type: Schema.Types.ObjectId, ref: "users", required: false, default: {} }],
  // followingtopics: [{ type: Schema.Types.ObjectId, ref: "topics", required: false, default: {} }]
  followers: [{ type: Schema.Types.ObjectId, ref: "users", required: false, default: {} }],
});

//export it as an output
module.exports = User = mongoose.model("users", UserSchema);
