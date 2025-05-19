import { z } from "zod";

export const BikeConfigInput = z.object({
  selections: z.record(z.string(), z.string()),
});

const BikeBreakdown = z.object({
  label: z.string(),
  basePrice: z.number(),
  adjustment: z.number(),
});

export const BikeConfigOutput = z.object({
  totalPrice: z.number().nullable(),
  errors: z.array(z.string()),
  breakdown: z.array(BikeBreakdown),
});
