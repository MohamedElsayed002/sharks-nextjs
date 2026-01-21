"use client"

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

type Feature = {
  id: string;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  { id: "f1", title: "Verified opportunities", desc: "Access listings reviewed by our team." },
  { id: "f2", title: "Safe communication", desc: "Communicate securely with trusted parties." },
  { id: "f3", title: "Faster decisions", desc: "Insights and data to close deals quicker." },
];

export const WhySharkMarket = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-xl font-semibold">Why Shark Market</h3>
        <p className="text-xs text-slate-500 mt-2">Built for serious buyers and sellers in the region.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Card key={f.id} className="p-4 shadow-md">
              <CardHeader className="p-0">
                <CardTitle className="text-sm font-semibold">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-1 -mt-5">
                <p className="text-xs text-slate-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Link href="#" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-full text-sm">Start now</Link>
        </div>
      </div>
    </section>
  );
};

