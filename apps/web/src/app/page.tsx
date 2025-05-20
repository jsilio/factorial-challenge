"use client";

import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { trpc } from "@/utils/trpc";
import { BikeConfigInput } from "../../../server/src/routers/schema";
import { BikeConfigurator } from "@/components/bike-configurator";
import { PriceSummary } from "@/components/price-summary";
import { usePriceCalculator } from "@/hooks/use-price-calculator";

export default function BikePage() {
  const form = useForm<BikeConfigInput>({
    resolver: zodResolver(BikeConfigInput),
    defaultValues: { selections: {} },
  });

  const selections = form.watch("selections");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 order-1 lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Price</CardTitle>
            </CardHeader>
            <CardContent>
              <PriceSummary selections={selections} />
            </CardContent>
          </Card>
        </div>

        <div className="order-2 lg:order-2">
          <BikeConfigurator />
        </div>
      </div>
    </div>
  );
}
