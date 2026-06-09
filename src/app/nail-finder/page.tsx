import NailFinder from "@/components/NailFinder/NailFinder"

export const metadata = {
  title: "Подобрать гвоздь — Стальгрит",
  description: "Ответьте на 2–3 вопроса и узнайте, какой гвоздь нужен для вашей задачи. Тип, размер, покрытие — точный подбор.",
}

export default function NailFinderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          background:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)",
        }}
      />

      {/* Emerald glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(16,185,129,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-sm font-medium mb-6 bg-emerald-500/10">
            Технический конфигуратор
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Подобрать гвоздь
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Ответьте на 2–3 вопроса — получите точный тип, размер и покрытие для вашей задачи.
          </p>
        </div>

        <NailFinder />
      </div>
    </main>
  )
}
