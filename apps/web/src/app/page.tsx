"use client";

import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { trpc } from "@/utils/trpc";
import { BikeConfigInput } from "../../../server/src/routers/schema";
import { BikeConfigForm } from "@/components/bike-config-form";
import { PriceSummary } from "@/components/price-summary";
import { usePriceCalculator } from "@/hooks/use-price-calculator";

export default function BikePage() {
  const form = useForm<BikeConfigInput>({
    resolver: zodResolver(BikeConfigInput),
    defaultValues: { selections: {} },
  });

  const selections = form.watch("selections");

  const { data: partOptions, isLoading: isLoadingParts } = useQuery(
    trpc.bike.getPartOptions.queryOptions(),
  );

  const priceDetails = usePriceCalculator(selections);

  const categories = partOptions ? Object.keys(partOptions) : [];

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Configure your dream</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <BikeConfigForm
                    categories={categories}
                    partOptions={partOptions}
                    isLoading={isLoadingParts}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Price</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceSummary
                  isLoading={priceDetails.isLoading}
                  totalPrice={priceDetails.totalPrice}
                  breakdown={priceDetails.breakdown}
                  errors={priceDetails.errors}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
