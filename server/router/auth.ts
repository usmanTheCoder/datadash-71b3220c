import { createRouter } from "./context";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/prisma/client";

export const authRouter = createRouter()
  .mutation("register", {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(3),
    }),
    async resolve({ input }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
      });

      return { message: "User created successfully" };
    },
  })
  .mutation("login", {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(input.password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      return { message: "Login successful", user };
    },
  })
  .query("getUserProfile", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  })
  .mutation("updateUserProfile", {
    input: z.object({
      userId: z.string(),
      name: z.string().min(3).optional(),
      email: z.string().email().optional(),
      password: z.string().min(8).optional(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      let updatedUser;

      if (input.password) {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        updatedUser = await prisma.user.update({
          where: { id: input.userId },
          data: {
            name: input.name || user.name,
            email: input.email || user.email,
            password: hashedPassword,
          },
        });
      } else {
        updatedUser = await prisma.user.update({
          where: { id: input.userId },
          data: {
            name: input.name || user.name,
            email: input.email || user.email,
          },
        });
      }

      return updatedUser;
    },
  });