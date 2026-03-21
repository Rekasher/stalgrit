"use client"

import { motion } from "framer-motion"
import Carousel3D from "@/components/Carousel/Carousel"
import NailDivider, { NailSVG } from "@/components/NailDivider"
import {
  AboutUsInfo,
  Achievements,
  ProductionInfo,
  Certificates,
} from "@/lib/about-us-mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── floating nails for hero ─────────────────────────────────────────────────

const heroNails = [
  { x: "5%",  y: "20%", rot: 30,  delay: 0,   dur: 9  },
  { x: "88%", y: "14%", rot: -20, delay: 0.7, dur: 11 },
  { x: "18%", y: "68%", rot: 55,  delay: 1.1, dur: 8  },
  { x: "80%", y: "72%", rot: -45, delay: 0.4, dur: 9  },
  { x: "50%", y: "80%", rot: 15,  delay: 1.5, dur: 10 },
  { x: "62%", y: "22%", rot: -55, delay: 0.6, dur: 8.5},
  { x: "35%", y: "50%", rot: 40,  delay: 1.8, dur: 12 },
  { x: "92%", y: "45%", rot: -25, delay: 0.9, dur: 9  },
]

// ─── Section heading with nail strip ─────────────────────────────────────────

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-12">
      <NailDivider count={5} className="mb-5" />
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
        className={`text-4xl lg:text-5xl font-extrabold tracking-tight ${light ? "text-white" : "text-gray-900"}`}
      >
        {children}
      </motion.h2>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  return (
    <main className="flex flex-col">

      {/* ── Dark hero with floating nails ── */}
      <section className="relative bg-gradient-to-b from-gray-950 to-gray-900 pt-36 pb-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 70%)" }}
        />

        {heroNails.map((nail, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-emerald-400"
            style={{ left: nail.x, top: nail.y, rotate: nail.rot }}
            animate={{
              y:       [0, -18, 0],
              rotate:  [nail.rot, nail.rot + 10, nail.rot],
              opacity: [0.07, 0.14, 0.07],
            }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        <div className="relative z-10 container mx-auto px-6 lg:px-20 text-center space-y-6 max-w-5xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 text-sm font-medium bg-emerald-500/10"
          >
            20+ лет · Речица, Беларусь
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-none"
          >
            {AboutUsInfo.Title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {AboutUsInfo.Description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="italic text-emerald-400/80 text-base"
          >
            {AboutUsInfo.Mission}
          </motion.p>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Наши достижения</SectionHeading>
          <div className="grid gap-8 md:grid-cols-3">
            {Achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.12, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 380, damping: 22, delay: i * 0.12 }}
                whileHover={{ scale: 1.04, rotate: 0 }}
              >
                <Card className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl p-6 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Production ── */}
      <section className="py-24 px-6 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Наше производство</SectionHeading>
          <div className="grid gap-8 md:grid-cols-3">
            {ProductionInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 26, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white shadow-lg hover:shadow-emerald-200/60 border border-gray-200 p-6 h-full transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificates ── */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Наши сертификаты</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {Certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 500, damping: 22, delay: i * 0.08 }}
                whileHover={{ scale: 1.06 }}
              >
                <Card className="bg-gray-50 border border-gray-200 p-4 shadow-md hover:shadow-lg hover:border-emerald-300 transition-all text-center h-full">
                  <CardTitle className="text-base font-semibold mb-2">{cert.title}</CardTitle>
                  <CardContent>
                    <p className="text-emerald-600 font-bold text-lg">{cert.year}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team carousel — dark section ── */}
      <section className="py-24 px-6 lg:px-20 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <NailDivider count={5} className="mb-5" />
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-center"
            >
              Наша дружная семья
            </motion.h2>
          </div>
          <Carousel3D />
        </div>
      </section>

    </main>
  )
}
