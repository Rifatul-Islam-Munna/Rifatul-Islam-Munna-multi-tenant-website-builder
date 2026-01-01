import { getWebsiteDetails } from "@/actions/webisteDetails";

import Category from "@/components/custom/Category-shop/Category";
import ProductCard from "@/components/custom/common/ProductCard";
import Footer from "@/components/custom/Footer/Footer";

import BannerMain from "@/components/custom/Home/Banner/BannerMain";
import HeroMain from "@/components/custom/Home/HeroSection/HeroMain";

export default async function Page() {
  const data = await getWebsiteDetails();
  return (
    <div>
      {/*  <DebugTheme /> */}
      <HeroMain heroSection={data.homeSection.heroSection} />
      <Category categorySection={data.homeSection.categorySection} />

      <ProductCard title="Feature Product" />
      <BannerMain />

      <ProductCard title="Best selling" />
      <ProductCard title="New Arrivals" />
      <Footer />
    </div>
  );
}
