import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header/Header"
import PageCurtain from "@/components/PageCurtain/PageCurtain"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s | Стальгрит",
    default: "Гвозди от производителя оптом — ООО «Стальгрит»",
  },
  description:
    "Купить гвозди оптом от белорусского производителя. Доставка по России, Беларуси и Казахстану. Строительные, кровельные, финишные гвозди ГОСТ. Прямые цены.",
  keywords: [
    "гвозди",
    "купить гвозди оптом",
    "гвозди от производителя",
    "строительные гвозди",
    "гвозди Беларусь",
    "метизы оптом",
    "Стальгрит",
    "гвозди Речица",
    "гвозди купить Москва",
    "гвозди оптом Россия",
    "гвозди Казахстан",
    "гвозди Алматы",
    "метизы оптом Москва",
    "строительные гвозди СНГ",
    "гвозди производитель",
    "гвозди ГОСТ",
    "оцинкованные гвозди",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://stalgrit.by",
    siteName: "Стальгрит",
    title: "Стальгрит — гвозди от производителя",
    description:
      "Белорусский производитель строительных и промышленных гвоздей. Оптовые поставки по России и СНГ.",
    images: [{ url: "https://stalgrit.by/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Стальгрит — гвозди от производителя",
    description:
      "Белорусский производитель строительных и промышленных гвоздей. Оптовые поставки по России и СНГ.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://stalgrit.by" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ManufacturingBusiness"],
  name: "ООО «Стальгрит»",
  url: "https://stalgrit.by",
  foundingDate: "2003",
  areaServed: ["BY", "RU", "KZ"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Речица",
    addressCountry: "BY",
  },
  description:
    "Производитель строительных и промышленных гвоздей. Оптовые поставки по России, Беларуси и Казахстану.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <PageCurtain />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
