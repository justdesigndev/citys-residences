import { navigationConfig } from "@/lib/constants"

export default function Page() {
  return (
    <>
      <section className="relative w-full h-screen" id={navigationConfig["/project"]?.id}>
        <iframe
          src="https://www.lunas.pro/l-touch/web-version/london.html"
          className="w-full h-full border-0"
          allowFullScreen
        />
      </section>
    </>
  )
}
