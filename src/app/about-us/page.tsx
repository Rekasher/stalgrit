"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Carousel3D from "@/components/Carousel/Carousel"
import { NailSVG } from "@/components/NailDivider"
import {
  AboutUsInfo,
  Achievements,
  ProductionInfo,
  Certificates,
} from "@/lib/about-us-mock-data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Award, TrendingUp, Globe, ShieldCheck, Cpu, Package } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─── static data ──────────────────────────────────────────────────────────────

const heroNails = [
  { x: "5%",  y: "20%", rot: 30,  delay: 0,   dur: 9   },
  { x: "88%", y: "14%", rot: -20, delay: 0.7, dur: 11  },
  { x: "18%", y: "68%", rot: 55,  delay: 1.1, dur: 8   },
  { x: "80%", y: "72%", rot: -45, delay: 0.4, dur: 9   },
  { x: "50%", y: "80%", rot: 15,  delay: 1.5, dur: 10  },
  { x: "62%", y: "22%", rot: -55, delay: 0.6, dur: 8.5 },
  { x: "35%", y: "50%", rot: 40,  delay: 1.8, dur: 12  },
  { x: "92%", y: "45%", rot: -25, delay: 0.9, dur: 9   },
]

const achieveIcons = [Award, TrendingUp, Globe]
const achieveMetrics = [
  { value: "20+", unit: "лет опыта"       },
  { value: "№1",  unit: "экспортёр"       },
  { value: "4",   unit: "страны поставок" },
]

const prodIcons = [Cpu, Package, ShieldCheck]
const prodBrands = [
  ["ENKOTEC", "WAFIOS", "VITARI", "ZEUS", "EVG", "BILWINCO"],
  [],
  [],
]

// ─── GSAP counter brick ───────────────────────────────────────────────────────

function StatBrick({
  value, suffix, label, delay = 0,
}: {
  value: number | string; suffix?: string; label: string; delay?: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!ref.current || !numRef.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(ref.current!,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out" }
        )
        if (typeof value === "number") {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: value,
            duration: 2.2,
            delay: delay + 0.1,
            ease: "power2.out",
            onUpdate: () => {
              if (numRef.current)
                numRef.current.textContent = Math.floor(obj.val).toLocaleString("ru") + (suffix ?? "")
            },
            onComplete: () => {
              if (numRef.current)
                numRef.current.textContent = value.toLocaleString("ru") + (suffix ?? "")
            },
          })
        }
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 relative group" style={{ opacity: 0 }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tabular-nums leading-none tracking-tight">
        <span ref={numRef}>{typeof value === "string" ? value : `0${suffix ?? ""}`}</span>
      </div>
      <div className="mt-3 text-emerald-400/60 text-[10px] uppercase tracking-[0.3em] font-semibold">{label}</div>
    </div>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(".about-hero-char",
      { y: "110%" },
      { y: "0%", stagger: 0.025, duration: 0.85, ease: "power3.out", delay: 1.05 }
    )
    gsap.fromTo(".about-hero-fade",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, delay: 1.35, ease: "power3.out" }
    )
    gsap.utils.toArray<HTMLElement>(".about-hero-nail").forEach(nail => {
      gsap.to(nail, {
        y: "-=55",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    })
  }, { scope: heroRef })

  useGSAP(() => {
    gsap.fromTo(".mission-reveal",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".mission-reveal", start: "top 80%", once: true } }
    )

    gsap.utils.toArray<HTMLElement>(".achieve-strip").forEach((strip, i) => {
      gsap.fromTo(strip,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.75, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: strip, start: "top 88%", once: true } }
      )
    })

    gsap.utils.toArray<HTMLElement>(".prod-item").forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true } }
      )
    })

    gsap.utils.toArray<HTMLElement>(".cert-card").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.6, rotate: i % 2 === 0 ? -8 : 8 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.65, delay: i * 0.08,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: card, start: "top 88%", once: true } }
      )
    })

    gsap.fromTo(".team-heading-reveal",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".team-heading-reveal", start: "top 85%", once: true } }
    )
  }, { scope: pageRef })

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const r  = el.getBoundingClientRect()
    const x  = (e.clientX - r.left) / r.width - 0.5
    const y  = (e.clientY - r.top)  / r.height - 0.5
    gsap.to(el, { rotateX: -y * 10, rotateY: x * 10, transformPerspective: 1000, scale: 1.03, duration: 0.3, ease: "power2.out" })
  }
  const handleTiltEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.65, ease: "elastic.out(1.2, 0.4)" })
  }

  return (
    <div ref={pageRef}>
    <main className="flex flex-col">

      {/* ══════════════════════════════════════════════ HERO ══ */}
      <section
        ref={heroRef}
        className="relative bg-gray-950 min-h-[85dvh] sm:min-h-screen flex items-center overflow-hidden"
      >
        {/* emerald glow — left-biased to match left-aligned text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 55% at 25% 55%, rgba(16,185,129,0.13) 0%, transparent 70%)" }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{ background: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 64px)" }}
        />

        {/* "2003" watermark — far right */}
        <div
          className="absolute right-0 top-1/2 -translate-y-[45%] select-none pointer-events-none font-black text-white leading-none"
          style={{ fontSize: "clamp(9rem, 24vw, 26rem)", opacity: 0.028, letterSpacing: "-0.04em" }}
        >
          {`Стальгрит`}
        </div>

        {/* floating nails */}
        {heroNails.map((nail, i) => (
          <motion.div
            key={i}
            className={`about-hero-nail absolute pointer-events-none text-emerald-400${i >= 4 ? " hidden sm:block" : ""}`}
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{ y: [0, -18, 0], rotate: [nail.rot, nail.rot + 10, nail.rot], opacity: [0.07, 0.14, 0.07] }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        {/* content — left-aligned */}
        <div className="relative z-10 w-full container mx-auto px-6 lg:px-20 max-w-6xl pt-24 pb-12 sm:pt-32 sm:pb-20">

          {/* monospace top label */}
          <div className="about-hero-fade flex items-center gap-3 mb-10" style={{ opacity: 0 }}>
            <div className="h-px w-8 bg-emerald-500 flex-shrink-0" />
            <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase">
              ООО Стальгрит&nbsp;&nbsp;·&nbsp;&nbsp;Речица&nbsp;&nbsp;·&nbsp;&nbsp;Основан 2003
            </span>
          </div>

          {/* headline: mixed weight, two lines */}
          <h1 className="mb-10">
            <span className="block text-gray-500 font-light tracking-tight leading-none overflow-hidden pb-2"
              style={{ fontSize: "clamp(1.2rem, 4vw, 4rem)" }}>
              {"О компании".split("").map((char, i) => (
                <span key={i} className="about-hero-char inline-block" style={{ transform: "translateY(110%)" }}>
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
            <span className="block text-white font-black tracking-tight leading-none overflow-hidden pb-2"
              style={{ fontSize: "clamp(2.25rem, 10vw, 10rem)" }}>
              {"Стальгрит".split("").map((char, i) => (
                <span key={i} className="about-hero-char inline-block" style={{ transform: "translateY(110%)" }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* description */}
          <p
            className="about-hero-fade text-gray-400 max-w-xl leading-relaxed"
            style={{ opacity: 0, fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            {AboutUsInfo.Description}
          </p>

          {/* bottom rule + scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="flex items-center gap-6 mt-16 pt-8 border-t border-white/8"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 flex-shrink-0"
            >
              <div className="w-1 h-1.5 rounded-full bg-emerald-400" />
            </motion.div>
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">Прокрутить вниз</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ STATS ══ */}
      <section className="bg-gray-900 border-t border-b border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            <StatBrick value="2003"  label="год основания"     delay={0}   />
            <StatBrick value={20} suffix="+" label="лет на рынке"      delay={0.1} />
            <StatBrick value={4}     label="страны поставок"   delay={0.2} />
            <StatBrick value={100} suffix="%" label="контроль качества" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ MISSION ══ */}
      <section className="bg-gray-950 py-14 sm:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
          <div className="mission-reveal" style={{ opacity: 0 }}>
            {/* eyebrow */}
            <div className="flex items-center gap-4 mb-8 sm:mb-12">
              <div className="h-px w-10 bg-emerald-500" />
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase">Наша миссия</span>
            </div>

            {/* two-column editorial */}
            <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
              <div className="lg:pt-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-6">
                  Зачем<br />мы это<br />делаем
                </h2>
                <div className="h-px w-12 bg-emerald-500/40" />
              </div>
              <div>
                <p className="text-white/65 font-medium leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 2.2rem)" }}>
                  {AboutUsInfo.Mission.replace("Наша миссия — ", "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ ACHIEVEMENTS ══ */}
      <section className="bg-gray-900 py-12 sm:py-20">
        <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
          {/* section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-white/8"
          >
            <div>
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase block mb-3">Результаты</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Достижения</h2>
            </div>
            <span className="hidden sm:block text-white/8 font-black text-8xl leading-none tabular-nums select-none">
              0{Achievements.length}
            </span>
          </motion.div>

          {/* horizontal strips */}
          <div className="divide-y divide-white/6">
            {Achievements.map((item, i) => {
              const Icon = achieveIcons[i]
              const metric = achieveMetrics[i]
              return (
                <div
                  key={i}
                  className="achieve-strip group relative flex items-center gap-6 sm:gap-12 lg:gap-16 py-6 sm:py-9 pl-4 border-l-2 border-transparent hover:border-emerald-500 transition-colors duration-300 cursor-default"
                  style={{ opacity: 0 }}
                >
                  {/* subtle bg on hover */}
                  <div className="absolute inset-0 bg-emerald-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* index */}
                  <span className="hidden lg:block flex-shrink-0 font-black tabular-nums text-white/10 text-xl w-7">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* metric */}
                  <div className="flex-shrink-0 w-28 sm:w-36">
                    <div className="text-3xl sm:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors duration-300 leading-none">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase">
                      {metric.unit}
                    </div>
                  </div>

                  {/* thin vertical rule */}
                  <div className="hidden sm:block w-px h-12 bg-white/8 group-hover:bg-emerald-500/30 transition-colors duration-300 flex-shrink-0" />

                  {/* content */}
                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                        <Icon size={14} className="text-emerald-400" />
                      </div>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {/* arrow */}
                  <div className="hidden lg:flex flex-shrink-0 w-9 h-9 rounded-full border border-transparent group-hover:border-emerald-500/40 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-emerald-400 text-sm leading-none">→</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PRODUCTION ══ */}
      <section className="bg-white py-14 sm:py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-8 sm:mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-emerald-500" />
              <span className="font-mono text-[11px] text-emerald-600 tracking-[0.3em] uppercase">Производство</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">Как мы работаем</h2>
          </motion.div>

          {/* timeline list */}
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-emerald-100 hidden sm:block" />

            <div className="flex flex-col">
              {ProductionInfo.map((item, i) => {
                const Icon = prodIcons[i]
                const brands = prodBrands[i]
                return (
                  <div
                    key={i}
                    className="prod-item flex gap-8 sm:gap-10 py-8 sm:py-11 group border-b border-gray-100 last:border-0"
                    style={{ opacity: 0 }}
                  >
                    {/* timeline node */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-1 sm:w-12">
                      <div className="w-12 h-12 rounded-full bg-white border border-emerald-100 group-hover:bg-emerald-500 group-hover:border-emerald-500 flex items-center justify-center transition-all duration-300 z-10 shadow-sm">
                        <Icon size={17} className="text-emerald-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex-1 pt-2">
                      {/* step number */}
                      <div className="font-mono text-[10px] text-emerald-500/50 tracking-[0.25em] uppercase mb-2">
                        Шаг {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed mb-4 text-[15px]">{item.description}</p>
                      {brands.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {brands.map(brand => (
                            <span
                              key={brand}
                              className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-mono font-semibold tracking-wide hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CERTIFICATES ══ */}
      <section className="bg-gray-950 py-14 sm:py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-white/8"
          >
            <div>
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase block mb-3">Признание</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Награды</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {Certificates.map((cert, i) => (
              <div
                key={i}
                className="cert-card group relative rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden cursor-default transition-colors duration-300 h-40 sm:h-[200px] lg:h-[230px]"
                style={{
                  opacity: 0,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltEnd}
              >
                {/* emerald top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* inner dashed border */}
                <div className="absolute inset-[10px] rounded-xl border border-dashed border-white/[0.05] group-hover:border-emerald-500/20 pointer-events-none transition-colors duration-300" />
                {/* glow */}
                <div className="absolute inset-0 bg-emerald-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                {/* year */}
                <div className="relative">
                  <span className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                    {cert.year}
                  </span>
                </div>

                {/* bottom */}
                <div className="relative">
                  <div className="h-px bg-white/6 group-hover:bg-emerald-500/25 transition-colors duration-300 mb-5" />
                  <p className="text-gray-400 text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                    {cert.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ TEAM ══ */}
      <section className="bg-gray-950 py-14 sm:py-24 lg:py-32 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="team-heading-reveal mb-8 sm:mb-14" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-emerald-500" />
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase">Команда</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none mb-5">
              Люди, которые<br />делают это
            </h2>
            <p className="text-gray-500 max-w-md text-base leading-relaxed">
              За каждым гвоздём — профессионалы с многолетним опытом в металлургии и производстве.
            </p>
          </div>

          <Carousel3D />
        </div>
      </section>

    </main>
    </div>
  )
}