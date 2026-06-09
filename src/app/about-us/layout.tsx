import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "О компании",
  description:
    "20+ лет на рынке. ООО «Стальгрит» — производитель гвоздей и метизов из Беларуси. Узнайте о нашей истории, достижениях и производственных мощностях.",
  keywords: [
    "производитель гвоздей Беларусь",
    "гвозди оптом завод",
    "метизы производство",
    "Стальгрит о компании",
    "гвозди ГОСТ производитель",
    "завод метизов СНГ",
    "гвозди Россия производитель",
    "гвозди Казахстан завод",
  ],
}

export default function AboutUsLayout({ children }: { children: ReactNode }) {
  return <div className="about-us-layout">{children}</div>
}
