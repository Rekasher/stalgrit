"use client"

import Link from "next/link"
import { useRef, ReactNode } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

interface Props {
  href: string
  className?: string
  children: ReactNode
  showPulse?: boolean
}

export default function MagneticBtn({ href, className, children, showPulse = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" })
  }

  const onLeave = () => {
    gsap.to(wrapRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1.2, 0.4)",
    })
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-block"
    >
      {showPulse && (
        <motion.div
          animate={{ scale: [1, 1.75, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-emerald-500 pointer-events-none"
        />
      )}
      <Link href={href} className={className}>
        {children}
      </Link>
    </div>
  )
}
