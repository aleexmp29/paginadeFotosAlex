"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax Vibe */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/hero.png"
                    alt="Lando Norris"
                    fill
                    className="object-cover object-center brightness-75 grayscale-[0.2]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent font-black tracking-[0.3em] text-xs md:text-sm mb-4 block">
                        MCLAREN F1 DRIVER #4
                    </span>
                    <h2 className="text-7xl md:text-[14rem] font-black leading-tight tracking-tighter uppercase">
                        DID <span className="text-outline text-transparent">IT</span> AT
                        <br />
                        HOME.
                    </h2>

                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="bg-white text-black px-10 py-4 font-black tracking-widest hover:bg-accent transition-colors w-full md:w-auto">
                            LATEST NEWS
                        </button>
                        <button className="border-2 border-white px-10 py-4 font-black tracking-widest hover:bg-white hover:text-black transition-colors w-full md:w-auto">
                            ON TRACK
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Side Text Style Accent */}
            <div className="absolute left-10 bottom-10 hidden lg:block">
                <p className="text-white/20 [writing-mode:vertical-lr] rotate-180 font-black tracking-widest text-sm translate-y-[-50%]">
                    LANDO NORRIS // SEASON 2024
                </p>
            </div>

            <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
        </section>
    );
};
