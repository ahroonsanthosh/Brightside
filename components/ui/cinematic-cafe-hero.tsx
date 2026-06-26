"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .cafe-gsap-reveal { visibility: hidden; }

  .cafe-film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }

  .cafe-bg-grid {
    background-size: 56px 56px;
    background-image:
      linear-gradient(to right, rgba(107,124,106,0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(107,124,106,0.08) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 68%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 68%);
  }

  .cafe-text-reveal {
    color: #2C2C2A;
    text-shadow:
      0 8px 24px rgba(44,44,42,0.12),
      0 2px 4px rgba(44,44,42,0.06);
  }

  .cafe-text-gradient {
    background: linear-gradient(180deg, #3D5A3C 0%, rgba(61,90,60,0.55) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 8px 16px rgba(61,90,60,0.18))
      drop-shadow(0px 2px 4px rgba(61,90,60,0.10));
  }

  .cafe-text-clip-reveal {
    clip-path: inset(0 100% 0 0);
  }

  .cafe-depth-card {
    background: linear-gradient(148deg, #3D5A3C 0%, #1E2E1E 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.70),
      0 20px 40px -20px rgba(0,0,0,0.55),
      inset 0 1px 2px rgba(255,255,255,0.14),
      inset 0 -2px 4px rgba(0,0,0,0.55);
    border: 1px solid rgba(255,255,255,0.045);
  }

  .cafe-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(700px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.055) 0%, transparent 38%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .cafe-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #B0BBA8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 20px rgba(0,0,0,0.65))
      drop-shadow(0px 3px 6px rgba(0,0,0,0.50));
  }

  .cafe-product-frame {
    background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
    box-shadow:
      0 50px 120px -20px rgba(0,0,0,0.85),
      0 20px 40px -10px rgba(0,0,0,0.60),
      inset 0 1px 1px rgba(255,255,255,0.08),
      inset 0 -1px 2px rgba(0,0,0,0.60);
    border: 1px solid rgba(255,255,255,0.06);
  }

  .cafe-float-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.11),
      0 20px 40px -10px rgba(0,0,0,0.70),
      inset 0 1px 1px rgba(255,255,255,0.18),
      inset 0 -1px 1px rgba(0,0,0,0.40);
  }

  .cafe-btn-primary {
    background: linear-gradient(180deg, #4A6849 0%, #2E4A2D 100%);
    color: #F5F0E8;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.09),
      0 2px 4px rgba(0,0,0,0.40),
      0 12px 24px -4px rgba(0,0,0,0.60),
      inset 0 1px 1px rgba(255,255,255,0.22),
      inset 0 -2px 4px rgba(0,0,0,0.50);
    transition: all 0.38s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .cafe-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.12),
      0 6px 12px -2px rgba(0,0,0,0.50),
      0 20px 32px -6px rgba(0,0,0,0.70),
      inset 0 1px 1px rgba(255,255,255,0.22),
      inset 0 -2px 4px rgba(0,0,0,0.50);
  }
  .cafe-btn-primary:active { transform: translateY(1px); }

  .cafe-btn-ghost {
    background: linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(240,235,226,0.92) 100%);
    color: #2C2C2A;
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.06),
      0 2px 4px rgba(0,0,0,0.10),
      0 10px 20px -4px rgba(0,0,0,0.22),
      inset 0 1px 1px rgba(255,255,255,1),
      inset 0 -2px 4px rgba(0,0,0,0.05);
    transition: all 0.38s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .cafe-btn-ghost:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.06),
      0 6px 12px -2px rgba(0,0,0,0.14),
      0 18px 28px -6px rgba(0,0,0,0.28),
      inset 0 1px 1px rgba(255,255,255,1),
      inset 0 -2px 4px rgba(0,0,0,0.05);
  }
  .cafe-btn-ghost:active { transform: translateY(1px); }
`;

export interface CafeCinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  instanceId: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  badge1Text?: string;
  badge1Sub?: string;
  badge1Emoji?: string;
  badge2Text?: string;
  badge2Sub?: string;
  badge2Emoji?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  productImageSrc?: string;
  productImageAlt?: string;
  scrollLength?: number;
}

export function CafeCinematicHero({
  instanceId,
  tagline1 = "Good mornings,",
  tagline2 = "start here.",
  cardHeading = "Specialty coffee,",
  cardDescription = <>Fresh espresso, single-origin beans, and a warm corner on <span className="text-white font-semibold">Washington Street</span> — open every weekday from 8am.</>,
  badge1Text = "Washington St, Cork",
  badge1Sub = "23a, Cork City Centre",
  badge1Emoji = "📍",
  badge2Text = "Mon – Fri",
  badge2Sub = "8 am – 3 pm",
  badge2Emoji = "☕",
  ctaHeading = "Come in. Sit down.",
  ctaDescription = "Bright Side is your neighbourhood café on Washington Street West, Cork — where every morning tastes like it should.",
  ctaPrimaryLabel = "Find Us",
  ctaPrimaryHref = "#contact",
  ctaSecondaryLabel = "See the Menu",
  ctaSecondaryHref = "#menu",
  productImageSrc = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=85&auto=format&fit=crop",
  productImageAlt = "Bright Side specialty coffee",
  scrollLength = 7000,
  className,
  ...props
}: CafeCinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const s = (name: string) => `.cafe-hero-${instanceId} .${name}`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && productRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(productRef.current, {
            rotationY: xVal * 10,
            rotationX: -yVal * 8,
            ease: "power3.out",
            duration: 1.4,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(s("ch-tagline1"), { autoAlpha: 0, y: 56, scale: 0.88, filter: "blur(18px)", rotationX: -18 });
      gsap.set(s("ch-tagline2"), { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(s("ch-main-card"), { y: window.innerHeight + 180, autoAlpha: 1 });
      gsap.set([s("ch-card-left"), s("ch-card-right"), s("ch-product-wrap"), s("ch-badge"), s("ch-product-img")], { autoAlpha: 0 });
      gsap.set(s("ch-cta-wrap"), { autoAlpha: 0, scale: 0.82, filter: "blur(28px)" });

      const introTl = gsap.timeline({ delay: 0.25 });
      introTl
        .to(s("ch-tagline1"), { duration: 1.7, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(s("ch-tagline2"), { duration: 1.3, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.9");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollLength}`,
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([s("ch-hero-text"), s("cafe-bg-grid-el")], { scale: 1.12, filter: "blur(18px)", opacity: 0.15, ease: "power2.inOut", duration: 2 }, 0)
        .to(s("ch-main-card"), { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(s("ch-main-card"), { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(s("ch-product-wrap"),
          { x: 300, z: -400, rotationY: 28, rotationX: 12, autoAlpha: 0, scale: 0.7 },
          { x: 0, z: 0, rotationY: 0, rotationX: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.4 }, "-=0.6"
        )
        .fromTo(s("ch-product-img"), { scale: 1.12 }, { scale: 1, ease: "power2.out", duration: 2 }, "<")
        .fromTo(s("ch-badge"), { y: 80, autoAlpha: 0, scale: 0.72, rotationZ: -8 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.4)", duration: 1.4, stagger: 0.18 }, "-=1.8")
        .fromTo(s("ch-card-left"), { x: -44, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.4 }, "-=1.4")
        .fromTo(s("ch-card-right"), { x: 44, autoAlpha: 0, scale: 0.82 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.4 }, "<")
        .to({}, { duration: 2.4 })
        .set(s("ch-hero-text"), { autoAlpha: 0 })
        .set(s("ch-cta-wrap"), { autoAlpha: 1 })
        .to({}, { duration: 1.2 })
        .to([s("ch-product-wrap"), s("ch-badge"), s("ch-card-left"), s("ch-card-right")], {
          scale: 0.88, y: -36, z: -180, autoAlpha: 0, ease: "power3.in", duration: 1.1, stagger: 0.05,
        })
        .to(s("ch-main-card"), {
          width: isMobile ? "92vw" : "82vw",
          height: isMobile ? "90vh" : "82vh",
          borderRadius: isMobile ? "28px" : "36px",
          ease: "expo.inOut",
          duration: 1.7,
        }, "pullback")
        .to(s("ch-cta-wrap"), { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.7 }, "pullback")
        .to(s("ch-main-card"), { y: -window.innerHeight - 240, ease: "power3.in", duration: 1.4 });

    }, containerRef);

    return () => ctx.revert();
  }, [instanceId, scrollLength]);

  return (
    <div
      ref={containerRef}
      className={cn(`cafe-hero-${instanceId}`, "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#F7F3EC] font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="cafe-film-grain" aria-hidden="true" />
      <div className="cafe-bg-grid-el cafe-bg-grid absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      <div className="ch-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 will-change-transform">
        <h1 className="ch-tagline1 cafe-gsap-reveal cafe-text-reveal text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-none mb-3">
          {tagline1}
        </h1>
        <h1 className="ch-tagline2 cafe-gsap-reveal cafe-text-clip-reveal cafe-text-gradient text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-none">
          {tagline2}
        </h1>
      </div>

      <div className="ch-cta-wrap absolute z-10 flex flex-col items-center justify-center text-center w-screen px-6 pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight cafe-text-gradient">
          {ctaHeading}
        </h2>
        <p className="text-[#5C5C56] text-lg md:text-xl mb-10 max-w-md mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href={ctaPrimaryHref} className="cafe-btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-[#3D5A3C] focus:ring-offset-2">
            {ctaPrimaryLabel}
          </a>
          <a href={ctaSecondaryHref} className="cafe-btn-ghost flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-[#3D5A3C] focus:ring-offset-2">
            {ctaSecondaryLabel}
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="ch-main-card cafe-depth-card relative overflow-hidden cafe-gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[82vw] h-[90vh] md:h-[82vh] rounded-[28px] md:rounded-[36px]"
        >
          <div className="cafe-card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-5 lg:px-14 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-10 z-10 py-8 lg:py-0">

            <div className="ch-card-right cafe-gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <div className="text-center lg:text-right">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-semibold mb-2">Bright Side</p>
                <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-none cafe-card-silver">
                  {cardHeading.split(",")[0]}
                </h2>
                {cardHeading.includes(",") && (
                  <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-none cafe-card-silver opacity-55">
                    {cardHeading.split(",")[1]?.trim()}
                  </h2>
                )}
              </div>
            </div>

            <div className="ch-product-wrap order-2 relative w-full h-[280px] md:h-[420px] lg:h-[520px] flex items-center justify-center" style={{ perspective: "1000px" }}>
              <div className="relative scale-[0.82] md:scale-90 lg:scale-100 w-full h-full flex items-center justify-center">
                <div
                  ref={productRef}
                  className="relative w-[260px] h-[260px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] rounded-[2.5rem] cafe-product-frame overflow-hidden will-change-transform"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productImageSrc}
                    alt={productImageAlt}
                    className="ch-product-img w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/05 pointer-events-none" />
                </div>

                <div className="ch-badge cafe-float-badge absolute top-4 md:top-8 left-[-8px] md:left-[-60px] rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-3 z-30">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/08 flex items-center justify-center border border-white/12">
                    <span className="text-sm md:text-lg drop-shadow" aria-hidden="true">{badge1Emoji}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs md:text-sm font-bold tracking-tight">{badge1Text}</p>
                    <p className="text-green-200/50 text-[10px] md:text-xs">{badge1Sub}</p>
                  </div>
                </div>

                <div className="ch-badge cafe-float-badge absolute bottom-8 md:bottom-14 right-[-8px] md:right-[-60px] rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center gap-3 z-30">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/08 flex items-center justify-center border border-white/12">
                    <span className="text-sm md:text-lg drop-shadow" aria-hidden="true">{badge2Emoji}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs md:text-sm font-bold tracking-tight">{badge2Text}</p>
                    <p className="text-green-200/50 text-[10px] md:text-xs">{badge2Sub}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ch-card-left cafe-gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-2 lg:px-0">
              <p className="hidden md:block text-green-100/65 text-base lg:text-lg font-light leading-relaxed max-w-xs mx-auto lg:mx-0">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
