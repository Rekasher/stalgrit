"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react"
import { questions, results, type Question, type NailResult } from "@/lib/nail-finder-data"

// ─── motion ───────────────────────────────────────────────────────────────────

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -70 : 70, opacity: 0 }),
}
const ease = { duration: 0.3, ease: [0.25, 1, 0.5, 1] as const }

// ─── step bar ─────────────────────────────────────────────────────────────────

function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase flex-shrink-0">
        {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-emerald-500"
          initial={false}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// ─── question screen ──────────────────────────────────────────────────────────

function QuestionCard({
  question, step, hasBack, onOption, onBack,
}: {
  question: Question
  step: number
  hasBack: boolean
  onOption: (o: { next?: string; result?: string }) => void
  onBack: () => void
}) {
  return (
    <div>
      <StepBar step={step} total={4} />

      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-2">
        {question.text}
      </h2>
      {question.hint && (
        <p className="flex items-center gap-2 text-gray-500 text-sm mb-10">
          <span className="h-px w-4 bg-emerald-500/50 flex-shrink-0" />
          {question.hint}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {question.options.map(option => (
          <button
            key={option.id}
            onClick={() => onOption(option)}
            className="group relative flex items-center gap-5 w-full text-left px-5 py-4 sm:px-6 sm:py-5 rounded-2xl border border-white/8 hover:border-emerald-500/30 transition-all duration-200 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            {/* hover: background lightens */}
            <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

            {/* left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />

            <span className="text-xl flex-shrink-0 select-none relative z-10">{option.emoji}</span>
            <div className="flex-1 min-w-0 relative z-10">
              <span className="block text-[15px] font-semibold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                {option.label}
              </span>
              {option.sublabel && (
                <span className="block text-gray-500 text-xs mt-0.5">{option.sublabel}</span>
              )}
            </div>
            <ArrowRight
              size={15}
              className="text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 relative z-10"
            />
          </button>
        ))}
      </div>

      {hasBack && (
        <button
          onClick={onBack}
          className="mt-8 flex items-center gap-2 text-gray-600 hover:text-gray-300 text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Назад
        </button>
      )}
    </div>
  )
}

// ─── result screen ────────────────────────────────────────────────────────────

function ResultCard({
  result, onReset, onBack,
}: {
  result: NailResult
  onReset: () => void
  onBack: () => void
}) {
  return (
    <div>
      {/* success header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <div className="font-mono text-[10px] text-emerald-400 tracking-[0.25em] uppercase">Подбор завершён</div>
          <div className="text-white font-bold text-sm leading-tight">Вот ваш гвоздь</div>
        </div>
      </div>

      {/* product card */}
      <div
        className="rounded-2xl border border-white/8 overflow-hidden mb-6"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent" />
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">{result.name}</h2>
          <p className="text-gray-400 text-sm mb-7">{result.tagline}</p>

          <div className="grid grid-cols-3 gap-3">
            {([
              { label: "Диаметр", value: result.diameter },
              { label: "Длина",   value: result.length   },
              { label: "Покрытие", value: result.coating  },
            ] as const).map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-white/5 p-4 text-center"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.2em] mb-1.5">{label}</div>
                <div className="text-white font-bold text-sm leading-tight">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* why */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-emerald-500/50 flex-shrink-0" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-[0.25em] uppercase">Почему именно этот</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{result.why}</p>
        <div className="flex flex-wrap gap-2">
          {result.specs.map(spec => (
            <span
              key={spec}
              className="px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-medium"
              style={{ background: "rgba(16,185,129,0.07)" }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/contacts?nail=${result.id}`}
          className="flex-1 text-center px-6 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors"
        >
          Заказать этот гвоздь →
        </Link>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
        >
          <RotateCcw size={13} />
          Начать заново
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-5 flex items-center gap-2 text-gray-600 hover:text-gray-300 text-sm transition-colors"
      >
        <ArrowLeft size={14} />
        К предыдущему вопросу
      </button>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function NailFinder() {
  const [currentQ, setCurrentQ]   = useState("q1")
  const [history, setHistory]     = useState<string[]>([])
  const [result, setResult]       = useState<NailResult | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)

  const question = questions[currentQ]

  function handleOption(option: { next?: string; result?: string }) {
    setDirection(1)
    setHistory(h => [...h, currentQ])
    if (option.result) setResult(results[option.result])
    else if (option.next) setCurrentQ(option.next)
  }

  function handleBack() {
    setDirection(-1)
    setResult(null)
    const prev = history.at(-1)
    if (prev) {
      setCurrentQ(prev)
      setHistory(h => h.slice(0, -1))
    }
  }

  function handleReset() {
    setDirection(-1)
    setResult(null)
    setCurrentQ("q1")
    setHistory([])
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={result ? `result-${result.id}` : `q-${currentQ}`}
        custom={direction}
        variants={slide}
        initial="enter"
        animate="center"
        exit="exit"
        transition={ease}
      >
        {result ? (
          <ResultCard result={result} onReset={handleReset} onBack={handleBack} />
        ) : (
          <QuestionCard
            question={question}
            step={history.length + 1}
            hasBack={history.length > 0}
            onOption={handleOption}
            onBack={handleBack}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
