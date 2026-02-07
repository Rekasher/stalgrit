import type {Metadata} from "next"
import "./globals.css"
import Header from "@/components/Header/Header"
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Стальгрит",
  description: "Купить гвозди оптом и в розницу от производителя Стальгрит",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
    <body>
    <Header/>
    {children}
    </body>
    </html>
  )
}
