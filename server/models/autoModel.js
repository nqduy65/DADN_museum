import mongoose from "mongoose";

const AutoSchema = mongoose.Schema(
  {
    value: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Auto = mongoose.model("Auto", AutoSchema);
export default Auto;
