"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
    {
        title: "ON TRACK",
        subtitle: "RACING STATS",
        size: "large",
        img: "/car.png",
        color: "bg-accent",
    },
    {
        title: "QUADRANT",
        subtitle: "LIFESTYLE & CONTENT",
        size: "small",
        img: "/hero.png", // Reuse for simplicity or could generate more
        color: "bg-white",
    },
    {
        title: "LN LOGO",
        subtitle: "COLLECTION 2024",
        size: "small",
        img: "/car.png",
        color: "bg-zinc-900",
    },
    {
        title: "GAMING",
        subtitle: "TWITCH LIVES",
        size: "medium",
        img: "/hero.png",
        color: "bg-accent",
    }
];

export const BentoGrid = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
                {/* Item 1: Wide/Large */}
                <motion.div
                    whileHover={{ scale: 0.98 }}
                    className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-zinc-900"
                >
                    <Image src="/car.png" alt="Racing" fill className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <span className="text-accent font-black tracking-widest text-xs mb-2">01. COMPETITION</span>
                        <h3 className="text-4xl md:text-6xl font-black mb-4">ON TRACK</h3>
                        <p className="max-w-xs text-white/60 mb-6 font-medium">Explore the statistics, maps, and results from the current Formula 1 season.</p>
                        <button className="flex items-center gap-2 text-white font-bold hover:text-accent transition-colors">
                            VIEW STATS <ArrowUpRight size={20} />
                        </button>
                    </div>
                </motion.div>

                {/* Item 2: Small Square */}
                <motion.div
                    whileHover={{ scale: 0.98 }}
                    className="md:col-span-1 relative group overflow-hidden bg-white"
                >
                    <Image src="/hero.png" alt="Lifestyle" fill className="object-cover brightness-75 group-hover:scale-110 transition-transform duration-700 md:grayscale" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <ArrowUpRight className="text-black ml-auto" />
                        <div className="text-black">
                            <span className="font-black text-[10px] tracking-widest uppercase opacity-50">Lifestyle</span>
                            <h4 className="font-black text-xl">OFF TRACK</h4>
                        </div>
                    </div>
                </motion.div>

                {/* Item 3: Small Square Neon */}
                <motion.div
                    whileHover={{ scale: 0.98 }}
                    className="md:col-span-1 relative group overflow-hidden bg-accent"
                >
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <div className="text-black">
                            <h4 className="font-black text-4xl leading-tight">THE<br />LN<br />STORE.</h4>
                        </div>
                        <ArrowUpRight className="text-black ml-auto" size={32} />
                    </div>
                </motion.div>

                {/* Item 4: Medium Wide */}
                <motion.div
                    whileHover={{ scale: 0.98 }}
                    className="md:col-span-2 relative group overflow-hidden bg-zinc-800"
                >
                    <Image src="/hero.png" alt="Gaming" fill className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <span className="text-accent font-black tracking-widest text-[10px]">04. COMMUNITY</span>
                            <div className="bg-red-600 px-2 py-1 text-[10px] font-black animate-pulse">LIVE ON TWITCH</div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black mb-2">QUADRANT</h3>
                            <p className="text-white/60 text-sm max-w-sm">Join the stream and be part of the community.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
