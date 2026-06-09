"use client"

import { motion } from "framer-motion"

export default function PageCurtain() {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-950 z-[100] origin-top pointer-events-none"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.0, ease: [0.87, 0, 0.13, 1], delay: 0.05 }}
    />
  )
}
