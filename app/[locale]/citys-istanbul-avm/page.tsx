import { ScaleOut } from "@/components/animations/scale-out"
import { IconCitysIstanbulLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { getBrandsData } from "@/lib/api/queries"
import { citysIstanbulAvmVideo } from "@/lib/constants"
import { toTitleCase } from "@/lib/utils"
import { FilterableContent } from "./filterable-content"
import { GsapSplitText } from "@/components/gsap-split-text"
import { AnimatedLine } from "@/components/animated-line"

export default async function Page() {
  const brands = await getBrandsData()

  // Helper function to group brands by subcategory
  const groupBySubCategory = (brandsInCategory: typeof brands.items) => {
    return brandsInCategory.reduce((acc, brand) => {
      const subCat = brand.subCategory || "other"
      if (!acc[subCat]) {
        acc[subCat] = []
      }
      acc[subCat].push(brand)
      return acc
    }, {} as Record<string, typeof brandsInCategory>)
  }

  // Filter brands by category
  const shoppingBrands = brands.items?.filter((brand) => brand.category === "alisveris" && brand.subCategory) || []
  const diningBrands = brands.items?.filter((brand) => brand.category === "yemeIcme") || []
  const serviceBrands = brands.items?.filter((brand) => brand.category === "hizmet") || []

  // Group each category by subcategory
  const shoppingBySubCategory = groupBySubCategory(shoppingBrands)
  const diningBySubCategory = groupBySubCategory(diningBrands)
  const servicesBySubCategory = groupBySubCategory(serviceBrands)

  // Create data structures for each category
  const alisveris = {
    title: brands.categories?.alisveris || "Alışveriş",
    items: Object.entries(shoppingBySubCategory).map(([subCategoryKey, brandsInCategory]) => ({
      title: toTitleCase(brands.subCategories?.[subCategoryKey] || subCategoryKey),
      logos: brandsInCategory.map((brand) => ({
        url: brand.logo,
      })),
    })),
    images: Array.from({ length: Object.keys(shoppingBySubCategory).length }, (_, index) => ({
      url: `/img/citys-istanbul-avm/slide-${(index % 2) + 1}.jpg`,
    })),
  }

  const yemeIcme = {
    title: brands.categories?.yemeIcme || "Yeme & İçme",
    items: Object.entries(diningBySubCategory).map(([subCategoryKey, brandsInCategory]) => ({
      title:
        subCategoryKey === "other" ? "Diğer" : toTitleCase(brands.subCategories?.[subCategoryKey] || subCategoryKey),
      logos: brandsInCategory.map((brand) => ({
        url: brand.logo,
      })),
    })),
    images: Array.from({ length: Object.keys(diningBySubCategory).length }, (_, index) => ({
      url: `/img/citys-istanbul-avm/slide-${(index % 2) + 1}.jpg`,
    })),
  }

  const hizmetler = {
    title: brands.categories?.hizmet || "Hizmetler",
    items: Object.entries(servicesBySubCategory).map(([subCategoryKey, brandsInCategory]) => ({
      title:
        subCategoryKey === "other"
          ? "Diğer Hizmetler"
          : toTitleCase(brands.subCategories?.[subCategoryKey] || subCategoryKey),
      logos: brandsInCategory.map((brand) => ({
        url: brand.logo,
      })),
    })),
    images: Array.from({ length: Object.keys(servicesBySubCategory).length }, (_, index) => ({
      url: `/img/citys-istanbul-avm/slide-${(index % 2) + 1}.jpg`,
    })),
  }

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values([])} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={citysIstanbulAvmVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30">
            <div className="flex flex-col h-full py-8 md:py-8 section-container">
              <h1 className="max-w-lg block font-primary leading-snug text-white text-2xl md:text-4xl xl:text-2xl font-medium mt-auto mb-2 lg:mb-4">
                {/* <GsapSplitText splitBy="lines" stagger={0.5} duration={1}> */}
                ŞEHİR HAYATI BİR ASANSÖR UZAKLIKTA
                {/* </GsapSplitText> */}
              </h1>
              <p className="max-w-lg block font-primary leading-snug text-white text-base md:text-lg font-normal mb-0 lg:mb-20">
                {/* <GsapSplitText splitBy="lines" stagger={0.5} duration={1}> */}
                City&#39;s Residences sakinleri için alışveriş, yeme-içme ve günlük ihtiyaçlar, şehrin merkezinde ama ev
                rahatlığında. AVM hayatı, yaşam kurgusunun doğal bir parçası.
                {/* </GsapSplitText> */}
              </p>
            </div>
          </div>
        </ScaleOut>
      </section>
      <section className="relative z-30 bg-white py-5 flex flex-col items-center">
        <LogoSection foregroundLogo={<IconCitysIstanbulLogo fill="#000000" />} foregroundDuration={0.5} />
        <h2 className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl xl:leading-normal 2xl:leading-snug xl:max-w-4xl 2xl:max-w-6xl text-center">
          <GsapSplitText stagger={0.2} splitBy="lines" duration={1.5}>
            Alışverişin, yaşamın ve şehrin ritminin tek bir çatı altında buluştuğu yer. <br />
            Uluslararası seçkin markalara ulaşmak, yeni bir lezzet keşfetmek ya da <br />
            günün yorgunluğunu ilham veren bir atmosferde atmak... <br />
            Tüm bu ayrıcalıklar, yaşadığınız yerden sadece bir asansör uzaklıkta.
          </GsapSplitText>
        </h2>
        <div className="section-container py-24">
          <FilterableContent brands={brands.items || []} />
        </div>
      </section>
      <AnimatedLine direction="horizontal" />
      <LinkToPage
        previous={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
        next={{ title: "Anasayfa", href: "/" }}
      />
    </Wrapper>
  )
}
