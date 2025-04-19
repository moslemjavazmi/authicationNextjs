import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  settings: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
