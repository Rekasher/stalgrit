"use client"

import { employeeMockData } from "@/lib/employee-mock-data"
import EmployeeCard from "@/components/EmployeeCard/EmployeeCard"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <main className="px-6 lg:px-20 py-16 space-y-24">
      {/* Hero */}
      <motion.section
        className="max-w-4xl mx-auto text-center space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold">Контакты</h1>
        <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
          Свяжитесь с нами или узнайте больше о нашей дружной команде профессионалов.
        </p>
      </motion.section>

      {/* Employee Grid */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Наша команда</h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {employeeMockData.map((emp, i) => (
            <EmployeeCard key={i} {...emp} />
          ))}
        </div>
      </section>

      {/* Address Section */}
      <motion.section
        className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Наш адрес</h2>
        <p className="text-gray-700 mb-1">Общество с ограниченной ответственностью «Стальгрит»</p>
        <p className="text-gray-700 mb-1">247500, Республика Беларусь, Гомельская область</p>
        <p className="text-gray-700 mb-1">г. Речица, проезд Коммунальный, 12</p>
        <p className="text-gray-700 mb-1">Приемная: +375 (2340) 6-20-00, +375 (2340) 6-40-00</p>
        <p className="text-gray-700">Email: info@stalgrit.by</p>
      </motion.section>
    </main>
  )
}
