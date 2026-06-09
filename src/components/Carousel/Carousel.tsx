"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react"
import { employeeMockData } from "@/lib/employee-mock-data"

const RADIUS = 360
const ANGLE_PER = 360 / employeeMockData.length
const AUTO_INTERVAL = 3200

// ── helpers ───────────────────────────────────────────────────────────────────

function relAngle(cardIndex: number, rotation: number): number {
  const world = ((cardIndex * ANGLE_PER + rotation) % 360 + 360) % 360
  return world > 180 ? world - 360 : world
}

// ── component ─────────────────────────────────────────────────────────────────

export default function Carousel3D() {
  const count = employeeMockData.length

  const [activeIdx, setActiveIdx] = useState(0)
  const [rotation, setRotation]   = useState(0)
  const [dragging, setDragging]   = useState(false)

  const isDraggingRef  = useRef(false)
  const startXRef      = useRef(0)
  const rotRef         = useRef(0)
  const dragStartRef   = useRef(0)

  // ── snap to index ──────────────────────────────────────────────────────────

  const snapTo = useCallback((idx: number) => {
    const norm = ((idx % count) + count) % count
    const target = -norm * ANGLE_PER
    rotRef.current = target
    setRotation(target)
    setActiveIdx(norm)
  }, [count])

  // ── window events (one effect, refs avoid stale closure) ──────────────────

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return
      const x = "touches" in e ? e.touches[0].clientX : e.clientX
      const delta = x - startXRef.current
      const newRot = dragStartRef.current + delta * 0.45
      rotRef.current = newRot
      setRotation(newRot)
    }

    const onUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      setDragging(false)
      const nearest = Math.round(-rotRef.current / ANGLE_PER)
      snapTo(nearest)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup",   onUp)
    window.addEventListener("touchmove", onMove, { passive: true })
    window.addEventListener("touchend",  onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup",   onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend",  onUp)
    }
  }, [snapTo])

  // ── auto-rotate ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (dragging) return
    const id = setInterval(() => {
      setActiveIdx(prev => {
        const next = (prev + 1) % count
        const t = -next * ANGLE_PER
        rotRef.current = t
        setRotation(t)
        return next
      })
    }, AUTO_INTERVAL)
    return () => clearInterval(id)
  }, [dragging, count])

  // ── drag start handlers ───────────────────────────────────────────────────

  const dragStart = (x: number) => {
    isDraggingRef.current = true
    setDragging(true)
    startXRef.current   = x
    dragStartRef.current = rotRef.current
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="w-full flex flex-col items-center gap-8 select-none"
    >
      {/* ── 3D stage ───────────────────────────────────────────────────────── */}
      <div
        className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px" }}
        onMouseDown={e  => dragStart(e.clientX)}
        onTouchStart={e => dragStart(e.touches[0].clientX)}
      >
        {/* ambient glow behind active card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 55% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)" }}
        />

        <div
          className="absolute"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${RADIUS}px) rotateY(${rotation}deg)`,
            transition: dragging ? "none" : "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {employeeMockData.map((emp, i) => {
            const rel   = relAngle(i, rotation)
            const abs   = Math.abs(rel)
            const hidden = abs > 100
            const active = i === activeIdx

            // Visual depth: cos curve for opacity, scale
            const cos     = Math.max(0, Math.cos((abs * Math.PI) / 160))
            const opacity  = hidden ? 0 : active ? 1 : 0.45 + cos * 0.25
            const scale    = active ? 1.07 : 0.93

            return (
              <div
                key={i}
                style={{
                  position:  "absolute",
                  width:     260,
                  height:    370,
                  left:      -130,
                  top:       -185,
                  transform: `rotateY(${i * ANGLE_PER}deg) translateZ(${RADIUS}px)`,
                  opacity:   hidden ? 0 : opacity,
                  transition: dragging ? "opacity 0.1s" : "opacity 0.5s",
                  pointerEvents: hidden ? "none" : "auto",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className={`
                    w-full h-full rounded-2xl overflow-hidden flex flex-col
                    bg-gray-900
                    ${active
                      ? "border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2),0_20px_60px_rgba(0,0,0,0.6)]"
                      : "border border-white/8 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
                    }
                  `}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    transition: "transform 0.55s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s, border-color 0.5s",
                  }}
                >
                  {/* Emerald top line (active only) */}
                  <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`} />

                  {/* Photo */}
                  <div className="relative w-full" style={{ height: 220 }}>
                    <Image
                      src={emp.src}
                      alt={emp.alt}
                      fill
                      className="object-cover"
                      draggable={false}
                      sizes="260px"
                    />
                    <div className={`
                      absolute inset-0 transition-opacity duration-500
                      ${active
                        ? "bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent"
                        : "bg-gradient-to-t from-gray-900 via-gray-900/40 to-black/20"
                      }
                    `} />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-5 gap-2">
                    {/* Nail-dot + line */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`
                        w-2.5 h-2.5 rounded-full border transition-all duration-500 flex-shrink-0
                        ${active
                          ? "bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                          : "bg-gray-600 border-gray-500"
                        }
                      `} />
                      <div className={`h-px flex-1 transition-colors duration-500 ${active ? "bg-emerald-500/35" : "bg-white/10"}`} />
                    </div>

                    <p className="text-[15px] font-bold text-white leading-tight">{emp.name}</p>
                    <p className={`text-xs font-medium transition-colors duration-500 ${active ? "text-emerald-400" : "text-gray-400"}`}>
                      {emp.job}
                    </p>

                    {/* Contact — only on active */}
                    <div className={`mt-auto pt-3 border-t border-white/8 space-y-1.5 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
                      <a
                        href={`tel:${emp.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-emerald-400 transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        <Phone size={11} className="text-emerald-500 flex-shrink-0" />
                        {emp.phone}
                      </a>
                      <a
                        href={`mailto:${emp.email}`}
                        className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-emerald-400 transition-colors truncate"
                        onClick={e => e.stopPropagation()}
                      >
                        <Mail size={11} className="text-emerald-500 flex-shrink-0" />
                        {emp.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Controls ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-5">
        {/* Prev */}
        <button
          onClick={() => snapTo(activeIdx - 1)}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          aria-label="Предыдущий"
        >
          <ChevronLeft size={17} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {employeeMockData.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`
                rounded-full transition-all duration-300 origin-center
                ${i === activeIdx
                  ? "w-6 h-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }
              `}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => snapTo(activeIdx + 1)}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
          aria-label="Следующий"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Drag hint */}
      <p className="text-xs text-white/20 tracking-widest uppercase">
        Тяните для прокрутки
      </p>
    </motion.div>
  )
}
