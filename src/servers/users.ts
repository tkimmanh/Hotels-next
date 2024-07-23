"use server";

import { connectMongoDB } from "@/config/connect";
import User from "@/models/Users.model";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

export const listUser = async () => {
  try {
    if (User) {
      const users = await User.find().sort({ createdAt: -1 });
      return {
        status: 200,
        data: JSON.parse(JSON.stringify(users)),
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error,
    };
  }
};

export const updateUserRole = async (userId: string, role: boolean) => {
  try {
    const user = await User.findById({
      _id: userId,
    });

    if (!user) {
      return {
        success: false,
        msg: "User not found",
      };
    }
    user.isAdmin = role;

    await user.save();

    revalidatePath("/admin/users");
  } catch (error) {
    return {
      success: false,
      msg: error,
    };
  }
};
