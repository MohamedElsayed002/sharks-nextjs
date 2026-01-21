"use client"


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";


export const HeroCTA: React.FC = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-4xl mx-auto px-6">
                <Card className="rounded-xl shadow-xl">
                    <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
                        <div>
                            <h4 className="text-lg font-semibold">Start for free today</h4>
                            <p className="text-xs text-slate-500 mt-1">Create your account and explore verified listings.</p>
                        </div>
                        <div>
                            <Link href="#" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-full text-sm">Start Free / Create Account</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};