import mongoose from "mongoose";

const FanSchema = mongoose.Schema(
  {
    room: {
      type: String,
    },
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Fan = mongoose.model("Fan", FanSchema);
export default Fan;
