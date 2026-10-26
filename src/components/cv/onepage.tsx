"use client";

import { LightboxProvider } from "./shared";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { About } from "./about";
import { Services } from "./services";
import { Brands } from "./brands";
import { Websites } from "./websites";
import { Marketing } from "./marketing";
import { Gallery } from "./gallery";
import { Process } from "./process";
import { Contact } from "./contact";
import { Footer } from "./footer";

/* Premium one-page creative portfolio — section rhythm:
   dark hero → light about → white services → cloud brands
   (+ indigo Orvexa band) → dark websites → white results
   → cloud gallery → dark process → white contact → dark footer */

export default function OnePage() {
  return (
    <LightboxProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Services />
          <Brands />
          <Websites />
          <Marketing />
          <Gallery />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </LightboxProvider>
  );
}
