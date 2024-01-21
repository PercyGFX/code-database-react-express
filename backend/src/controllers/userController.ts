import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

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

///////////////// login function /////////////////////

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // compare hash
  async function comparePassword(
    inputPassword: string,
    storedHashedPassword: string
  ) {
    return bcryptjs.compare(inputPassword, storedHashedPassword);
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "User Not Found",
      });
    }

    // Hash the password using bcryptjs
    const passwordcheck = await comparePassword(
      password,
      existingUser.password
    );

    if (passwordcheck) {
      console.log(existingUser);

      const tokenuser = {
        id: existingUser.id,
        email: existingUser.email,
      };

      const token = await jwt.sign(tokenuser, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      // cookie set
      res.cookie("token", token, {
        httpOnly: false,
        path: "/",
        expires: new Date(Date.now() + 3600000),
      });

      return res.status(200).json({
        status: true,
        message: "Login Success",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Password is wrong!",
      });
    }
  } catch (err: any) {
    return res.status(400).json({
      status: true,
      message: "Internal Server Error!",
    });
  } finally {
    await prisma.$disconnect();
  }
};
