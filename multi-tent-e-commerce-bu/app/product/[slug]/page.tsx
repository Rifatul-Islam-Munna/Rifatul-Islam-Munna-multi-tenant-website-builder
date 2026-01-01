import { getWebsiteDetails } from "@/actions/webisteDetails";
import ProductDetails from "@/components/custom/product/ProductDetails";

import React from "react";

const page = async () => {
  const data = await getWebsiteDetails();
  return <ProductDetails variant={data.productDetails.productDetailsPage} />;
};

export default page;
