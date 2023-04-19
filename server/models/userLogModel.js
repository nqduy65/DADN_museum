import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserLogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserLog = mongoose.model("UserLog", UserLogSchema);

export default UserLog;
