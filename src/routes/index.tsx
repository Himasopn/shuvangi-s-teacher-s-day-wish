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

function useScrollParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let latestScrollY = window.scrollY;

    const update = () => {
      setScrollY(latestScrollY);
      rafId = 0;
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;
      if (rafId === 0) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}

interface PetalProps {
  left: string;
  width: number;
  height: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

function Petal({ left, width, height, duration, delay, swayDuration }: PetalProps) {
  return (
    <div
      className="pointer-events-none absolute will-change-transform"
      style={{
        left,
        top: 0,
        width,
        height,
        borderRadius: "60% 40% 55% 45%",
        background:
          "radial-gradient(circle at 30% 25%, #ffe3ef, #f4b3cf 70%, #e79bb8)",
        opacity: 0,
        animation: `
          tribute-petal-fall ${duration}s linear infinite,
          tribute-sway ${swayDuration}s ease-in-out infinite
        `,
        animationDelay: `${delay}s, 0s`,
      }}
    />
  );
}

function PetalLayer({
  petals,
  swayDuration,
  scrollY,
  parallaxSpeed,
}: {
  petals: PetalProps[];
  swayDuration: number;
  scrollY: number;
  parallaxSpeed: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 will-change-transform"
      style={{
        transform: `translate3d(0, ${scrollY * parallaxSpeed}px, 0)`,
        animation: `tribute-sway ${swayDuration}s ease-in-out infinite`,
      }}
    >
      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}
    </div>
  );
}

function Index() {
  const scrollY = useScrollParallax();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const layer1Petals: PetalProps[] = [
    { left: "12%", width: 20, height: 14, duration: 13, delay: 0.2, swayDuration: 7 },
    { left: "28%", width: 16, height: 11, duration: 17, delay: 2, swayDuration: 9 },
    { left: "52%", width: 24, height: 17, duration: 11, delay: 1, swayDuration: 6 },
    { left: "70%", width: 18, height: 13, duration: 15, delay: 3, swayDuration: 8 },
    { left: "84%", width: 14, height: 10, duration: 19, delay: 0.5, swayDuration: 10 },
    { left: "40%", width: 22, height: 15, duration: 14, delay: 4, swayDuration: 7 },
  ];

  const layer2Petals: PetalProps[] = [
    { left: "8%", width: 10, height: 8, duration: 22, delay: 1.5, swayDuration: 12 },
    { left: "63%", width: 9, height: 7, duration: 25, delay: 5, swayDuration: 13 },
    { left: "90%", width: 11, height: 8, duration: 20, delay: 3.5, swayDuration: 11 },
  ];

  const layer3Petals: PetalProps[] = [
    { left: "18%", width: 7, height: 6, duration: 28, delay: 2.2, swayDuration: 14 },
    { left: "48%", width: 8, height: 6, duration: 30, delay: 6, swayDuration: 15 },
    { left: "76%", width: 6, height: 5, duration: 26, delay: 4.1, swayDuration: 16 },
  ];

  return (
    <>
      <HeadContent />
      <main className="relative min-h-screen w-full overflow-x-hidden bg-ink font-sans text-emberlight">
        {/* Ambient glow layers */}
        <div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, rgba(244,197,132,.30), rgba(242,168,120,.12) 42%, transparent 70%)",
            }}
          />
          <div
            className="animate-tribute-glow absolute -right-[10%] -top-[15%] h-[70vmax] w-[70vmax] opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,217,184,.28), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,8,7,0) 40%, rgba(10,8,7,.7) 100%)",
            }}
          />
        </div>

        {/* Parallax petal layers */}
        {mounted && (
          <>
            <PetalLayer
              petals={layer1Petals}
              swayDuration={16}
              scrollY={scrollY}
              parallaxSpeed={0.15}
            />
            <PetalLayer
              petals={layer2Petals}
              swayDuration={22}
              scrollY={scrollY}
              parallaxSpeed={0.08}
            />
            <PetalLayer
              petals={layer3Petals}
              swayDuration={28}
              scrollY={scrollY}
              parallaxSpeed={0.04}
            />
          </>
        )}

        {/* Content */}
        <div
          className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center"
          style={{ transform: `translate3d(0, ${scrollY * -0.03}px, 0)` }}
        >
          <p
            className="animate-tribute-fade-up text-[11px] font-medium uppercase tracking-[0.55em] text-gold/80"
            style={{ animationDelay: "0.2s" }}
          >
            Teacher&#39;s Day
          </p>

          <div
            className="animate-tribute-line my-7 h-px w-24 bg-gradient-to-r from-transparent via-petal/70 to-transparent"
            style={{ animationDelay: "0.5s" }}
          />

          <h1 className="animate-tribute-title font-serif leading-[1.02]">
            <span className="block text-5xl font-light text-emberlight sm:text-6xl">
              Happy Teachers&#39; Day,
            </span>
            <span
              className="mt-3 block text-6xl font-medium sm:text-7xl"
              style={{
                color: "#ffd9b8",
                textShadow: "0 0 40px rgba(244,197,132,.35)",
                letterSpacing: "0.01em",
              }}
            >
              Shuvangi Ma&#39;am
            </span>
          </h1>

          <div
            className="animate-tribute-line my-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            style={{ animationDelay: "1.2s" }}
          />

          <p
            className="animate-tribute-fade-up text-sm font-light tracking-[0.18em] text-petal/70"
            style={{ animationDelay: "1.6s" }}
          >
            with gratitude &amp; blossoms
          </p>

          {/* Letter container — revealed after title rises */}
          <div
            className="animate-tribute-letter mt-16 w-full max-w-2xl"
            style={{ animationDelay: "1.8s" }}
          >
            <div
              className="relative overflow-hidden rounded-3xl border border-petal/20 bg-ink2/60 p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-14"
              style={{
                boxShadow:
                  "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 40px 120px -40px rgba(0,0,0,0.8)",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal/40 to-transparent" />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-petal/10 blur-3xl" />

              <div className="relative flex min-h-[180px] items-center justify-center">
                <span className="text-petal/30">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
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
