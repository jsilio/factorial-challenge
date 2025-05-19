"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Configurator() {
  const { data: partOptions, isLoading } = useQuery(
    trpc.bike.getPartOptions.queryOptions(),
  );
  const [selections, setSelections] = useState<Record<string, string>>({});

  const { data: priceResult, isFetching: isCalculating } = useQuery({
    ...trpc.bike.calculatePrice.queryOptions({ selections }),
    enabled: Object.keys(selections).length > 0,
  });

  const categories = useMemo(
    () => (partOptions ? Object.keys(partOptions) : []),
    [partOptions],
  );

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">Configure Your Dream Bike</h1>
      <form className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-2">
            <Label htmlFor={category}>{category.replace(/_/g, " ")}</Label>
            <select
              id={category}
              className="border rounded px-3 py-2"
              value={selections[category] || ""}
              onChange={(e) =>
                setSelections((s) => ({ ...s, [category]: e.target.value }))
              }
            >
              <option value="">Select...</option>
              {partOptions?.[category]?.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label} ({option.basePrice}€)
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="flex items-center gap-4 mt-8">
          <Button type="button" disabled={isCalculating || !priceResult}>
            {isCalculating
              ? "Calculating..."
              : `Total: ${priceResult?.totalPrice ?? 0}€`}
          </Button>
        </div>
        {priceResult?.errors && priceResult.errors.length > 0 && (
          <div className="mt-4 text-red-600">
            {priceResult.errors.map((err) => (
              <div key={err}>{err}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
