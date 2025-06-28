import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    apartmentNo: {
      type: String,
    },
    street: {
      type: String,
    },
    area: {
      type: String,
    },
    landmark: {
      type: String,
    },
    city: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
