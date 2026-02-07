"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-md"></div>
          <span className="font-bold text-lg sm:text-xl text-gray-800">
            Стальгрит
          </span>
        </Link>
        <nav className="hidden sm:flex gap-6 text-gray-700">
          <Link href="/test" className="hover:text-emerald-600 transition">
            test
          </Link>
          <Link href="/about-us" className="hover:text-emerald-600 transition">
            О нас
          </Link>
          <Link href="/contacts" className="hover:text-emerald-600 transition">
            Контакты
          </Link>
        </nav>
      </div>
    </header>
  )
}
