"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

const TEXT = "WELCOME ITZFIZZ";
const STATS = [
  [58, "Increase in pick up point use"],
  [23, "Decreased in customer phone calls"],
  [27, "Increase in pick up point use"],
  [40, "Decreased in customer phone calls"],
];

// Letter-spaced headline. Rendered twice: a dim base layer and a bright layer
// that the car "uncovers" as it drives past.
function Headline({ bright }) {
  return (
    <h1
      aria-hidden={bright || undefined}
      aria-label={bright ? undefined : "Welcome Itzfizz"}
      className={`${bright ? "bright absolute inset-0" : "dim absolute inset-0"} flex items-center justify-center font-light whitespace-nowrap ${
        bright ? "text-white" : "text-white/15"
      }`}
      style={{ fontSize: "clamp(0.75rem, 4vw, 3.5rem)", clipPath: bright ? "inset(0 100% 0 0)" : undefined }}
    >
      {TEXT.split("").map((c, i) => (
        <span key={i} className={`${bright ? "" : "ltr"} inline-block`} style={{ width: c === " " ? "0.9em" : "auto", marginRight: "0.5em" }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const cards = q(".card");
      const car = q(".car")[0];
      const bright = q(".bright")[0];

      /* 1. Intro on load (time-based, runs once) */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(q(".ltr"), { opacity: 0, y: 40, duration: 1, stagger: 0.05 })
        .from(cards, { opacity: 0, y: 50, duration: 0.8, stagger: 0.25 }, "-=0.4")
        .from(q(".hint"), { opacity: 0, duration: 0.6 });

      if (reduce) {
        // Accessibility: no pinning/scrubbing, show final state.
        gsap.set(bright, { clipPath: "inset(0 0% 0 0)" });
        q(".num").forEach((n, i) => (n.textContent = STATS[i][0]));
        return;
      }
      intro.to(cards, { opacity: 0.3, duration: 0.5 });

      /* 2. Scroll-driven animation (scrubbed + smoothed) */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q(".runway")[0],
          start: "top top",
          end: "+=300%",
          pin: q(".hero")[0],
          scrub: 1.2, // interpolation: motion eases toward the scroll position
          invalidateOnRefresh: true,
        },
      });

      // Car drives across the screen
      tl.fromTo(car, { x: () => -car.offsetWidth }, { x: () => window.innerWidth, ease: "none", duration: 1 }, 0);
      tl.fromTo(car, { scale: 0.92, rotate: -1.5 }, { scale: 1.1, rotate: 1.5, ease: "sine.inOut", duration: 1 }, 0);

      // Headline is revealed exactly up to the car's centre
      const p = { v: 0 };
      tl.to(p, {
        v: 1, ease: "none", duration: 1,
        onUpdate: () => {
          const w = car.offsetWidth, W = window.innerWidth;
          const edge = (-w / 2 + p.v * (W + w)) / W; // car centre as a screen fraction
          const right = Math.min(100, Math.max(0, (1 - edge) * 100));
          bright.style.clipPath = `inset(0 ${right}% 0 0)`;
        },
      }, 0);

      // Parallax layers + road
      tl.to(q(".dashes"), { xPercent: -50, ease: "none", duration: 1 }, 0)
        .to(q(".grid-bg"), { xPercent: -8, ease: "none", duration: 1 }, 0)
        .to(q(".glow"), { x: () => window.innerWidth * 0.6, ease: "none", duration: 1 }, 0)
        .fromTo(q(".streak"), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.7, stagger: 0.04, ease: "none", duration: 0.25 }, 0.02)
        .to(q(".hint"), { opacity: 0, duration: 0.08 }, 0)
        .to(q(".bar"), { scaleX: 1, ease: "none", duration: 1 }, 0);

      // Stat cards light up and count as the car passes
      cards.forEach((el, i) => {
        const num = el.querySelector(".num");
        const c = { v: 0 };
        const t = 0.18 + i * 0.2;
        tl.to(el, { opacity: 1, y: -12, scale: 1.05, borderColor: "#ff6a00", ease: "power2.out", duration: 0.12 }, t)
          .to(c, { v: STATS[i][0], ease: "none", duration: 0.15, onUpdate: () => (num.textContent = Math.round(c.v)) }, t);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <div className="runway relative">
        <section className="hero relative h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-10 md:gap-16">
          <div className="grid-bg will absolute -inset-x-[10%] inset-y-0 opacity-70" />
          <div className="glow will absolute -left-40 top-1/4 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl" />

          {/* Road: headline sits on it, car drives over it */}
          <div className="relative w-full h-40 md:h-60 flex items-center">
            <div className="absolute inset-0 bg-white/5 border-y border-white/10" />
            <div className="dashes will absolute left-0 bottom-3 h-[3px] w-[200%] opacity-60" />
            <div className="dashes will absolute left-0 top-3 h-[3px] w-[200%] opacity-60" />
            <div className="relative w-full h-full">
              <Headline />
              <Headline bright />
            </div>
            <div className="car will absolute left-0 top-1/2 -translate-y-1/2">
              <div className="absolute right-[92%] top-1/2 -translate-y-1/2 w-[160%] flex flex-col gap-3">
                {[0.9, 0.5, 1, 0.6, 0.8].map((w, i) => (
                  <div key={i} className="streak h-[2px] origin-right bg-gradient-to-l from-orange-400/80 to-transparent" style={{ width: w * 100 + "%", marginLeft: "auto" }} />
                ))}
              </div>
              <Car />
            </div>
          </div>

          {/* Impact stats */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 w-full max-w-6xl px-4">
            {STATS.map(([, label], i) => (
              <div key={i} className="card glass will rounded-2xl p-4 md:p-6 text-center">
                <div className="text-4xl md:text-6xl font-semibold text-orange-500">
                  <span className="num">0</span>%
                </div>
                <p className="mt-2 text-xs md:text-sm text-white/60">{label}</p>
              </div>
            ))}
          </div>

          <div className="hint absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/40">SCROLL ↓</div>
          <div className="bar absolute bottom-0 left-0 h-[3px] w-full origin-left bg-orange-500 scale-x-0" />
        </section>
      </div>
    </div>
  );
}
