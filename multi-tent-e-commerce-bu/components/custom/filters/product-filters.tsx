// components/custom/filters/product-filters.tsx
"use client";

import {
  useQueryStates,
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
} from "nuqs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

// Replace with your actual categories from database
const CATEGORIES = [
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "home", label: "Home & Kitchen" },
  { id: "beauty", label: "Beauty & Personal Care" },
  { id: "sports", label: "Sports & Outdoors" },
];

export function ProductFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      minPrice: parseAsInteger.withDefault(0),
      maxPrice: parseAsInteger.withDefault(5000),
      categories: parseAsArrayOf(parseAsString).withDefault([]),
      sort: parseAsString.withDefault("newest"),
    },
    {
      shallow: false,
      history: "push",
    }
  );

  const handlePriceChange = (values: number[]) => {
    setFilters({
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const toggleCategory = (categoryId: string) => {
    const current = filters.categories;
    const updated = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    setFilters({ categories: updated });
  };

  const clearAllFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 5000,
      categories: [],
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.minPrice !== 0 ||
    filters.maxPrice !== 5000 ||
    filters.categories.length > 0 ||
    filters.sort !== "newest";

  // Extract the filter content as JSX, not as a component
  const filterContent = (
    <div className="space-y-6 p-1">
      {/* Clear All Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="w-full justify-center"
        >
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}

      {/* Sort Section */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Sort By</h3>
        <Select
          value={filters.sort}
          onValueChange={(value) => setFilters({ sort: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sorting..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range Section */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Price Range</h3>
        <div className="pt-2">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={handlePriceChange}
            min={0}
            max={5000}
            step={50}
            className="mb-6"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Min</Label>
              <div className="mt-1 text-sm font-medium">
                ${filters.minPrice.toLocaleString()}
              </div>
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Max</Label>
              <div className="mt-1 text-sm font-medium">
                ${filters.maxPrice.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories Section */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Categories</h3>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Trigger */}
      <div className="lg:hidden w-full mb-6">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  Active
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] overflow-y-auto px-4"
          >
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="mt-6">{filterContent}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-fit border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        {filterContent}
      </aside>
    </>
  );
}
