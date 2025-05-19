import type { Context as HonoContext } from "hono";

import { prisma } from "@/db";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({
  context: _context,
}: CreateContextOptions) {
  return {
    db: prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
