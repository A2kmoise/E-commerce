import express from "express";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user;
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

