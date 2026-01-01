export type ShopConfigResponse = {
  id: string;
  shopName: string;
  ownerReferences: string;
  shopLogo: string;
  themeColor: string;

  shopDescription: string;

  homeSection: HomeSection;
  productDetails: ProductDetails;
  aboutUs: AboutUs;
  location: LocationInfo;
  ourTeam: OurTeam;
  footer: Footer;
};

export type HomeSection = {
  heroSection: string;
  categorySection: string;
  isFeatureProducts: boolean;
  isBestSelling: boolean;
  isNewArrival: boolean;
};

export type ProductDetails = {
  productDetailsPage: string;
};

export type AboutUs = {
  title: string;
  ourStorySubtitle: string;
  ourStoryText: string;
  ourStoryImageUrl: string;
  whatWeDoSubtitle: string;
  whatWeDoText: string;
  whatWeDoImageUrl: string;
};

export type LocationInfo = {
  locationUrl: string;
  visitUsText: string;
  address: string;
  phone: string;
  email: string;
};

export type OurTeam = {
  ourTeamAboutImageUrl: string;
  ourTeamText: string;
};

export type Footer = {
  footerType: string;
};
