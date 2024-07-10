"use server";

import { connectMongoDB } from "@/config/connect";
import User from "@/models/Users.model";
import { currentUser } from "@clerk/nextjs/server";

connectMongoDB();

export const getCurrentUser = async () => {
  try {
    const userClerk = await currentUser();

    //kiểm tra xem user đã tồn tại trong db chưa
    const user = await User.findOne({ clerkUserId: userClerk?.id });

    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    const newUser = await User.create({
      name: userClerk?.fullName,
      email: userClerk?.emailAddresses[0].emailAddress,
      clerkUserId: userClerk?.id,
      profilePic: userClerk?.imageUrl,
      isActive: true,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    return {
      success: false,
      msg: error,
    };
  }
};
