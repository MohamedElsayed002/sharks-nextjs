"use client"

import Footer from "@/components/home/footer";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { HeroMarketplace } from "@/components/home/hero-marketplace";
import { HeroCTA } from "@/components/home/hero-cta";
import { Services } from "@/components/home/services";
import { TrustProtection } from "@/components/home/trust-protection";
import { WhySharkMarket } from "@/components/home/why-shark-market";

const DashboardPage = () => {
  return (
    <div>
      <HeroMarketplace />
      <FeaturedProjects />
      <Hero />
      <Services />
      <WhySharkMarket />
      <TrustProtection />
      <HeroCTA />
      <Footer />
    </div>
  );
};

export default DashboardPage;
