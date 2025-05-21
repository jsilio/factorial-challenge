"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike } from "lucide-react";

export function BikePreview() {
  return (
    <Card className="h-fit border-0 bg-muted/70 flex items-center justify-center">
      <Bike className="size-45" />
    </Card>
  );
}
