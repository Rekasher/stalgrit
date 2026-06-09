"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import StalGritLogo from "@/components/Logo/StalGritLogo"

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

  const accentLink = { href: "/nail-finder", label: "Подобрать" }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <StalGritLogo scrolled={scrolled} />

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 24, delay: 0.2 + i * 0.07 }}
            >
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-emerald-500 ${
                  scrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.33 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={accentLink.href}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                scrolled
                  ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  : "border-emerald-400/60 text-emerald-300 hover:border-emerald-400 hover:text-emerald-200"
              }`}
            >
              {accentLink.label}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.42 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/contacts"
              className="px-4 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
            >
              Заказать
            </Link>
          </motion.div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`sm:hidden p-2 transition-colors duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Меню"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sm:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/60"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 380, damping: 26 }}
                >
                  <Link
                    href={link.href}
                    className="block text-gray-800 font-medium py-2 hover:text-emerald-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/nail-finder"
                className="block text-emerald-500 font-medium py-2 hover:text-emerald-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Подобрать гвоздь
              </Link>
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
