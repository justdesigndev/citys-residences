import { navigationConfig } from "@/lib/constants"

export default async function Page() {
  return (
    <div
      className="h-svh bg-bricky-brick relative text-white text-5xl z-10 overflow-hidden flex items-center justify-center"
      id={navigationConfig["/citys-psm"]?.id}
    >
      CITY&apos;S PSM
    </div>
  )
}
