import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Контакты Стальгрит",
  description: "Контакты для заказов и обратной связи",
}

export default function AboutUsLayout({
                                        children,
                                      }: {
  children: ReactNode
}) {
  return (
    <div className="contacts-layout">
      {children}
    </div>
  )
}