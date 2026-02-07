"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

interface EmployeeCardProps {
  src: string
  alt: string
  name: string
  job: string
  phone: string
  email: string
}

export default function EmployeeCard({ src, alt, name, job, phone, email }: EmployeeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <Card className="flex flex-col h-full bg-white shadow-2xl border border-gray-200 hover:scale-105 transition-transform">
  <div className="relative w-full h-56 sm:h-48">
  <Image src={src} alt={alt} fill className="object-cover rounded-t-xl" />
    </div>
    <CardContent className="flex flex-col mt-auto p-4">
  <CardHeader className="mb-2">
  <CardTitle className="text-lg font-bold">{name}</CardTitle>
    <CardDescription className="text-sm text-gray-500">{job}</CardDescription>
    </CardHeader>
    <div className="mt-2 text-gray-700 text-sm space-y-1">
    <p>Телефон: {phone}</p>
  <p>Email: {email}</p>
  </div>
  </CardContent>
  </Card>
  </motion.div>
)
}
