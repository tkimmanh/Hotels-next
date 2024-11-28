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
      default: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const Users = mongoose.model("users", userSchema);

export default Users;
