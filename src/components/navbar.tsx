"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "HOME", href: "#" },
        { name: "ON TRACK", href: "#" },
        { name: "OFF TRACK", href: "#" },
        { name: "CALENDAR", href: "#" },
        { name: "PARTNERS", href: "#" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12",
                    isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="group">
                        <h1 className="text-2xl md:text-3xl font-black tracking-tighter transition-colors group-hover:text-accent">
                            LANDO <span className="text-accent group-hover:text-white transition-colors">NORRIS</span>
                        </h1>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold tracking-widest hover:text-accent transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="#"
                            className="bg-accent text-black px-6 py-2 font-black tracking-widest hover:bg-white transition-all flex items-center gap-2"
                        >
                            STORE <ShoppingCart size={16} />
                        </Link>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Link
                            href="#"
                            className="bg-accent text-black p-2 font-black hover:bg-white transition-all"
                        >
                            <ShoppingCart size={20} />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 hover:text-accent transition-colors"
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col p-8 md:p-16"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h1 className="text-2xl font-black">MENU</h1>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:rotate-90 transition-transform duration-300"
                            >
                                <X size={40} className="text-accent" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-5xl md:text-8xl font-black tracking-tighter hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto border-t border-white/10 pt-8 flex gap-8">
                            <Link href="#" className="hover:text-accent">INSTAGRAM</Link>
                            <Link href="#" className="hover:text-accent">TWITCH</Link>
                            <Link href="#" className="hover:text-accent">TWITTER</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
