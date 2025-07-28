import { navigationConfig } from "@/lib/constants"

export default async function Page() {
  return (
    <div
      className="h-svh bg-bricky-brick relative text-white text-5xl z-10 overflow-hidden"
      id={navigationConfig["/citys-times"]?.id}
    >
      CITY&apos;S TIMES
    </div>
  )
}
