"use client"

import { motion } from "framer-motion"

export function NailSVG({ className }: { className?: string }) {
  return (
    <svg className={className} width="10" height="42" viewBox="0 0 10 42" fill="currentColor">
      <rect x="0" y="0" width="10" height="5" rx="1.5" />
      <rect x="4" y="5" width="2" height="32" />
      <polygon points="4,37 6,37 5,42" />
    </svg>
  )
}

export default function NailDivider({
  count = 6,
  className = "",
}: {
  count?: number
  className?: string
}) {
  return (
    <div className={`flex items-end justify-center gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 20,
            delay: i * 0.055,
          }}
        >
          <NailSVG className="text-emerald-500" />
        </motion.div>
      ))}
    </div>
  )
}
