import { PartCategory, type PartOption } from "@/db";
import { publicProcedure, router } from "@/lib/trpc";

import { BikeConfigInput, BikeConfigOutput } from "./bike.schema";

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
    .input(BikeConfigInput)
    .output(BikeConfigOutput)
    .query(async ({ ctx, input }) => {
      const selectedOptions = await ctx.db.partOption.findMany({
        where: {
          OR: Object.entries(input.selections).map(([category, value]) => ({
            category: PartCategory[category as keyof typeof PartCategory],
            value,
          })),
        },
      });

      const optionsByCategory: Record<string, PartOption> = {};
      const selectedIds = new Set<string>();

      for (const option of selectedOptions) {
        optionsByCategory[option.category] = option;
        selectedIds.add(option.id);
      }

      const compatibilityRules = await ctx.db.compatibilityRule.findMany();

      const errors = compatibilityRules
        .filter(
          (rule) =>
            selectedIds.has(rule.sourceOptionId) &&
            selectedIds.has(rule.targetOptionId),
        )
        .map((rule) => rule.message || "Invalid combination selected.");

      if (errors.length > 0) {
        return { totalPrice: null, errors, breakdown: [] };
      }

      const breakdown = selectedOptions.map((option) => ({
        label: option.label,
        basePrice: option.basePrice,
        adjustment: 0,
      }));

      let totalPrice = selectedOptions.reduce(
        (sum, option) => sum + option.basePrice,
        0,
      );

      const pricingRules = await ctx.db.pricingRule.findMany();

      for (const rule of pricingRules) {
        const conditions = JSON.parse(rule.conditions) as Array<{
          category: string;
          value: string;
        }>;

        const matchesAllConditions = conditions.every(({ category, value }) => {
          const selectedOption = optionsByCategory[category];
          return selectedOption?.value === value;
        });

        if (matchesAllConditions) {
          const affectedOption = selectedOptions.find(
            (option) => option.id === rule.partOptionId,
          );

          if (affectedOption) {
            totalPrice += rule.priceAdjustment;

            const breakdownItem = breakdown.find(
              (item) => item.label === affectedOption.label,
            );

            if (breakdownItem) breakdownItem.adjustment += rule.priceAdjustment;
          }
        }
      }

      return { totalPrice, errors: [], breakdown };
    }),
});
