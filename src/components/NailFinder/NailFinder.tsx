"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { questions, results, type NailResult } from "@/lib/nail-finder-data"

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
}

const transition = { type: "spring" as const, stiffness: 340, damping: 28 }

function ProgressDots({ steps, current }: { steps: number; current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: steps }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? "w-6 h-2 bg-emerald-500"
              : i === current
              ? "w-6 h-2 bg-emerald-400"
              : "w-2 h-2 bg-white/20"
          }`}
        />
      ))}
    </div>
  )
}

export default function NailFinder() {
  const [currentQ, setCurrentQ] = useState<string>("q1")
  const [history, setHistory] = useState<string[]>([])
  const [result, setResult] = useState<NailResult | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)

  const question = questions[currentQ]
  const stepCount = Math.min(history.length + 1, 4)

  function handleOption(option: { next?: string; result?: string }) {
    setDirection(1)
    setHistory((h) => [...h, currentQ])
    if (option.result) {
      setResult(results[option.result])
    } else if (option.next) {
      setCurrentQ(option.next)
    }
  }

  function handleBack() {
    setDirection(-1)
    setResult(null)
    const prev = history.at(-1)
    if (prev) {
      setCurrentQ(prev)
      setHistory((h) => h.slice(0, -1))
    }
  }

  function handleReset() {
    setDirection(-1)
    setResult(null)
    setCurrentQ("q1")
    setHistory([])
  }

  const animKey = result ? `result-${result.id}` : `q-${currentQ}`

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={animKey}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {result ? (
              /* ── Result screen ── */
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="text-emerald-400" size={22} />
                  </div>
                  <span className="text-emerald-400 font-semibold text-lg">Вот ваш гвоздь</span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{result.name}</h2>
                  <p className="text-gray-400 text-sm mb-6">{result.tagline}</p>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Диаметр", value: result.diameter },
                      { label: "Длина", value: result.length },
                      { label: "Покрытие", value: result.coating },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center p-3 rounded-xl bg-white/5">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                        <div className="text-white font-semibold text-sm leading-tight">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Почему именно этот?
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{result.why}</p>
                  <div className="flex flex-wrap gap-2">
                    {result.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/contacts?nail=${result.id}`}
                    className="flex-1 text-center px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
                  >
                    Заказать этот гвоздь
                  </Link>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
                  >
                    Начать заново
                  </button>
                </div>
              </div>
            ) : (
              /* ── Question screen ── */
              <div>
                <ProgressDots steps={4} current={stepCount - 1} />

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {question.text}
                </h2>
                {question.hint && (
                  <p className="text-gray-400 text-sm mb-8">{question.hint}</p>
                )}

                <div className="flex flex-col gap-3">
                  {question.options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOption(option)}
                      className="flex items-center gap-4 w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 transition-all duration-200 min-h-[56px] group"
                    >
                      <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                      <div>
                        <span className="text-white font-medium text-sm group-hover:text-emerald-300 transition-colors">
                          {option.label}
                        </span>
                        {option.sublabel && (
                          <span className="block text-gray-500 text-xs mt-0.5">{option.sublabel}</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {history.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Назад
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
