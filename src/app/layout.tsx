import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header/Header"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: {
    template: "%s | Стальгрит",
    default: "Стальгрит — гвозди от производителя",
  },
  description:
    "ООО «Стальгрит» — белорусский производитель строительных и промышленных гвоздей. Оптовые поставки по России и СНГ. Прямые цены, ГОСТ-качество, быстрая доставка.",
  keywords: [
    "гвозди",
    "купить гвозди оптом",
    "гвозди от производителя",
    "строительные гвозди",
    "гвозди Беларусь",
    "метизы оптом",
    "Стальгрит",
    "гвозди Речица",
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
  "@type": "Organization",
  name: "ООО «Стальгрит»",
  url: "https://stalgrit.by",
  foundingDate: "2003",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Речица",
    addressCountry: "BY",
  },
  description:
    "Производитель строительных и промышленных гвоздей. Оптовые поставки по России и СНГ.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
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
