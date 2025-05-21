"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { trpc } from "@/utils/trpc";

interface PriceSummaryProps {
  selections: Record<string, string>;
}

export function PriceSummary({ selections }: PriceSummaryProps) {
  const debouncedSelections = useDebouncedValue(selections, 300);

  const { data: priceResult, isLoading } = useQuery(
    trpc.bike.calculatePrice.queryOptions(
      { selections: debouncedSelections },
      { enabled: Object.keys(debouncedSelections).length > 0 },
    ),
  );

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2 mt-4" />
      </div>
    );
  }

  if (priceResult?.errors?.length) {
    return (
      <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">
        {priceResult.errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    );
  }

  if (priceResult?.breakdown?.length) {
    return (
      <>
        <div className="space-y-2">
          {priceResult.breakdown.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>
                {item.basePrice}€
                {item.adjustment !== 0 && (
                  <span
                    className={
                      item.adjustment > 0
                        ? "text-destructive"
                        : "text-green-600"
                    }
                  >
                    {" "}
                    ({item.adjustment > 0 ? "+" : ""}
                    {item.adjustment}€)
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">{priceResult.totalPrice}€</span>
        </div>
        <Button className="w-full mt-4" disabled={!priceResult.totalPrice}>
          Order Now
        </Button>
      </>
    );
  }

  return <p className="text-muted-foreground">Select parts to see pricing</p>;
}
