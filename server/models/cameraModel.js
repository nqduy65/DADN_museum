import mongoose from "mongoose";

const TempSchema = mongoose.Schema(
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

const Camera = mongoose.model("Camera", TempSchema);
export default Camera;
