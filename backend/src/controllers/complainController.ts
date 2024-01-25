import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export const submitComplain = async (req: Request, res: Response) => {
  try {
    const {
      userid,
      name,
      phone,
      phone2,
      address,
      date,
      price,
      courier,
      couriercharge,
      description,
      image,
    } = req.body;

    // Insert data into Complain model
    const newComplain = await prisma.complain.create({
      data: {
        userid,
        name,
        phone,
        phone2,
        address,
        date,
        price,
        courier,
        couriercharge,
        description,
      },
    });

    // Insert data into Complainimage model
    const newComplainImages = await prisma.complainimage.createMany({
      data: image.map((image: any) => ({
        complainid: newComplain.id,
        image,
      })),
    });

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
