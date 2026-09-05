import { createFileRoute, HeadContent } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Teachers' Day | Shuvangi Ma'am" },
      { name: "description", content: "A quiet Teachers' Day tribute for Shuvangi Ma'am." },
      { property: "og:title", content: "Happy Teachers' Day | Shuvangi Ma'am" },
      { property: "og:description", content: "A quiet Teachers' Day tribute for Shuvangi Ma'am." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Smoothed scroll value, updated once per frame and eased for silky parallax. */
function useSmoothScroll() {
  const [value, setValue] = useState(0);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    let rafId = 0;
    let running = true;

    const onScroll = () => {
      target.current = window.scrollY;
    };

    const tick = () => {
      if (!running) return;
      current.current += (target.current - current.current) * 0.12;
      if (Math.abs(target.current - current.current) < 0.05) {
        current.current = target.current;
      }
      setValue(current.current);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    current.current = target.current;
    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return value;
}

interface PetalProps {
  left: string;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  tint: string;
}

function Petal({ left, size, duration, delay, swayDuration, tint }: PetalProps) {
  return (
    <div
      className="pointer-events-none absolute top-0 will-change-transform"
      style={{
        left,
        width: size,
        height: size * 0.72,
        opacity: 0,
        borderRadius: "62% 38% 58% 42% / 60% 55% 45% 40%",
        background: `radial-gradient(circle at 30% 25%, ${tint}, color-mix(in oklab, var(--petaldeep) 70%, transparent) 72%, transparent)`,
        boxShadow: `0 0 ${size}px color-mix(in oklab, var(--petal) 22%, transparent)`,
        animation: `tribute-petal-fall ${duration}s linear infinite, tribute-sway ${swayDuration}s ease-in-out infinite`,
        animationDelay: `${delay}s, ${delay / 2}s`,
      }}
    />
  );
}

function PetalLayer({
  petals,
  scrollY,
  parallaxSpeed,
  blur,
  opacity,
}: {
  petals: PetalProps[];
  scrollY: number;
  parallaxSpeed: number;
  blur: number;
  opacity: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 will-change-transform"
      style={{
        transform: `translate3d(0, ${(scrollY * parallaxSpeed).toFixed(2)}px, 0)`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity,
      }}
    >
      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}
    </div>
  );
}

const nearPetals: PetalProps[] = [
  { left: "9%", size: 26, duration: 15, delay: 0.4, swayDuration: 8, tint: "var(--petal-highlight)" },
  { left: "31%", size: 20, duration: 18, delay: 3.2, swayDuration: 10, tint: "var(--petal)" },
  { left: "57%", size: 30, duration: 13, delay: 1.6, swayDuration: 7, tint: "var(--petal-highlight)" },
  { left: "78%", size: 22, duration: 16, delay: 5.4, swayDuration: 9, tint: "var(--petal)" },
  { left: "92%", size: 18, duration: 20, delay: 2.4, swayDuration: 11, tint: "var(--petal)" },
];

const midPetals: PetalProps[] = [
  { left: "18%", size: 14, duration: 24, delay: 1.1, swayDuration: 13, tint: "var(--petal)" },
  { left: "44%", size: 12, duration: 27, delay: 6.5, swayDuration: 14, tint: "var(--petal-highlight)" },
  { left: "66%", size: 15, duration: 22, delay: 4.2, swayDuration: 12, tint: "var(--petal)" },
  { left: "86%", size: 11, duration: 29, delay: 8.4, swayDuration: 15, tint: "var(--petal)" },
];

const farPetals: PetalProps[] = [
  { left: "13%", size: 9, duration: 34, delay: 2.8, swayDuration: 17, tint: "var(--petal)" },
  { left: "38%", size: 8, duration: 38, delay: 9.1, swayDuration: 19, tint: "var(--petal)" },
  { left: "61%", size: 9, duration: 32, delay: 5.7, swayDuration: 18, tint: "var(--petal-highlight)" },
  { left: "81%", size: 7, duration: 40, delay: 12, swayDuration: 20, tint: "var(--petal)" },
];

function Index() {
  const scrollY = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HeadContent />
      <main className="relative min-h-screen w-full overflow-x-hidden bg-ink font-sans text-emberlight">
        {/* Ambient light */}
        <div
          className="pointer-events-none fixed inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${(scrollY * 0.04).toFixed(2)}px, 0)` }}
          aria-hidden="true"
        >
          <div
            className="absolute left-1/2 top-[38%] h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--ember) 22%, transparent), color-mix(in oklab, var(--ember) 7%, transparent) 45%, transparent 72%)",
            }}
          />
          <div
            className="animate-tribute-glow absolute -right-[12%] -top-[18%] h-[62vmax] w-[62vmax]"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--emberlight) 20%, transparent), transparent 68%)",
            }}
          />
          <div
            className="animate-tribute-glow absolute -bottom-[22%] -left-[14%] h-[54vmax] w-[54vmax]"
            style={{
              animationDelay: "3.5s",
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--petaldeep) 14%, transparent), transparent 70%)",
            }}
          />
        </div>

        {/* Parallax petals — far to near */}
        {mounted && (
          <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <PetalLayer petals={farPetals} scrollY={scrollY} parallaxSpeed={0.05} blur={3.5} opacity={0.35} />
            <PetalLayer petals={midPetals} scrollY={scrollY} parallaxSpeed={0.11} blur={1.5} opacity={0.6} />
            <PetalLayer petals={nearPetals} scrollY={scrollY} parallaxSpeed={0.2} blur={0} opacity={0.85} />
          </div>
        )}

        {/* Texture + vignette */}
        <div className="tribute-grain pointer-events-none fixed inset-0 opacity-[0.5] mix-blend-soft-light" aria-hidden="true" />
        <div className="tribute-vignette pointer-events-none fixed inset-0" aria-hidden="true" />

        {/* Content */}
        <div
          className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-28 text-center"
          style={{ transform: `translate3d(0, ${(scrollY * -0.025).toFixed(2)}px, 0)` }}
        >
          <p
            className="animate-tribute-fade-up text-[11px] font-medium uppercase tracking-[0.6em] text-gold/75"
            style={{ animationDelay: "0.25s" }}
          >
            Teacher&#39;s Day
          </p>

          <div
            className="animate-tribute-line mt-6 h-px w-20 bg-gradient-to-r from-transparent via-petal/60 to-transparent"
            style={{ animationDelay: "0.6s" }}
          />

          <h1 className="animate-tribute-title mt-14 font-serif leading-[1.06]">
            <span className="block text-5xl font-light text-emberlight/95 sm:text-6xl">
              Happy Teachers&#39; Day,
            </span>
            <span className="title-glow mt-5 block text-6xl font-medium tracking-[0.005em] text-emberlight sm:text-7xl">
              Shuvangi Ma&#39;am
            </span>
          </h1>

          {/* Letter container — rises from below after the title settles */}
          <div
            className="animate-tribute-letter mt-24 w-full max-w-2xl"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="relative overflow-hidden rounded-[28px] border border-petal/15 bg-ink2/55 p-10 shadow-[0_50px_140px_-50px_#000] backdrop-blur-2xl sm:p-14">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-petal/45 to-transparent" />
              <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-petal/[0.08] blur-3xl" />
              <div className="tribute-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light" />

              <div className="relative flex min-h-[180px] items-center justify-center">
                <span className="text-petal/25">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C9 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-3-7-6-11Z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
