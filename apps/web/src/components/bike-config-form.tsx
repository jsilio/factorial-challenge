"use client";

import { useFormContext } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface BikeConfigFormProps {
  categories: string[];
  partOptions:
    | Record<
        string,
        Array<{
          id: string;
          category: string;
          value: string;
          label: string;
          basePrice: number;
        }>
      >
    | undefined;
  isLoading: boolean;
}

export function BikeConfigForm({
  categories,
  partOptions,
  isLoading,
}: BikeConfigFormProps) {
  const form = useFormContext();

  if (isLoading) {
    return <ConfiguratorSkeleton />;
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <FormField
          key={category}
          control={form.control}
          name={`selections.${category}` as const}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">
                {formatCategory(category)}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {partOptions?.[category]?.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors [&:has([data-state=checked])]:bg-muted [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value={option.value} id={option.id} />
                      <label
                        htmlFor={option.id}
                        className="flex justify-between w-full cursor-pointer"
                      >
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">
                          {option.basePrice}€
                        </span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}

function formatCategory(category: string): string {
  return category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
