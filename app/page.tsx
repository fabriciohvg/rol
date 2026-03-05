import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  return (
    <main className="min-h-screen bg-[oklch(0.97_0_0)] dark:bg-[oklch(0.09_0_0)] text-[oklch(0.13_0_0)] dark:text-[oklch(0.95_0_0)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid texture — light */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.45_0.13_163) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.45_0.13_163) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      {/* Grid texture — dark */}
      <div
        className="absolute inset-0 opacity-[0.035] hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.70_0.15_162) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.70_0.15_162) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Concentric circle decorations */}
      <div className="absolute right-[-12vw] top-1/2 -translate-y-1/2 w-[65vw] h-[65vw] rounded-full border border-[oklch(0.45_0.13_163/0.12)] dark:border-[oklch(0.70_0.15_162/0.07)]" />
      <div className="absolute right-[-6vw] top-1/2 -translate-y-1/2 w-[48vw] h-[48vw] rounded-full border border-[oklch(0.45_0.13_163/0.09)] dark:border-[oklch(0.70_0.15_162/0.05)]" />
      <div className="absolute right-[2vw] top-1/2 -translate-y-1/2 w-[32vw] h-[32vw] rounded-full border border-[oklch(0.45_0.13_163/0.10)] dark:border-[oklch(0.70_0.15_162/0.06)]" />

      {/* Mode toggle */}
      <div className="absolute top-6 right-8 z-20">
        <ModeToggle />
      </div>

      {/* Left vertical accent */}
      <div className="absolute left-[7vw] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[oklch(0.45_0.13_163/0.30)] dark:via-[oklch(0.70_0.15_162/0.25)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full px-10 md:px-20">
        {/* Eyebrow label */}
        <div
          className="fade-up flex items-center gap-4 mb-10"
          style={{ animationDelay: "0ms" }}
        >
          <div className="h-px w-10 bg-[oklch(0.45_0.13_163)] dark:bg-[oklch(0.70_0.15_162)]" />
          <span className="font-(family-name:--font-geist-mono) text-[oklch(0.45_0.13_163)] dark:text-[oklch(0.65_0.13_163)] text-xs tracking-[0.28em] uppercase">
            Sistema de Gestão
          </span>
        </div>

        {/* Display heading */}
        <div className="fade-up" style={{ animationDelay: "120ms" }}>
          <h1
            className="font-(family-name:--font-geist-sans) font-thin leading-[0.88] tracking-[-0.04em] text-[oklch(0.13_0_0)] dark:text-[oklch(0.93_0_0)]"
            style={{ fontSize: "clamp(4.5rem, 13vw, 9.5rem)" }}
          >
            Sistema
          </h1>
          <h1
            className="font-(family-name:--font-geist-sans) font-thin leading-[0.88] tracking-[-0.04em] text-[oklch(0.42_0.13_163)] dark:text-[oklch(0.68_0.14_163)]"
            style={{ fontSize: "clamp(4.5rem, 13vw, 9.5rem)" }}
          >
            Igrejas
          </h1>
        </div>

        {/* Subtitle */}
        <div className="fade-up mt-8" style={{ animationDelay: "240ms" }}>
          <p className="font-(family-name:--font-geist-mono) text-[oklch(0.52_0_0)] dark:text-[oklch(0.42_0_0)] text-xs tracking-[0.18em] uppercase">
            Gestão do Rol de Membros
          </p>
        </div>

        {/* Divider */}
        <div
          className="fade-up mt-10 mb-10 h-px w-20 bg-[oklch(0.45_0.13_163/0.40)] dark:bg-[oklch(0.70_0.15_162/0.35)]"
          style={{ animationDelay: "320ms" }}
        />

        {/* CTA */}
        <div className="fade-up" style={{ animationDelay: "420ms" }}>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 border border-[oklch(0.45_0.13_163/0.40)] dark:border-[oklch(0.70_0.15_162/0.35)] px-8 py-4 relative overflow-hidden transition-all duration-500 hover:border-[oklch(0.45_0.13_163/0.90)] dark:hover:border-[oklch(0.70_0.15_162/0.80)]"
          >
            <span className="absolute inset-0 bg-[oklch(0.45_0.13_163/0.06)] dark:bg-[oklch(0.70_0.15_162/0.08)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative font-(family-name:--font-geist-mono) text-xs tracking-[0.2em] uppercase text-[oklch(0.42_0.13_163)] dark:text-[oklch(0.80_0.10_163)] group-hover:text-[oklch(0.35_0.13_163)] dark:group-hover:text-[oklch(0.85_0.13_163)] transition-colors duration-300">
              Acessar o Painel
            </span>
            <svg
              className="relative w-4 h-4 text-[oklch(0.42_0.13_163)] dark:text-[oklch(0.68_0.14_163)] transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="fade-up absolute bottom-8 left-0 right-0 px-10 md:px-20 flex justify-between items-center"
        style={{ animationDelay: "600ms" }}
      >
        <span className="font-(family-name:--font-geist-mono) text-[oklch(0.62_0_0)] dark:text-[oklch(0.30_0_0)] text-[10px] tracking-widest">
          © 2026
        </span>
        <span className="font-(family-name:--font-geist-mono) text-[oklch(0.62_0_0)] dark:text-[oklch(0.30_0_0)] text-[10px] tracking-widest hidden sm:block">
          MEMBROS · IGREJAS · GESTÃO
        </span>
      </div>

      <style>{`
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
