"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { usePriceCalculator } from "@/hooks/use-price-calculator";

interface PriceItem {
  label: string;
  basePrice: number;
  adjustment: number;
}

interface PriceSummaryProps {
  selections: Record<string, string>;
}

export function PriceSummary({ selections }: PriceSummaryProps) {
  const { isLoading, breakdown, errors, totalPrice } =
    usePriceCalculator(selections);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2 mt-4" />
      </div>
    );
  }

  if (errors && errors.length > 0) {
    return (
      <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">
        {errors.map((error) => (
          <p key={`error-${error}`}>{error}</p>
        ))}
      </div>
    );
  }

  if (breakdown && breakdown.length > 0) {
    return (
      <>
        <div className="space-y-2 sticky top-0 bg-background">
          {breakdown.map((item) => (
            <div
              key={`${item.label}-${item.basePrice}`}
              className="flex justify-between text-sm"
            >
              <span>{item.label}</span>
              <div>
                <span>{item.basePrice}€</span>
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
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">{totalPrice}€</span>
        </div>
        <Button className="w-full mt-4" disabled={!totalPrice}>
          Order Now
        </Button>
      </>
    );
  }

  return <p className="text-muted-foreground">Select parts to see pricing</p>;
}
