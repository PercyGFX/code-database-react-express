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

/// profile completetion

export const profilecomplete = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      business,
      categories,
      description,
      phone,
      whatsapp,
      platform,
      image,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        profile_completion: true,
      },
    });

    if (existingUser && existingUser.profile_completion) {
      return res.status(400).json({
        status: false,
        message: "Profile completion is already done for this user.",
      });
    }

    // Create user
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...{
          name: name,
          business: business,
          description: description,
          phone: phone,
          whatsapp: whatsapp,
          profile_completion: true,
        },
      },
    });

    // Create categories associated with the user
    await Promise.all(
      categories.map(async (category: any) => {
        await prisma.category.create({
          data: {
            userid: id,
            category: category, // Ensure this matches the actual property name in your Prisma schema
          },
        });
      })
    );

    // Create platforms associated with the user
    await Promise.all(
      platform.map(async (platform: any) => {
        await prisma.platform.create({
          data: {
            userid: id,
            platform,
          },
        });
      })
    );

    // Create images associated with the user
    await Promise.all(
      image.map(async (img: any) => {
        await prisma.userimage.create({
          data: {
            userid: id,
            image: img,
          },
        });
      })
    );

    res
      .status(201)
      .json({ message: "User and related data created successfully" });
  } catch (error) {
    console.error("Error creating user and related data:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

//////////////// completion check

interface token {
  id: number;
  user: string;
  email: string;
}

export const profilecheck = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    //check if jwt valid
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    const existingUser = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        profile_completion: true,
      },
    });

    if (existingUser && existingUser.profile_completion) {
      return res.status(200).json({
        status: true,
        message: "Profile Completion is done for this user.",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Profile Completion is not done for this user.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
