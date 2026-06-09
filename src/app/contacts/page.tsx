"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { employeeMockData } from "@/lib/employee-mock-data"
import { NailSVG } from "@/components/NailDivider"
import { Phone, Mail, MapPin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const heroNails = [
  { x: "6%",  y: "22%", rot: 35,  delay: 0,   dur: 9   },
  { x: "87%", y: "16%", rot: -25, delay: 0.7, dur: 10  },
  { x: "20%", y: "70%", rot: 60,  delay: 1.0, dur: 8   },
  { x: "80%", y: "68%", rot: -45, delay: 1.4, dur: 11  },
  { x: "46%", y: "12%", rot: 20,  delay: 0.3, dur: 9.5 },
  { x: "93%", y: "48%", rot: -60, delay: 0.9, dur: 8   },
]

const contactBlocks = [
  {
    Icon: MapPin,
    tag: "Местоположение",
    label: "Адрес",
    lines: [
      "ООО «Стальгрит»",
      "247500, Республика Беларусь",
      "Гомельская обл., г. Речица",
      "проезд Коммунальный, 12",
    ],
    links: [] as string[],
  },
  {
    Icon: Phone,
    tag: "Телефон",
    label: "Звонки и WhatsApp",
    lines: ["+375 (2340) 6-20-00", "+375 (2340) 6-40-00"],
    links: ["tel:+375234062000", "tel:+375234064000"],
  },
  {
    Icon: Mail,
    tag: "Email",
    label: "Электронная почта",
    lines: ["info@stalgrit.by"],
    links: ["mailto:info@stalgrit.by"],
  },
]

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(".contacts-hero-char",
      { y: "110%" },
      { y: "0%", stagger: 0.025, duration: 0.85, ease: "power3.out", delay: 1.05 }
    )
    gsap.fromTo(".contacts-hero-fade",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, delay: 1.35, ease: "power3.out" }
    )
    gsap.utils.toArray<HTMLElement>(".contacts-hero-nail").forEach(nail => {
      gsap.to(nail, {
        y: "-=45",
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
    gsap.fromTo(".team-reveal",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".team-reveal", start: "top 85%", once: true } }
    )
    gsap.utils.toArray<HTMLElement>(".emp-card-reveal").forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.75, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true } }
      )
    })
    gsap.utils.toArray<HTMLElement>(".contact-strip").forEach((strip, i) => {
      gsap.fromTo(strip,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.75, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: strip, start: "top 88%", once: true } }
      )
    })
  }, { scope: pageRef })

  return (
    <div ref={pageRef}>
    <main className="flex flex-col">

      {/* ══════════════════════════════════════════════ HERO ══ */}
      <section
        ref={heroRef}
        className="relative bg-gray-950 min-h-screen flex items-center overflow-hidden"
      >
        {/* emerald glow — left-biased */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 55% at 25% 55%, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{ background: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 64px)" }}
        />

        {/* postal code watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-[45%] select-none pointer-events-none font-black text-white leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 22rem)", opacity: 0.025, letterSpacing: "-0.04em" }}
        >
          {`Стальгрит`}
        </div>

        {/* floating nails */}
        {heroNails.map((nail, i) => (
          <motion.div
            key={i}
            className="contacts-hero-nail absolute pointer-events-none text-emerald-400"
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{ y: [0, -16, 0], rotate: [nail.rot, nail.rot + 10, nail.rot], opacity: [0.07, 0.14, 0.07] }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        {/* content — left-aligned */}
        <div className="relative z-10 w-full container mx-auto px-6 lg:px-20 max-w-6xl pt-32 pb-20">

          {/* monospace label */}
          <div className="contacts-hero-fade flex items-center gap-3 mb-10" style={{ opacity: 0 }}>
            <div className="h-px w-8 bg-emerald-500 flex-shrink-0" />
            <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase">
              ООО Стальгрит&nbsp;&nbsp;·&nbsp;&nbsp;Речица&nbsp;&nbsp;·&nbsp;&nbsp;info@stalgrit.by
            </span>
          </div>

          {/* headline: mixed weight */}
          <h1 className="mb-10">
            <span className="block text-gray-500 font-light tracking-tight leading-none overflow-hidden pb-2"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              {"Свяжитесь".split("").map((char, i) => (
                <span key={i} className="contacts-hero-char inline-block" style={{ transform: "translateY(110%)" }}>
                  {char}
                </span>
              ))}
            </span>
            <span className="block text-white font-black tracking-tight leading-none overflow-hidden pb-2"
              style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}>
              {"с нами".split("").map((char, i) => (
                <span
                  key={i}
                  className="contacts-hero-char inline-block"
                  style={{ transform: "translateY(110%)", ...(char === " " && { minWidth: "0.4em" }) }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
          </h1>

          {/* description */}
          <p
            className="contacts-hero-fade text-gray-400 max-w-xl leading-relaxed mb-10"
            style={{ opacity: 0, fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
          >
            Оптовые заказы, сотрудничество и консультации — мы отвечаем быстро.
          </p>

          {/* CTA links */}
          <div className="contacts-hero-fade flex flex-col sm:flex-row gap-4" style={{ opacity: 0 }}>
            <a
              href="tel:+375234062000"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors"
            >
              <Phone size={15} />
              +375 (2340) 6-20-00
            </a>
            <a
              href="mailto:info@stalgrit.by"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/8 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-colors backdrop-blur-sm"
            >
              <Mail size={15} />
              info@stalgrit.by
            </a>
          </div>

          {/* bottom rule */}
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

      {/* ══════════════════════════════════════════ TEAM ══ */}
      <section className="bg-gray-900 py-28 px-6 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* heading */}
          <div className="team-reveal mb-14" style={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-emerald-500" />
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase">Команда</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Наша команда
            </h2>
          </div>

          {/* Full-bleed photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: "360px" }}>
            {employeeMockData.map((emp, i) => (
              <div
                key={i}
                className="emp-card-reveal group relative rounded-2xl overflow-hidden cursor-default"
                style={{ opacity: 0 }}
              >
                <Image
                  src={emp.src}
                  alt={emp.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/25 to-transparent" />

                {/* hover ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-emerald-500/40 transition-all duration-300 pointer-events-none" />

                {/* emerald top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* index */}
                <div className="absolute top-5 left-5 font-mono text-[10px] text-white/25 tracking-[0.2em]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-mono text-[10px] text-emerald-400 tracking-[0.25em] uppercase mb-2 leading-none">
                    {emp.job}
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-3">{emp.name}</h3>

                  {/* contact — slides up on hover */}
                  <div className="flex flex-col gap-1.5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={`tel:${emp.phone.replace(/\D/g, "")}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-xs transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <Phone size={11} className="text-emerald-500 flex-shrink-0" />
                      {emp.phone}
                    </a>
                    <a
                      href={`mailto:${emp.email}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-xs transition-colors truncate"
                      onClick={e => e.stopPropagation()}
                    >
                      <Mail size={11} className="text-emerald-500 flex-shrink-0" />
                      {emp.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ ADDRESS ══ */}
      <section className="bg-gray-950 py-28 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-14 pb-6 border-b border-white/8"
          >
            <div>
              <span className="font-mono text-[11px] text-emerald-400 tracking-[0.3em] uppercase block mb-3">Реквизиты</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Как нас найти</h2>
            </div>
          </motion.div>

          {/* editorial contact strips */}
          <div className="divide-y divide-white/6">
            {contactBlocks.map((block, i) => (
              <div
                key={i}
                className="contact-strip group flex items-start gap-6 sm:gap-12 lg:gap-16 py-10 pl-4 border-l-2 border-transparent hover:border-emerald-500 transition-colors duration-300 cursor-default"
                style={{ opacity: 0 }}
              >
                {/* hover bg */}
                <div className="absolute inset-0 bg-emerald-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* index */}
                <span className="hidden lg:block flex-shrink-0 font-black tabular-nums text-white/10 text-xl w-7 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* icon + tag */}
                <div className="flex-shrink-0 w-28 sm:w-36 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center mb-3 transition-colors duration-300">
                    <block.Icon size={16} className="text-emerald-400" />
                  </div>
                  <div className="font-mono text-[10px] text-emerald-400/50 tracking-[0.2em] uppercase leading-tight">
                    {block.tag}
                  </div>
                </div>

                {/* thin vertical rule */}
                <div className="hidden sm:block w-px self-stretch bg-white/8 group-hover:bg-emerald-500/25 transition-colors duration-300 flex-shrink-0" />

                {/* content */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">{block.label}</div>
                  <div className="space-y-1.5">
                    {block.lines.map((line, j) =>
                      block.links[j] ? (
                        <a
                          key={j}
                          href={block.links[j]}
                          className="block text-white text-lg font-semibold hover:text-emerald-400 transition-colors duration-200 leading-snug"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={j} className="text-gray-400 text-base leading-snug">{line}</p>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    </div>
  )
}
