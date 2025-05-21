"use client";

import { useQuery } from "@tanstack/react-query";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { trpc } from "@/lib/trpc";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";

interface PriceSummaryProps {
  selections: Record<string, string>;
  onSelectionReset?: () => void;
}

function PriceSummarySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-5/6" />
      <Separator className="my-3" />
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
}

export function PriceSummary({
  selections,
  onSelectionReset,
}: PriceSummaryProps) {
  const debouncedSelections = useDebouncedValue(selections, 300);
  const selectionCount = Object.keys(debouncedSelections).filter(
    (key) => debouncedSelections[key],
  ).length;

  const { data, isLoading } = useQuery(
    trpc.bike.calculatePrice.queryOptions(
      { selections: debouncedSelections },
      {
        enabled: selectionCount > 0,
        staleTime: 10000,
      },
    ),
  );

  const hasErrors = data?.errors && data.errors.length > 0;

  return (
    <Card className="sticky top-20 h-fit border-0 bg-muted/70">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg">Price Summary</CardTitle>
        {selectionCount > 0 && onSelectionReset && hasErrors && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelectionReset()}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Reset all selections"
          >
            Reset configuration
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {hasErrors && (
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Invalid Configuration</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-1">
                {data.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {isLoading && selectionCount > 0 ? (
          <PriceSummarySkeleton />
        ) : selectionCount > 0 ? (
          <div className="space-y-2">
            {data?.breakdown && data.breakdown.length > 0 ? (
              data.breakdown.map((item) => (
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
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Calculating price..."
                  : "Update selections to see price details."}
              </p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Select bike parts to see price details.
          </p>
        )}

        {selectionCount > 0 && !isLoading && (
          <>
            <Separator className="my-3" />
            <div className="flex justify-between items-center">
              <span className="font-medium">Total</span>
              {hasErrors ? (
                <span className="text-lg font-bold text-destructive">
                  Review selections
                </span>
              ) : data?.totalPrice !== null ? (
                <span className="text-xl font-semibold">
                  {data?.totalPrice}€
                </span>
              ) : (
                <Skeleton className="h-6 w-20" />
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
