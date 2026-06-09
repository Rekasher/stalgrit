import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с ООО «Стальгрит» для оптовых заказов гвоздей и метизов. Доставка в Москву, Алматы, Минск и другие города. Телефон, email, адрес завода в Речице.",
  keywords: [
    "купить гвозди Москва",
    "гвозди оптом Минск",
    "гвозди Алматы заказ",
    "заказать гвозди Россия",
    "гвозди доставка СНГ",
    "метизы оптом контакты",
    "Стальгрит телефон",
  ],
}

export default function ContactsLayout({ children }: { children: ReactNode }) {
  return <div className="contacts-layout">{children}</div>
}
