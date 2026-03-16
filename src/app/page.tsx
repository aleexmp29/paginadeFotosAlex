import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoGrid } from "@/components/bento-grid";
import { MoveRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      {/* Ticker Section */}
      <div className="bg-accent py-4 overflow-hidden whitespace-nowrap border-y-2 border-black flex">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center mx-4">
            <span className="text-black font-black text-sm tracking-widest italic uppercase">
              Next Race: FORMULA 1 PIRELLI GRAND PRIX DU CANADA 2024 — ROUND 09
            </span>
            <MoveRight className="text-black ml-4" size={16} />
          </div>
        ))}
      </div>

      <BentoGrid />

      {/* Statistics Section / Fast Look */}
      <section className="bg-white text-black py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
              STAYING <br /> ON TRACK.
            </h2>
            <p className="text-xl font-medium max-w-lg mb-12">
              Lando's commitment to speed and precision is unmatched. Follow every lap and every corner of the season.
            </p>
            <button className="bg-black text-white px-12 py-5 font-black tracking-widest hover:bg-accent hover:text-black transition-colors">
              RACE CALENDAR
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-8 w-full">
            <div className="border-l-4 border-black pl-6">
              <span className="text-5xl font-black md:text-7xl">01</span>
              <p className="font-black text-sm uppercase opacity-50 mt-2">Race Wins</p>
            </div>
            <div className="border-l-4 border-black pl-6">
              <span className="text-5xl font-black md:text-7xl">15</span>
              <p className="font-black text-sm uppercase opacity-50 mt-2">Podiums</p>
            </div>
            <div className="border-l-4 border-black pl-6">
              <span className="text-5xl font-black md:text-7xl">01</span>
              <p className="font-black text-sm uppercase opacity-50 mt-2">Pole Positions</p>
            </div>
            <div className="border-l-4 border-black pl-6">
              <span className="text-5xl font-black md:text-7xl">853</span>
              <p className="font-black text-sm uppercase opacity-50 mt-2">Career Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h2 className="text-3xl font-black mb-6">LANDO NORRIS</h2>
            <div className="flex gap-6 opacity-60">
              <a href="#" className="hover:text-accent font-bold">INSTAGRAM</a>
              <a href="#" className="hover:text-accent font-bold">TWITCH</a>
              <a href="#" className="hover:text-accent font-bold">TWITTER</a>
              <a href="#" className="hover:text-accent font-bold">TIKTOK</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black text-xs tracking-widest mb-4 opacity-40">SITE</h4>
              <ul className="space-y-2 font-bold text-sm">
                <li><a href="#" className="hover:text-accent">HOME</a></li>
                <li><a href="#" className="hover:text-accent">ON TRACK</a></li>
                <li><a href="#" className="hover:text-accent">OFF TRACK</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs tracking-widest mb-4 opacity-40">STORE</h4>
              <ul className="space-y-2 font-bold text-sm">
                <li><a href="#" className="hover:text-accent">NEW ARRIVALS</a></li>
                <li><a href="#" className="hover:text-accent">LN COLLECTION</a></li>
                <li><a href="#" className="hover:text-accent">ACCESSORIES</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs tracking-widest mb-4 opacity-40">LEGAL</h4>
              <ul className="space-y-2 font-bold text-sm">
                <li><a href="#" className="hover:text-accent">PRIVACY</a></li>
                <li><a href="#" className="hover:text-accent">TERMS</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-[10px] font-bold opacity-30 tracking-[0.2em] flex justify-between">
          <span>&copy; 2024 LANDO NORRIS. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED FOR SPEED.</span>
        </div>
      </footer>
    </main>
  );
}
