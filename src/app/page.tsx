"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import {
  Factory, ShieldCheck, TrendingDown, Truck,
  Hammer, Wrench, Home, Zap, ChevronDown,
} from "lucide-react"

// ─── Nail SVG shape ──────────────────────────────────────────────────────────

function NailSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="56"
      viewBox="0 0 14 56"
      fill="currentColor"
    >
      <rect x="0" y="0" width="14" height="7" rx="2" />
      <rect x="6" y="7" width="2" height="42" />
      <polygon points="6,49 8,49 7,56" />
    </svg>
  )
}

// Mini nail rotated for marquee separator
function NailSVGMini({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="10"
      viewBox="0 0 56 14"
      fill="currentColor"
    >
      <rect x="0" y="0" width="7" height="14" rx="2" />
      <rect x="7" y="6" width="42" height="2" />
      <polygon points="49,6 49,8 56,7" />
    </svg>
  )
}

// ─── Floating nail positions (hardcoded to avoid hydration mismatch) ─────────

const floatingNails = [
  { x: "8%",  y: "18%", rot: 25,  delay: 0,   dur: 9  },
  { x: "82%", y: "12%", rot: -15, delay: 1.5, dur: 11 },
  { x: "22%", y: "72%", rot: 55,  delay: 0.8, dur: 8  },
  { x: "73%", y: "65%", rot: -40, delay: 2,   dur: 7.5},
  { x: "48%", y: "22%", rot: 10,  delay: 0.3, dur: 12 },
  { x: "91%", y: "80%", rot: -60, delay: 0.6, dur: 9  },
  { x: "4%",  y: "52%", rot: 70,  delay: 1.2, dur: 10 },
  { x: "38%", y: "87%", rot: -25, delay: 1.8, dur: 8  },
  { x: "63%", y: "38%", rot: 40,  delay: 0.4, dur: 11 },
  { x: "17%", y: "42%", rot: -50, delay: 2.3, dur: 9  },
  { x: "56%", y: "78%", rot: 15,  delay: 1.0, dur: 13 },
  { x: "76%", y: "28%", rot: -35, delay: 0.7, dur: 10 },
]

const ctaNails = [
  { x: "7%",  y: "25%", rot: 30,  delay: 0,   dur: 10 },
  { x: "85%", y: "18%", rot: -20, delay: 0.8, dur: 9  },
  { x: "15%", y: "70%", rot: 55,  delay: 1.2, dur: 8  },
  { x: "78%", y: "65%", rot: -45, delay: 0.4, dur: 11 },
  { x: "50%", y: "82%", rot: 15,  delay: 1.6, dur: 9  },
  { x: "92%", y: "50%", rot: -60, delay: 0.6, dur: 8.5},
]

// ─── Animated stat counter ────────────────────────────────────────────────────

function StatCounter({
  value, suffix, label, delay = 0,
}: {
  value: number; suffix: string; label: string; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timeout = setTimeout(() => {
      const duration = 1800
      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(eased * value)
        setCount(current)
        if (progress >= 1) {
          setCount(value)
          clearInterval(timer)
        }
      }, 16)
      return () => clearInterval(timer)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 380, damping: 18, delay }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tabular-nums leading-none">
        {count.toLocaleString("ru")}{suffix}
      </div>
      <div className="text-emerald-400 mt-3 text-xs uppercase tracking-[0.2em] font-medium">
        {label}
      </div>
    </motion.div>
  )
}

// ─── Marquee content ──────────────────────────────────────────────────────────

const marqueeItems = [
  "Гвозди строительные",
  "Гвозди финишные",
  "Гвозди кровельные",
  "Скобы металлические",
  "Машинные гвозди",
  "Метизы оптом",
  "Прямые поставки",
  "Контроль качества ГОСТ",
  "Производство в Беларуси",
  "20 лет опыта",
]

// ─── Section data ─────────────────────────────────────────────────────────────

const advantages = [
  { icon: Factory,     title: "От производителя",  desc: "Прямая поставка без посредников — честные цены и надёжный партнёр." },
  { icon: ShieldCheck, title: "Гарантия качества",  desc: "Стабильное качество каждой партии. Соответствие ГОСТам и международным стандартам." },
  { icon: TrendingDown,title: "Оптовые цены",       desc: "Выгодные условия для бизнеса, гибкая система скидок при крупных заказах." },
  { icon: Truck,       title: "Быстрая доставка",   desc: "Доставка по всей России и СНГ. Надёжные логистические партнёры." },
]

const products = [
  { icon: Hammer, title: "Гвозди строительные", desc: "Прочные, надёжные, доступны оптом и в розницу для любых строительных задач." },
  { icon: Wrench, title: "Гвозди финишные",     desc: "Для чистовой отделки. Минимальная шляпка, незаметное крепление." },
  { icon: Home,   title: "Гвозди кровельные",   desc: "Оцинкованные, устойчивые к коррозии. Идеальны для кровельных работ." },
  { icon: Zap,    title: "Гвозди специальные",  desc: "Для промышленного применения и специфических задач. Под заказ." },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ background: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)" }}
        />

        {/* Emerald radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(16,185,129,0.13) 0%, transparent 70%)" }}
        />

        {/* Floating nail particles */}
        {floatingNails.map((nail, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-emerald-400"
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{
              y:       [0, -28, 0],
              scale:   [0.85, 1.15, 0.85],
              opacity: [0.06, 0.22, 0.06],
            }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-sm font-medium mb-8 bg-emerald-500/10"
          >
            Производитель гвоздей и метизов · Беларусь
          </motion.span>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.1 }}
              className="block"
            >
              ООО
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.2 }}
              className="block text-emerald-400 drop-shadow-[0_0_40px_rgba(52,211,153,0.35)]"
            >
              «Стальгрит»
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Производим строительные и промышленные гвозди для оптовых покупателей.
            Прочная сталь, честные цены и быстрая доставка по всему СНГ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contacts"
                className="block px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
              >
                Заказать гвозди
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/about-us"
                className="block px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-colors backdrop-blur-sm"
              >
                О компании
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
        >
          <span className="text-xs tracking-widest uppercase">Прокрутить</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gray-950 py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            <StatCounter value={20}    suffix="+"  label="лет на рынке"         delay={0}   />
            <StatCounter value={500}   suffix="+"  label="клиентов по СНГ"      delay={0.1} />
            <StatCounter value={10000} suffix="+"  label="тонн продукции в год" delay={0.2} />
            <StatCounter value={100}   suffix="%"  label="контроль качества"    delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-emerald-600 py-3 overflow-hidden">
        <div className="flex">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="animate-marquee whitespace-nowrap flex items-center gap-0 flex-shrink-0"
              aria-hidden={copy === 1}
            >
              {marqueeItems.map((item, i) => (
                <span key={i} className="text-white font-semibold text-sm px-6 flex items-center gap-4">
                  {item}
                  <NailSVGMini className="text-emerald-300 opacity-70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Advantages ── */}
      <section id="advantages" className="bg-white py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 tracking-tight"
          >
            Почему выбирают нас
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: i * 0.08 }}
                whileHover={{ y: -10, scale: 1.03, rotateZ: 0.8 }}
                className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-emerald-200 transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <item.icon size={22} className="text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="bg-gray-50 py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 tracking-tight"
          >
            Наша продукция
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -70 : 70, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 22, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-6 items-start group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                  <item.icon size={22} className="text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NailFinder Teaser ── */}
      <section className="bg-gray-950 py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden px-8 py-12 text-center"
          >
            {/* subtle glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6 bg-emerald-500/10 uppercase tracking-wider">
                Конфигуратор
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Не знаете, какой гвоздь нужен?
              </h2>
              <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                Ответьте на 2–3 вопроса — мы подберём нужный тип, длину и покрытие.
                Как профессиональный строитель, только быстрее.
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/nail-finder"
                  className="inline-block px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
                >
                  Подобрать гвоздь →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="relative bg-gray-950 py-32 overflow-hidden">
        {/* Emerald radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
        />

        {/* Floating nails */}
        {ctaNails.map((nail, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-emerald-400"
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{
              y:       [0, -22, 0],
              opacity: [0.05, 0.18, 0.05],
            }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6"
          >
            Хотите купить гвозди<br />от производителя?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
          >
            Оставьте заявку и получите персональное предложение уже сегодня.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block"
          >
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-emerald-500 pointer-events-none"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative">
              <Link
                href="/contacts"
                className="inline-block px-10 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
              >
                Связаться с нами
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
