"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CONTENT, ADVANTAGES, PRODUCTS } from "@/lib/main-mock-data"

export default function HomePage() {
  return (
    <main className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
            {CONTENT.HERO_TITLE}
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            {CONTENT.HERO_DESC}
          </p>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600"
          >
            Заказать гвозди
          </Button>
        </div>
      </motion.section>

      {/* Advantages */}
      <motion.section
        id="advantages"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
          {CONTENT.ADVANTAGES_TITLE}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Object.values(ADVANTAGES).map((desc, i) => (
            <Card key={i} className="shadow-lg p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {["От производителя", "Качество", "Оптовые цены", "Доставка"][i]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Products */}
      <motion.section
        id="products"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">
          {CONTENT.PRODUCTS_TITLE}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {Object.values(PRODUCTS).map((product, i) => (
            <Card
              key={i}
              className="hover:shadow-xl transition-shadow p-4 sm:p-6"
            >
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{product}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">
                  Прочные, надежные, доступны оптом и в розницу.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-emerald-50 py-12 sm:py-16 rounded-2xl text-center px-4 sm:px-6 lg:px-8 container mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          {CONTENT.CTA_TITLE}
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-gray-700 leading-relaxed">
          {CONTENT.CTA_DESC}
        </p>
        <Button
          size="lg"
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600"
        >
          Связаться с нами
        </Button>
      </motion.section>
    </main>
  )
}
