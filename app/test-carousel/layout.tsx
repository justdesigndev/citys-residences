import { GSAP } from "@/components/gsap"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        {children}
        <GSAP scrollTrigger={true} />
      </body>
    </html>
  )
}
