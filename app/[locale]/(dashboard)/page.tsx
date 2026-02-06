import Footer from "@/components/home/footer";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroMarketplace } from "@/components/home/hero-marketplace";
import { HeroCTA } from "@/components/home/hero-cta";
import { Services } from "@/components/home/services";
import { TrustProtection } from "@/components/home/trust-protection";
import { WhySharkMarket } from "@/components/home/why-shark-market";
import { Interests } from "@/components/home/interests";
import { NeedHelp } from "@/components/home/need-help";

const DashboardPage = () => {
  return (
    <div>
      <HeroMarketplace />
      <FeaturedProjects />
      <Interests/>
      <Services />
      <WhySharkMarket />
      <TrustProtection />
      <HeroCTA />
      <NeedHelp/>
      <Footer />
    </div>
  );
};

export default DashboardPage;
