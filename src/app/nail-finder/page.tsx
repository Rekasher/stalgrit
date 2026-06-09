import NailFinder from "@/components/NailFinder/NailFinder"

export const metadata = {
  title: "Подобрать гвоздь — Стальгрит",
  description: "Ответьте на 2–3 вопроса и узнайте, какой гвоздь нужен для вашей задачи. Тип, размер, покрытие — точный подбор.",
}

export default function NailFinderPage() {
  return (
    <main className="min-h-screen bg-gray-950 overflow-hidden">
      {/* grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.022]"
        style={{ background: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 64px)" }}
      />

      {/* emerald glow — left side */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 60% at 20% 50%, rgba(16,185,129,0.11) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">

        {/* ── LEFT: context panel ─────────────────────────────────────────── */}
        <div className="lg:w-[38%] lg:min-h-screen lg:sticky lg:top-0 flex flex-col justify-center px-8 lg:px-16 pt-32 pb-10 lg:py-32 border-b lg:border-b-0 lg:border-r border-white/5">

          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-emerald-500 flex-shrink-0" />
            <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase">Настройщик</span>
          </div>

          {/* headline */}
          <h1 className="mb-6">
            <span
              className="block text-gray-500 font-light leading-none mb-2"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              Подобрать
            </span>
            <span
              className="block text-white font-black leading-none"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
            >
              гвоздь
            </span>
          </h1>

          <p className="text-gray-500 text-base leading-relaxed max-w-xs mb-12">
            Ответьте на 2–3 вопроса — получите точный тип, размер и покрытие для вашей задачи.
          </p>

          {/* mini stats */}
          <div className="flex gap-10 pt-8 border-t border-white/8">
            <div>
              <div className="text-2xl font-black text-white leading-none">2–3</div>
              <div className="font-mono text-[9px] text-emerald-400/50 tracking-[0.25em] uppercase mt-2">шага</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none">13</div>
              <div className="font-mono text-[9px] text-emerald-400/50 tracking-[0.25em] uppercase mt-2">результата</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white leading-none">100%</div>
              <div className="font-mono text-[9px] text-emerald-400/50 tracking-[0.25em] uppercase mt-2">точность</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: stepper ──────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-32">
          <div className="max-w-xl w-full mx-auto lg:mx-0">
            <NailFinder />
          </div>
        </div>

      </div>
    </main>
  )
}
