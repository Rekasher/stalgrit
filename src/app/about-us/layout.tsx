import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "О компании Стальгрит",
  description: "Наша дружная семья",
}

export default function AboutUsLayout({
                                        children,
                                      }: {
  children: ReactNode
}) {
  return (
    <div className="about-us-layout">
      {children}
    </div>
  )
}