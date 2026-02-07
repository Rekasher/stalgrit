"use client"

import { motion } from "framer-motion"
import Carousel3D from "@/components/Carousel/Carousel"
import {
  AboutUsInfo,
  Achievements,
  ProductionInfo,
  Certificates
} from "@/lib/about-us-mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutUsPage() {
  return (
    <main className="space-y-32 px-6 lg:px-20 py-16">
      {/* Hero */}
      <motion.section
        className="max-w-5xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold">{AboutUsInfo.Title}</h1>
        <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {AboutUsInfo.Description}
        </p>
        <p className="italic text-gray-600 text-lg">{AboutUsInfo.Mission}</p>
      </motion.section>

      {/* Наши достижения */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-8">Наши достижения</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {Achievements.map((item, i) => (
            <Card
              key={i}
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-xl transform hover:scale-105 transition-transform p-6"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Производственные мощности */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-8">Наше производство</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {ProductionInfo.map((item, i) => (
            <Card
              key={i}
              className="bg-white shadow-2xl hover:shadow-emerald-500/40 border border-gray-200 p-6 transform hover:-translate-y-2 transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Сертификаты */}
      <motion.section
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-8">Наши сертификаты</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {Certificates.map((cert, i) => (
            <Card
              key={i}
              className="bg-gray-50 border border-gray-200 p-4 shadow-md hover:shadow-lg transition-all text-center"
            >
              <CardTitle className="text-lg font-semibold mb-2">{cert.title}</CardTitle>
              <CardContent>
                <p className="text-gray-500">{cert.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Сотрудники */}
      <motion.section
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Наша дружная семья</h2>
        <Carousel3D />
      </motion.section>
    </main>
  )
}
