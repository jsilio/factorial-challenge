"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

import { BikeConfigInput } from "../../../server/src/routers/schema";
import { PriceSummary } from "@/components/price-summary";

export function BikeConfigurator() {
  const form = useForm<BikeConfigInput>({
    resolver: zodResolver(BikeConfigInput),
    defaultValues: { selections: {} },
  });

  const selections = form.watch("selections");

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  const { data: partOptions, isLoading } = useQuery(
    trpc.bike.getPartOptions.queryOptions(),
  );
  const categories = partOptions ? Object.keys(partOptions) : [];

  if (isLoading) return <ConfiguratorSkeleton />;
  if (!partOptions) return null;

  return (
    <main className="container mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <Card>
          <CardContent>
            <PriceSummary selections={selections} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-8">
                {categories.map((category) => (
                  <FormField
                    key={category}
                    control={form.control}
                    name={`selections.${category}` as const}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base font-semibold capitalize">
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

function ConfiguratorSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
