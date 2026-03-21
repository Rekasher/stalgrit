"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { href: "/about-us", label: "О нас" },
    { href: "/contacts", label: "Контакты" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-md flex-shrink-0" />
          <span
            className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${
              scrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Стальгрит
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-emerald-500 ${
                scrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacts"
            className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
          >
            Заказать
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`sm:hidden p-2 transition-colors duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/60"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 font-medium py-2 hover:text-emerald-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacts"
                className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors text-center"
                onClick={() => setMenuOpen(false)}
              >
                Заказать
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
