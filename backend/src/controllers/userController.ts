import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  async function hashPassword(password: string) {
    const saltRounds = 10;
    return bcryptjs.hash(password, saltRounds);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({
      status: false,
      message: "User Already Exists. Please Login",
    });
  }

  // Hash the password using bcryptjs
  const hashedPassword = await hashPassword(password);

  console.log(hashedPassword);

  // Create the new user
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      profile_completion: false,
    },
  });

  if (newUser) {
    return res.status(200).json({
      status: true,
      message: "User Created Succesfully",
    });
  }
};
