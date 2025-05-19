import { z } from "zod";

import { PartCategory } from "@/db";
import { publicProcedure, router } from "@/lib/trpc";

export const bikeRouter = router({
  getPartOptions: publicProcedure.query(async ({ ctx }) => {
    const options = await ctx.db.partOption.findMany();
    const grouped: Record<string, typeof options> = {};

    for (const option of options) {
      if (!grouped[option.category]) grouped[option.category] = [];
      grouped[option.category].push(option);
    }

    return grouped;
  }),

  getCompatibilityRules: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.compatibilityRule.findMany();
  }),

  getPricingRules: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.pricingRule.findMany();
  }),

  calculatePrice: publicProcedure
    .input(
      z.object({
        selections: z.record(z.string(), z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { selections } = input;
      const filters = Object.entries(selections).map(([category, value]) => ({
        category: PartCategory[category as keyof typeof PartCategory],
        value,
      }));
      const selectedOptions = await ctx.db.partOption.findMany({
        where: { OR: filters },
      });
      const totalPrice = selectedOptions.reduce(
        (sum, option) => sum + option.basePrice,
        0,
      );
      return { totalPrice, errors: [] };
    }),
});
