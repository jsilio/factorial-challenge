"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/utils/trpc";

import { BikeConfigInput } from "../../../server/src/routers/schema";

export function BikeConfigurator() {
  const { control, watch, handleSubmit } = useForm<BikeConfigInput>({
    resolver: zodResolver(BikeConfigInput),
    defaultValues: { selections: {} },
  });

  const selections = watch("selections");

  const { data: partOptions, isLoading: isLoadingParts } = useQuery(
    trpc.bike.getPartOptions.queryOptions(),
  );

  const { data: priceResult, isLoading: isCalculating } = useQuery({
    ...trpc.bike.calculatePrice.queryOptions({ selections }),
    enabled: Object.keys(selections).length > 0,
  });

  const categories = partOptions ? Object.keys(partOptions) : [];

  const onSubmit = (data: BikeConfigInput) => {
    console.log("Final configuration:", data);
    // Here you could save the configuration or proceed to checkout
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Configure your dream bike
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isLoadingParts ? (
            <BikeConfiguratorSkeleton />
          ) : (
            categories.map((category) => (
              <div key={category} className="space-y-4">
                <Label className="text-lg font-semibold normal-case">
                  {category.replace(/_/g, " ")}
                </Label>
                <Controller
                  name={`selections.${category}` as const}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 gap-2"
                    >
                      {partOptions?.[category]?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={option.value} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1">
                            <span className="flex justify-between items-center">
                              <span>{option.label}</span>
                              <span className="text-sm text-gray-500">
                                {option.basePrice}€
                              </span>
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
            ))
          )}

          <div className="pt-6 border-t">
            {isCalculating ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-40" />
              </div>
            ) : priceResult?.errors && priceResult.errors.length > 0 ? (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {priceResult.errors.map((error) => (
                  <div key={`error-${error}`}>{error}</div>
                ))}
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-semibold">Price Breakdown</h3>
                  {priceResult?.breakdown.map((item) => (
                    <div
                      key={`${item.label}-${item.basePrice}`}
                      className="text-sm text-gray-600 flex justify-between"
                    >
                      <span>{item.label}</span>
                      <span>
                        {item.basePrice}€
                        {item.adjustment
                          ? ` (${item.adjustment > 0 ? "+" : ""}${item.adjustment}€)`
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  type="submit"
                  disabled={isCalculating || !priceResult?.totalPrice}
                  className="ml-4"
                >
                  {isCalculating
                    ? "Calculating..."
                    : `Order Now: ${priceResult?.totalPrice ?? 0}€`}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

function BikeConfiguratorSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-6 w-40 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
