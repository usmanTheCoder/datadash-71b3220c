import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/prisma/client';
import { createRouter } from '@/server/router/context';

const authRouter = createRouter()
  .mutation('register', {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(3),
    }),
    async resolve({ input }) {
      const { email, password, name } = input;
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },
  })
  .mutation('login', {
    input: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    async resolve({ input }) {
      const { email, password } = input;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },
  });

export default authRouter;