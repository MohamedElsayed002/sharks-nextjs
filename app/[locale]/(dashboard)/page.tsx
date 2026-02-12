import { getProducts } from "@/actions";
import { HeroMarketplace } from "@/components/home/hero-marketplace";
import { TrustStrip } from "@/components/home/trust-strip";
import { Services } from "@/components/home/services";
import { WhoWeAre } from "@/components/home/who-we-are";
import { WhySharkMarket } from "@/components/home/why-shark-market";
import { Interests } from "@/components/home/interests";
import { HeroCTA } from "@/components/home/hero-cta";
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
    <div className="min-h-screen">
      <HeroMarketplace />
      <TrustStrip />
      <Services products={latestProducts} locale={locale} />
      <WhoWeAre />
      <WhySharkMarket />
      <Interests />
      <HeroCTA />
      <NeedHelp />
    </div>
  );
}
