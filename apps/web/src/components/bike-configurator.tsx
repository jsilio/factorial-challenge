"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { BikeConfigInput } from "@markus/api/schema";

import { BikePreview } from "@/components/bike-preview";
import { PriceSummary } from "@/components/price-summary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";

export function BikeConfigurator() {
  const form = useForm<BikeConfigInput>({
    resolver: zodResolver(BikeConfigInput),
    defaultValues: { selections: {} },
  });

  const selections = form.watch("selections");

  const handleResetAllSelections = () => {
    const currentValues = form.getValues();
    const resetSelections: Record<string, string> = {};
    if (currentValues.selections) {
      for (const key in currentValues.selections) {
        resetSelections[key] = "";
      }
    }

    form.reset({ ...currentValues, selections: resetSelections });
  };

  const {
    data: partOptions,
    error,
    isLoading,
  } = useQuery(trpc.bike.getPartOptions.queryOptions());
  const categories = partOptions ? Object.keys(partOptions) : [];

  if (isLoading) return <BikeConfiguratorSkeleton />;

  if (error)
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  if (!partOptions) return null;

  return (
    <main className="container mx-auto max-w-7xl py-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px] relative">
        <section className="flex flex-col gap-8">
          <BikePreview />
          <PriceSummary
            selections={selections}
            onSelectionReset={handleResetAllSelections}
          />
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Configure your dream bike</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                {categories.map((category) => (
                  <FormField
                    key={category}
                    control={form.control}
                    name={`selections.${category}` as const}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-medium capitalize">
                          {category.replace(/_/g, " ").toLowerCase()}
                        </FormLabel>

                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            {partOptions[category].map((option) => (
                              <div
                                key={option.id}
                                className={cn(
                                  "flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-colors",
                                  "hover:bg-muted/50 [&:has([data-state=checked])]:bg-muted [&:has([data-state=checked])]:border-primary",
                                )}
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={option.id}
                                />
                                <FormLabel
                                  htmlFor={option.id}
                                  className="flex justify-between w-full cursor-pointer"
                                >
                                  {option.label}
                                  <span className="text-muted-foreground">
                                    +€{option.basePrice}
                                  </span>
                                </FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function BikeConfiguratorSkeleton() {
  return (
    <main className="container mx-auto max-w-7xl py-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <Card className="sticky top-20 h-fit">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Separator className="my-3" />
              <Skeleton className="h-7 w-1/2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full rounded-md border p-3" />
                    <Skeleton className="h-12 w-full rounded-md border p-3" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
