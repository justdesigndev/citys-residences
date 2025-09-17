import "@/styles/globals.css"

import { GSAP } from "@/components/gsap"
import localFont from "next/font/local"

const suisseIntl = localFont({
  src: [
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Book.woff2",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/suisse-intl/SuisseIntl-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-suisse-intl",
})

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className={`${suisseIntl.variable} antialiased`}>
        {children}
        <GSAP scrollTrigger={true} />
      </body>
    </html>
  )
}
