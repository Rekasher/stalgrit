"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Phone, Mail } from "lucide-react"

interface EmployeeCardProps {
  src: string
  alt: string
  name: string
  job: string
  phone: string
  email: string
  index?: number
}

// slight random-looking tilts per position
const rotations = [-2.2, 1.8, -1.4, 2.4, -1.8, 1.2]

export default function EmployeeCard({
  src, alt, name, job, phone, email, index = 0,
}: EmployeeCardProps) {
  const rot = rotations[index % rotations.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: -70, rotate: rot * 2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay: (index % 3) * 0.13,
      }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
      className="relative pt-6 cursor-default"
      style={{ transformOrigin: "top center" }}
    >
      {/* Nail pin */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 600, damping: 18, delay: (index % 3) * 0.13 + 0.15 }}
          className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-400 to-gray-700 border border-gray-500 shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
        />
        <div className="w-[2px] h-3 bg-gray-600" />
      </div>

      <Card className="flex flex-col h-full bg-white shadow-xl border border-gray-200 overflow-hidden">
        {/* Photo */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image src={src} alt={alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <CardContent className="flex flex-col p-5 gap-3">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-bold leading-tight">{name}</CardTitle>
            <CardDescription className="text-emerald-600 font-medium text-sm">{job}</CardDescription>
          </CardHeader>

          <div className="border-t border-gray-100 pt-3 space-y-2">
            <a
              href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Phone size={14} className="text-emerald-500 flex-shrink-0" />
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Mail size={14} className="text-emerald-500 flex-shrink-0" />
              {email}
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
