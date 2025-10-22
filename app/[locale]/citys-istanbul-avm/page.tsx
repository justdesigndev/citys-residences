import { AvmBrandsContainer } from '@/components/avm-brands-container'
import { getBrandsData } from '@/lib/api/server-actions'

export default async function Page() {
  const brands = await getBrandsData()

  return (
    <>
      <section className='section-container py-16 lg:py-24'>
        <AvmBrandsContainer initialBrands={brands.items || []} />
      </section>
    </>
  )
}
