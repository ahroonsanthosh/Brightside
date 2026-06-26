import { Navigation } from "@/components/sections/Navigation";
import { CafeCinematicHero } from "@/components/ui/cinematic-cafe-hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";

const REPO_RAW = "https://raw.githubusercontent.com/ahroonsanthosh/Brightside/main";

function AboutStrip() {
  return (
    <section className="bg-[#3D5A3C] py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/40 font-semibold mb-4">
            About Bright Side
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-snug tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A place for people who care what’s in their cup.
          </h2>
          <p className="mt-4 text-white/65 text-base font-light leading-relaxed max-w-md">
            We opened Bright Side to give Cork a café that takes the craft seriously without losing the warmth. Specialty espresso, food made fresh daily, and a corner on Washington Street that feels like yours.
          </p>
        </div>
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base flex-shrink-0">📍</span>
            <div>
              <p className="text-white font-semibold text-sm">23a Washington Street West</p>
              <p className="text-white/55 text-sm">Cork City Centre · T12 VKP0</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base flex-shrink-0">☕</span>
            <div>
              <p className="text-white font-semibold text-sm">Monday – Friday</p>
              <p className="text-white/55 text-sm">8 am – 3 pm · Closed weekends</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/brightsidecork/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base flex-shrink-0">
              <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </span>
            <div>
              <p className="text-white font-semibold text-sm group-hover:text-white/80 transition-colors">@brightsidecork</p>
              <p className="text-white/55 text-sm">Follow us on Instagram</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navigation />

      <CafeCinematicHero
        instanceId="hero1"
        tagline1="Good mornings,"
        tagline2="start here."
        taglineSub="23a Washington St West · Cork · Mon–Fri 8am–3pm"
        cardHeading="Specialty, coffee."
        cardDescription={
          <>
            Freshly pulled espresso, single-origin beans and a warm corner on{" "}
            <span className="text-white font-semibold">Washington Street</span> — open every
            weekday from 8am.
          </>
        }
        badge1Text="Washington St, Cork"
        badge1Sub="23a, City Centre"
        badge1Emoji="📍"
        badge2Text="Mon – Fri"
        badge2Sub="8 am – 3 pm"
        badge2Emoji="☕"
        productImageSrc={REPO_RAW + "/Screenshot%202026-06-26%20111049.png"}
        productImageAlt="Bright Side specialty flat white with latte art"
        scrollLength={3800}
      />

      <AboutStrip />

      <MenuSection />

      <CafeCinematicHero
        instanceId="hero2"
        tagline1="Eat well,"
        tagline2="feel bright."
        taglineSub="Fresh food made in-house, every morning."
        cardHeading="Made fresh, daily."
        cardDescription={
          <>
            From house-baked cinnamon rolls to seasonal granola bowls — every dish is made with
            care and served the way{" "}
            <span className="text-white font-semibold">Cork deserves</span>.
          </>
        }
        badge1Text="Made in-house"
        badge1Sub="Fresh every morning"
        badge1Emoji="🌿"
        badge2Text="Seasonal menu"
        badge2Sub="Local ingredients"
        badge2Emoji="🍃"
        productImageSrc={REPO_RAW + "/Screenshot%202026-06-26%20111113.png"}
        productImageAlt="Bright Side granola bowl with seasonal fruit and honey"
        scrollLength={3200}
        cardVariant="editorial"
      />

      <GallerySection />

      <ContactSection />

      <FooterSection />
    </main>
  );
}
