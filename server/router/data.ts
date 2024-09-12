import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";
import { prisma } from "@/lib/prisma";

const defaultDataSelect = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};

export const dataRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const data = await ctx.prisma.data.findMany({
        select: defaultDataSelect,
      });
      return data;
    },
  })

  .query("getSingle", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const data = await ctx.prisma.data.findUnique({
        where: { id },
        select: defaultDataSelect,
      });
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data not found",
        });
      }
      return data;
    },
  })

  .mutation("create", {
    input: z.object({
      name: z.string(),
      description: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const data = await ctx.prisma.data.create({
        data: input,
        select: defaultDataSelect,
      });
      return data;
    },
  })

  .mutation("update", {
    input: z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const { id, ...rest } = input;
      const data = await ctx.prisma.data.updateMany({
        where: { id },
        data: rest,
        select: defaultDataSelect,
      });
      if (data.count === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data not found",
        });
      }
      return data;
    },
  })

  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const data = await ctx.prisma.data.deleteMany({
        where: { id },
      });
      if (data.count === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data not found",
        });
      }
      return data;
    },
  });