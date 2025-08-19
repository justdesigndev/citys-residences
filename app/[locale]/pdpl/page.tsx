import { LegalLayout } from "@/components/legal-layout"
import { Wrapper } from "@/components/wrapper"

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <LegalLayout>{children}</LegalLayout>
    </Wrapper>
  )
}
