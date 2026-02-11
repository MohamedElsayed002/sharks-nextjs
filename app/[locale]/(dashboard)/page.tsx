import { getProducts } from "@/actions";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroMarketplace } from "@/components/home/hero-marketplace";
import { HeroCTA } from "@/components/home/hero-cta";
import { Services } from "@/components/home/services";
import { TrustProtection } from "@/components/home/trust-protection";
import { WhySharkMarket } from "@/components/home/why-shark-market";
import { Interests } from "@/components/home/interests";
import { NeedHelp } from "@/components/home/need-help";

const LATEST_SERVICES_COUNT = 6;

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allProducts = await getProducts(locale, { sort: "newest" });
  const latestProducts = allProducts.slice(0, LATEST_SERVICES_COUNT);

  return (
    <div>
      <HeroMarketplace />
      <FeaturedProjects />
      <Interests />
      <Services products={latestProducts} locale={locale} />
      <WhySharkMarket />
      {/* <TrustProtection /> */}
      <HeroCTA />
      <NeedHelp />
    </div>
  );
}
