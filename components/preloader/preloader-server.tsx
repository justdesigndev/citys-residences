import { Img } from "@/components/utility/img"

export function PreloaderServer() {
  if (process.env.NODE_ENV !== "production") {
    return null
  }

  return (
    <div
      id="server-preloader"
      className="z-[var(--z-preloader)] fixed top-0 left-0 w-full h-full overflow-hidden bg-bricky-brick flex items-center justify-center pointer-events-none"
    >
      <div className="w-32 h-32 lg:w-80 lg:h-80">
        <Img
          src="/gif/citys-logo-animation.gif"
          alt="City's Residences Logo Animation"
          width={256}
          height={256}
          priority={true}
        />
      </div>
    </div>
  )
}
