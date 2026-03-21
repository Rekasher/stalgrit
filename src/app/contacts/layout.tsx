import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с ООО «Стальгрит» для оптовых заказов гвоздей и метизов. Телефон, email, адрес завода в Речице, Беларусь.",
}

export default function ContactsLayout({ children }: { children: ReactNode }) {
  return <div className="contacts-layout">{children}</div>
}
