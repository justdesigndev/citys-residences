import { Wrapper } from '@/components/wrapper'

import HomePage from '@/components/sections/home'
import ProjectSection from '@/components/sections/project'
import ResidencesSection from '@/components/sections/residences'

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Wrapper>
      <HomePage params={params} />
      <ProjectSection params={params} />
      <ResidencesSection params={params} />
    </Wrapper>
  )
}
