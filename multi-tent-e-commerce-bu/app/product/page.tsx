// app/shop/page.tsx (or your page file)
import { getWebsiteDetails } from "@/actions/webisteDetails";
import ProductCard from "@/components/custom/common/ProductCard";
import { ProductFilters } from "@/components/custom/filters/product-filters";

import React from "react";

const page = async () => {
  return (
    <main className="container mx-auto py-10 md:px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Filters */}
        <div className=" hidden lg:block">
          <ProductFilters />
        </div>

        {/* Right Side - Products */}
        <div className="flex-1 min-w-0">
          {/* Header Section */}
          <div className=" flex w-full items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              All Products
            </h1>
            <div className=" block lg:hidden translate-y-4">
              <ProductFilters />
            </div>
          </div>

          {/* Product Cards Grid */}
          <ProductCard
            variant={1}
            title="Featured Products"
            isAllProductShown={false}
            isHeaderShown={false}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
