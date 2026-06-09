"use client"

import { motion } from "framer-motion"
import { useRef, Suspense } from "react"
import dynamic from "next/dynamic"
import {
  Factory, ShieldCheck, TrendingDown, Truck,
  Hammer, Wrench, Home, Zap, ChevronDown,
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import MagneticBtn from "@/components/MagneticBtn/MagneticBtn"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const NailScene = dynamic(() => import("@/components/Scene3D/NailScene"), { ssr: false })

// ─── SVGs ─────────────────────────────────────────────────────────────────────

function NailSVG({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="56" viewBox="0 0 14 56" fill="currentColor">
      <rect x="0" y="0" width="14" height="7" rx="2" />
      <rect x="6" y="7" width="2" height="42" />
      <polygon points="6,49 8,49 7,56" />
    </svg>
  )
}

function NailSVGMini({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="10" viewBox="0 0 56 14" fill="currentColor">
      <rect x="0" y="0" width="7" height="14" rx="2" />
      <rect x="7" y="6" width="42" height="2" />
      <polygon points="49,6 49,8 56,7" />
    </svg>
  )
}

// ─── Floating nails (hardcoded to avoid hydration mismatch) ──────────────────

const floatingNails = [
  { x: "8%",  y: "18%", rot: 25,  delay: 0,   dur: 9   },
  { x: "82%", y: "12%", rot: -15, delay: 1.5, dur: 11  },
  { x: "22%", y: "72%", rot: 55,  delay: 0.8, dur: 8   },
  { x: "73%", y: "65%", rot: -40, delay: 2,   dur: 7.5 },
  { x: "48%", y: "22%", rot: 10,  delay: 0.3, dur: 12  },
  { x: "91%", y: "80%", rot: -60, delay: 0.6, dur: 9   },
  { x: "4%",  y: "52%", rot: 70,  delay: 1.2, dur: 10  },
  { x: "38%", y: "87%", rot: -25, delay: 1.8, dur: 8   },
  { x: "63%", y: "38%", rot: 40,  delay: 0.4, dur: 11  },
  { x: "17%", y: "42%", rot: -50, delay: 2.3, dur: 9   },
  { x: "56%", y: "78%", rot: 15,  delay: 1.0, dur: 13  },
  { x: "76%", y: "28%", rot: -35, delay: 0.7, dur: 10  },
]

const ctaNails = [
  { x: "7%",  y: "25%", rot: 30,  delay: 0,   dur: 10  },
  { x: "85%", y: "18%", rot: -20, delay: 0.8, dur: 9   },
  { x: "15%", y: "70%", rot: 55,  delay: 1.2, dur: 8   },
  { x: "78%", y: "65%", rot: -45, delay: 0.4, dur: 11  },
  { x: "50%", y: "82%", rot: 15,  delay: 1.6, dur: 9   },
  { x: "92%", y: "50%", rot: -60, delay: 0.6, dur: 8.5 },
]

// ─── Content data ─────────────────────────────────────────────────────────────

const marqueeItems = [
  "Гвозди строительные", "Гвозди финишные", "Гвозди кровельные",
  "Скобы металлические", "Машинные гвозди", "Метизы оптом",
  "Прямые поставки", "Контроль качества ГОСТ", "Производство в Беларуси", "20 лет опыта",
]

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

// ─── GSAP Counter ─────────────────────────────────────────────────────────────

function GsapCounter({ value, suffix, label, delay = 0 }: {
  value: number; suffix: string; label: string; delay?: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!ref.current || !numRef.current) return
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ref.current!,
          { opacity: 0, y: 50, scale: 0.7 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, delay, ease: "back.out(1.7)" }
        )
        gsap.to(obj, {
          val: value,
          duration: 2.2,
          delay: delay + 0.2,
          ease: "power2.out",
          onUpdate: () => {
            if (numRef.current)
              numRef.current.textContent = Math.floor(obj.val).toLocaleString("ru") + suffix
          },
          onComplete: () => {
            if (numRef.current)
              numRef.current.textContent = value.toLocaleString("ru") + suffix
          },
        })
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="text-center" style={{ opacity: 0 }}>
      <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tabular-nums leading-none">
        <span ref={numRef}>0{suffix}</span>
      </div>
      <div className="text-emerald-400 mt-3 text-xs uppercase tracking-[0.2em] font-medium">
        {label}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // 3D tilt on mouse move
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateX: -y * 12,
      rotateY: x * 12,
      transformPerspective: 1000,
      scale: 1.04,
      duration: 0.3,
      ease: "power2.out",
    })
    const icon = el.querySelector<HTMLElement>(".card-icon-inner")
    if (icon) gsap.to(icon, { rotate: 15, duration: 0.3, ease: "power2.out" })
  }

  const handleTiltEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    gsap.to(el, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.7,
      ease: "elastic.out(1.2, 0.4)",
    })
    const icon = el.querySelector<HTMLElement>(".card-icon-inner")
    if (icon) gsap.to(icon, { rotate: 0, duration: 0.5, ease: "elastic.out(1.2, 0.4)" })
  }

  useGSAP(() => {
    // Hero title — character reveal after curtain lifts
    gsap.fromTo(".hero-char",
      { y: "110%" },
      { y: "0%", stagger: 0.035, duration: 0.9, ease: "power3.out", delay: 1.05 }
    )

    // Hero badge
    gsap.fromTo(".hero-badge",
      { opacity: 0, y: -14, scale: 0.82 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: 0.95, ease: "back.out(1.7)" }
    )

    // Hero subtitle
    gsap.fromTo(".hero-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.85, delay: 1.6, ease: "power3.out" }
    )

    // Hero CTA buttons
    gsap.fromTo(".hero-btn",
      { opacity: 0, y: 20, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, delay: 1.8, ease: "back.out(1.7)" }
    )

    // Advantages — alternating entrance
    gsap.utils.toArray<HTMLElement>(".advantage-card").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -70 : 70, y: 24 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.8, delay: i * 0.07, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      )
    })

    // Products — alternating slide
    gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      )
    })

    // NailFinder teaser
    gsap.utils.toArray<HTMLElement>(".nail-teaser-reveal").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      )
    })

    // CTA title
    gsap.fromTo(".cta-title",
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 85%", once: true },
      }
    )
  }, { scope: pageRef })

  return (
    <div ref={pageRef} className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 overflow-hidden">

        {/* Three.js 3D nail scene — deep layer */}
        <div className="absolute inset-0" style={{ opacity: 0.55 }}>
          <Suspense fallback={null}>
            <NailScene />
          </Suspense>
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background:
              "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)," +
              "repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        {/* Emerald radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 60%,rgba(16,185,129,0.16) 0%,transparent 70%)" }}
        />

        {/* Floating 2D nails — near layer, z-2 */}
        {floatingNails.map((nail, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-emerald-400 z-[2]"
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{ y: [0, -28, 0], scale: [0.85, 1.15, 0.85], opacity: [0.06, 0.2, 0.06] }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">

          <span
            className="hero-badge inline-block px-4 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-sm font-medium mb-8 bg-emerald-500/10"
            style={{ opacity: 0 }}
          >
            Производитель гвоздей и метизов · Беларусь
          </span>

          {/* Title split into chars for GSAP */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight mb-6">
            <span className="block overflow-hidden pb-2">
              {"ООО".split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block"
                  style={{ transform: "translateY(110%)" }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-2 text-emerald-400 drop-shadow-[0_0_60px_rgba(52,211,153,0.45)]">
              {"«Стальгрит»".split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block"
                  style={{ transform: "translateY(110%)" }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="hero-subtitle text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Производим строительные и промышленные гвозди для оптовых покупателей.
            Прочная сталь, честные цены и быстрая доставка по всему СНГ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="hero-btn" style={{ opacity: 0 }}>
              <MagneticBtn
                href="/contacts"
                className="block px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
              >
                Заказать гвозди
              </MagneticBtn>
            </div>
            <div className="hero-btn" style={{ opacity: 0 }}>
              <MagneticBtn
                href="/about-us"
                className="block px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-colors backdrop-blur-sm"
              >
                О компании
              </MagneticBtn>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
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

      {/* ── Stats ────────────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            <GsapCounter value={20}    suffix="+"  label="лет на рынке"         delay={0}   />
            <GsapCounter value={500}   suffix="+"  label="клиентов по СНГ"      delay={0.1} />
            <GsapCounter value={10000} suffix="+"  label="тонн продукции в год" delay={0.2} />
            <GsapCounter value={100}   suffix="%"  label="контроль качества"    delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────────── */}
      <div className="bg-emerald-600 py-3 overflow-hidden">
        <div className="flex">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="animate-marquee whitespace-nowrap flex items-center flex-shrink-0"
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

      {/* ── Advantages (white) ───────────────────────────────────────────────── */}
      <section id="advantages" className="bg-white py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 tracking-tight"
          >
            Почему выбирают нас
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, i) => (
              <div
                key={i}
                className="advantage-card p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-emerald-200 transition-shadow group cursor-default"
                style={{ opacity: 0 }}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltEnd}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <div className="card-icon-inner">
                    <item.icon
                      size={22}
                      className="text-emerald-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products (dark) ──────────────────────────────────────────────────── */}
      <section id="products" className="bg-gray-950 py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 text-white tracking-tight"
          >
            Наша продукция
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((item, i) => (
              <div
                key={i}
                className="product-card relative p-8 rounded-2xl bg-gray-900 border border-white/5 hover:border-emerald-500/30 transition-colors overflow-hidden group cursor-default"
                style={{ opacity: 0 }}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltEnd}
              >
                {/* Decorative oversized nail */}
                <div
                  className="absolute right-4 top-3 text-emerald-400 pointer-events-none select-none"
                  style={{ opacity: 0.08, transform: "scale(2.2) rotate(-18deg)", transformOrigin: "top right" }}
                >
                  <NailSVG />
                </div>

                {/* Left accent line */}
                <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/25 transition-colors duration-300">
                    <div className="card-icon-inner">
                      <item.icon size={22} className="text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NailFinder Teaser ─────────────────────────────────────────────────── */}
      <section className="bg-gray-950 py-24 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden px-8 py-12 text-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%,rgba(16,185,129,0.12) 0%,transparent 70%)" }}
            />
            <div className="relative z-10">
              <span
                className="nail-teaser-reveal inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6 bg-emerald-500/10 uppercase tracking-wider"
                style={{ opacity: 0 }}
              >
                Конфигуратор
              </span>
              <h2
                className="nail-teaser-reveal text-3xl sm:text-4xl font-black text-white tracking-tight mb-4"
                style={{ opacity: 0 }}
              >
                Не знаете, какой гвоздь нужен?
              </h2>
              <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
                Ответьте на 2–3 вопроса — мы подберём нужный тип, длину и покрытие.
                Как профессиональный строитель, только быстрее.
              </p>
              <MagneticBtn
                href="/nail-finder"
                className="inline-block px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
              >
                Подобрать гвоздь →
              </MagneticBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section id="contact" className="relative bg-gray-950 py-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(16,185,129,0.13) 0%,transparent 70%)" }}
        />

        {ctaNails.map((nail, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-emerald-400"
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{ y: [0, -22, 0], opacity: [0.05, 0.18, 0.05] }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2
            className="cta-title text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6"
            style={{ opacity: 0 }}
          >
            Хотите купить гвозди<br />от производителя?
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
          >
            Оставьте заявку и получите персональное предложение уже сегодня.
          </motion.p>

          <MagneticBtn
            href="/contacts"
            showPulse
            className="relative inline-block px-10 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base transition-colors"
          >
            Связаться с нами
          </MagneticBtn>
        </div>
      </section>

    </div>
  )
}
