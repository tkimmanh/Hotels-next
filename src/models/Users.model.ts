import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["Users"]) {
  delete mongoose.models["Users"];
}

const Users = mongoose.model("Users", userSchema);

export default Users;
