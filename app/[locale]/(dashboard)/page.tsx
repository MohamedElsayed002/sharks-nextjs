"use client"

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
      <h1>Dashboard Page</h1>
      <h1>{t('hello')}</h1>
      {user?.email}
    </div>
  );
};

export default DashboardPage;
