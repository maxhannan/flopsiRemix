import bcrypt from "bcryptjs";
import { prisma } from "./prisma.server";

export const createUser = async (user) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  });
  return { id: newUser.id, username: user.username };
};
