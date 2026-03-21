"use client"

import { motion } from "framer-motion"
import { employeeMockData } from "@/lib/employee-mock-data"
import EmployeeCard from "@/components/EmployeeCard/EmployeeCard"
import NailDivider, { NailSVG } from "@/components/NailDivider"
import { Phone, Mail, MapPin } from "lucide-react"

// ─── floating nails for hero ─────────────────────────────────────────────────

const heroNails = [
  { x: "6%",  y: "22%", rot: 35,  delay: 0,   dur: 9   },
  { x: "87%", y: "16%", rot: -25, delay: 0.7, dur: 10  },
  { x: "20%", y: "70%", rot: 60,  delay: 1.0, dur: 8   },
  { x: "80%", y: "68%", rot: -45, delay: 1.4, dur: 11  },
  { x: "46%", y: "12%", rot: 20,  delay: 0.3, dur: 9.5 },
  { x: "93%", y: "48%", rot: -60, delay: 0.9, dur: 8   },
]

export default function ContactPage() {
  return (
    <main className="flex flex-col">

      {/* ── Dark hero ── */}
      <section className="relative bg-gradient-to-b from-gray-950 to-gray-900 pt-36 pb-28 overflow-hidden">
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
              y:       [0, -16, 0],
              rotate:  [nail.rot, nail.rot + 10, nail.rot],
              opacity: [0.07, 0.14, 0.07],
            }}
            transition={{ duration: nail.dur, delay: nail.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <NailSVG />
          </motion.div>
        ))}

        <div className="relative z-10 container mx-auto px-6 lg:px-20 text-center space-y-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="text-5xl lg:text-7xl font-black text-white tracking-tight"
          >
            Контакты
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Свяжитесь с нами для оптовых заказов и сотрудничества
          </motion.p>

          {/* Quick contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <a
              href="tel:+375234062000"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors"
            >
              <Phone size={16} />
              +375 (2340) 6-20-00
            </a>
            <a
              href="mailto:info@stalgrit.by"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors backdrop-blur-sm"
            >
              <Mail size={16} />
              info@stalgrit.by
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <NailDivider count={6} className="mb-5" />
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
            >
              Наша команда
            </motion.h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {employeeMockData.map((emp, i) => (
              <EmployeeCard key={i} {...emp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Address ── */}
      <section className="py-24 px-6 lg:px-20 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <NailDivider count={4} className="mb-5" />
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 350, damping: 28, delay: 0.3 }}
              className="text-4xl font-extrabold tracking-tight text-white"
            >
              Наш адрес
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                label: "Адрес",
                lines: [
                  "ООО «Стальгрит»",
                  "247500, Республика Беларусь",
                  "Гомельская обл., г. Речица",
                  "проезд Коммунальный, 12",
                ],
              },
              {
                icon: Phone,
                label: "Телефон",
                lines: [
                  "+375 (2340) 6-20-00",
                  "+375 (2340) 6-40-00",
                ],
                links: [
                  "tel:+375234062000",
                  "tel:+375234064000",
                ],
              },
              {
                icon: Mail,
                label: "Email",
                lines: ["info@stalgrit.by"],
                links: ["mailto:info@stalgrit.by"],
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 24, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <block.icon size={16} className="text-emerald-400" />
                  </div>
                  <span className="text-emerald-400 text-xs uppercase tracking-widest font-semibold">{block.label}</span>
                </div>
                <div className="space-y-1">
                  {block.lines.map((line, j) =>
                    block.links?.[j] ? (
                      <a
                        key={j}
                        href={block.links[j]}
                        className="block text-white hover:text-emerald-400 transition-colors text-sm"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={j} className="text-gray-400 text-sm">{line}</p>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
