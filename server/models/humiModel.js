import mongoose from "mongoose";

const HumiSchema = mongoose.Schema(
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

const Humi = mongoose.model("Humi", HumiSchema);
export default Humi;
