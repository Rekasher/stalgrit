"use client"

import Link from "next/link"
import { motion } from "framer-motion"

function NailLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="48"
      viewBox="0 0 20 48"
      fill="currentColor"
    >
      {/* Wide industrial head */}
      <rect x="0" y="0" width="20" height="8" rx="2.5" />
      {/* Neck taper */}
      <rect x="6" y="8" width="8" height="3" rx="1" />
      {/* Shaft */}
      <rect x="8" y="11" width="4" height="28" />
      {/* Sharp tip */}
      <polygon points="8,39 12,39 10,48" />
    </svg>
  )
}

export default function StalGritLogo({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none group">
      {/* Nail — drops from above with spring, jiggles on hover */}
      <motion.div
        initial={{ y: -36, opacity: 0, rotate: -12 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 22, delay: 0.04 }}
        whileHover={{
          rotate: [0, -5, 5, -3, 0],
          transition: { duration: 0.38, type: "tween", ease: "easeInOut" },
        }}
        className="text-emerald-500 flex-shrink-0 drop-shadow-[0_2px_6px_rgba(16,185,129,0.5)]"
      >
        <NailLogoIcon />
      </motion.div>

      {/* Text block — slides in from left */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 26, delay: 0.14 }}
        className="flex flex-col leading-none"
      >
        <span
          className={`text-[9px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 ${
            scrolled ? "text-gray-400" : "text-white/50"
          }`}
        >
          ООО
        </span>
        <span
          className={`font-black text-[21px] tracking-tight transition-colors duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
        >
          Стальгрит
        </span>
      </motion.div>
    </Link>
  )
}