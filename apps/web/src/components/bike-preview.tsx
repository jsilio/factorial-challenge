"use client";

type BikeSelections = Record<string, string>;

interface BikePreviewProps {
  selections: BikeSelections;
}

export function BikePreview({ selections }: BikePreviewProps) {
  const hasSelections = Object.keys(selections).length > 0;

  function formatCategory(category: string): string {
    return category.replace(/_/g, " ");
  }

  if (!hasSelections) {
    return (
      <p className="text-muted-foreground">
        Start selecting parts to configure your bike
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(selections).map(([category, value]) => (
        <div key={category} className="space-y-1">
          <p className="font-medium">{formatCategory(category)}</p>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      ))}
    </div>
  );
}
