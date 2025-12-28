import { ComponentExample } from "@/components/component-example";
import Category from "@/components/custom/Category-shop/Category";
import ProductCard from "@/components/custom/common/ProductCard";
import Footer from "@/components/custom/Footer/Footer";
import FooterAlt from "@/components/custom/Footer/FooterAlt";
import FooterGrid from "@/components/custom/Footer/FooterGrid";
import FooterPrimary from "@/components/custom/Footer/FooterPrimary";
import BannerMain from "@/components/custom/Home/Banner/BannerMain";
import HeroMain from "@/components/custom/Home/HeroSection/HeroMain";

import { SimpleNavBAr } from "@/components/custom/Navbar/SimpleNavBar";
import { DebugTheme } from "@/lib/Theme";

export default function Page() {
  return (
    <div>
      {/*  <DebugTheme /> */}
      <HeroMain />
      <Category />

      <ProductCard title="Feature Product" />
      <BannerMain />

      <ProductCard title="Best selling" />
      <ProductCard title="New Arrivals" />
      <Footer />
    </div>
  );
}
