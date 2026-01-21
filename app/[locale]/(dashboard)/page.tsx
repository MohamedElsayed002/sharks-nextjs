"use client"

import Footer from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { HeroCTA } from "@/components/home/hero-cta";
import { Services } from "@/components/home/services";
import { TrustProtection } from "@/components/home/trust-protection";
import { WhySharkMarket } from "@/components/home/why-shark-market";
import { useAuthStore } from "@/context/user";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const DashboardPage = () => {
  const t = useTranslations();
  const setUser = useAuthStore((state) => state.setUser)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const token = localStorage.getItem("access_token"); 
    if (token) {
      fetch(`https://shark-nestjs.vercel.app/user/me`, { 
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <div>
      <Hero/>
      <Services/>
      <WhySharkMarket/>
      <TrustProtection/>
      <HeroCTA/>
      <Footer/>
    </div>
  );
};

export default DashboardPage;
