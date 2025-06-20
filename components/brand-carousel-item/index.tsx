import { Img } from "@/components/utility/img"

interface BrandCarouselItemProps {
  logo: string
  name: string
  className?: string
}

export function BrandCarouselItem({ logo, name, className }: BrandCarouselItemProps) {
  return (
    <div className="flex items-center justify-center px-4 lg:px-8">
      <div className="w-24 lg:w-32 h-20 lg:h-24">
        <Img
          src={logo}
          alt={name}
          className={`w-full h-full object-contain grayscale ${className || ""}`}
          height={400}
          width={400}
        />
      </div>
    </div>
  )
}
