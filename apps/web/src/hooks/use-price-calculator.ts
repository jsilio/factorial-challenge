"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

type BikeSelections = Record<string, string>;

interface PriceCache {
  [key: string]: {
    totalPrice: number | null;
    breakdown: Array<{ label: string; basePrice: number; adjustment: number }>;
    errors: string[];
  };
}

export function usePriceCalculator(selections: BikeSelections) {
  const cacheKey = useMemo(() => JSON.stringify(selections), [selections]);

  const [priceCache, setPriceCache] = useState<PriceCache>({});

  const [isCalculating, setIsCalculating] = useState(false);

  const priceQuery = useQuery({
    ...trpc.bike.calculatePrice.queryOptions({ selections }),
    enabled: Object.keys(selections).length > 0,

    refetchOnWindowFocus: false,

    staleTime: 30000,
  });

  useEffect(() => {
    if (priceQuery.data) {
      setPriceCache((prev) => ({
        ...prev,
        [cacheKey]: {
          totalPrice: priceQuery.data.totalPrice,
          breakdown: priceQuery.data.breakdown,
          errors: priceQuery.data.errors,
        },
      }));
      setIsCalculating(false);
    }
  }, [priceQuery.data, cacheKey]);

  useEffect(() => {
    if (Object.keys(selections).length === 0) {
      setIsCalculating(false);
      return;
    }

    if (!priceCache[cacheKey]) {
      setIsCalculating(true);
    }
  }, [cacheKey, priceCache, selections]);

  const result = priceCache[cacheKey] || {
    totalPrice: priceQuery.data?.totalPrice ?? null,
    breakdown: priceQuery.data?.breakdown || [],
    errors: priceQuery.data?.errors || [],
  };

  return {
    ...result,
    isLoading: isCalculating || priceQuery.isLoading,
  };
}
