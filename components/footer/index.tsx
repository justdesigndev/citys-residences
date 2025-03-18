import Link from "next/link"
import { useTranslations } from "next-intl"

import { Logo } from "@/components/icons"

export function Footer() {
  const t = useTranslations("common")
  const footerItems = {
    contact: [
      {
        title: "City's Istanbul Satış Ofisi",
        items: ["İçerenköy, Çayır Cd No: 1,\n34752 Ataşehir/Istanbul", "info@citysresidences.com", "(0216) 225 50 00"],
      },
      {
        title: "City's Gallery",
        items: ["İçerenköy, Çayır Cd No: 1,\n34752 Ataşehir/Istanbul", "info@citysresidences.com", "(0216) 225 50 00"],
      },
    ],
    socialMedia: [{ title: "LinkedIn" }, { title: "Instagram" }, { title: "Youtube" }, { title: "X" }],
    menu: [
      { title: t("navigation.citysPark"), href: "#" },
      { title: t("navigation.citysClubHouse"), href: "#" },
      { title: t("navigation.location"), href: "#" },
      { title: t("navigation.dining"), href: "#" },
      { title: t("navigation.shopping"), href: "#" },
      { title: t("navigation.justworkCampus"), href: "#" },
      { title: t("navigation.performanceArtsCenter"), href: "#" },
      { title: t("navigation.citysClub"), href: "#" },
      { title: t("navigation.contact"), href: "#" },
    ],
    legal: [
      {
        title: t("kvkk"),
        href: "#",
      },
      {
        title: t("commercialElectronicMessage"),
        href: "#",
      },
      {
        title: t("explicitConsent"),
        href: "#",
      },
      {
        title: t("kvkRelatedInformation"),
        href: "#",
      },
      {
        title: t("cookiePolicy"),
        href: "#",
      },
    ],
  }

  return (
    <footer className="bg-bricky-brick text-white px-4 py-12 bd:py-14 bd:pb-8 font-halenoir">
      <div className="container flex flex-col">
        <div className="flex flex-col items-stretch bd:grid grid-cols-1 bd:grid-cols-24 gap-16 bt:gap-24 bd:gap-8 mb-12">
          {/* Logo Section */}
          <div className="bt:col-span-8 flex">
            <div className="mx-auto bt:mx-0 bt:mb-auto bt:mr-auto w-[200px] bd:w-[260px]">
              <Logo fill="var(--white)" />
            </div>
          </div>
          <div className="bt:col-span-16">
            {/* Top Section: Contact and Social Media */}
            <div className="bt:col-span-9 grid grid-cols-1 gap-10 bt:gap-0 bt:grid-cols-12">
              {/* Contact Section */}
              <div className="bt:col-span-8">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">{t("contact")}</h2>
                <div className="grid grid-cols-1 bt:grid-cols-2 gap-6 mr-12">
                  {footerItems.contact.map((office) => (
                    <div key={office.title} className="space-y-2">
                      <h3 className="text-sm font-medium">{office.title}</h3>
                      {office.items.map((item, index) => (
                        <p key={index} className="text-sm text-white whitespace-pre-line">
                          {item}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Social Media Section */}
              <div className="bt:col-span-4 bt:col-start-9">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">{t("socialMedia")}</h2>
                <div className="space-y-2">
                  {footerItems.socialMedia.map((item) => (
                    <Link
                      key={item.title}
                      href="#"
                      className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Bottom Section: Menu and Legal */}
            <div className="grid grid-cols-1 bt:grid-cols-12 gap-10 bt:gap-0 pt-8 mt-0 bd:mt-10">
              {/* Menu Section */}
              <div className="bt:col-span-8">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">{t("menu")}</h2>
                <div className="flex flex-col bt:grid grid-cols-2 gap-y-2 gap-x-6 mr-12">
                  {footerItems.menu.map((item, i) => (
                    <Link key={i} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Legal Section */}
              <div className="bt:col-span-4 bt:col-start-9">
                <h2 className="text-base font-normal mb-6 border-b border-grenadier pb-2">{t("legal")}</h2>
                <div className="space-y-2">
                  {footerItems.legal.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="block text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="flex flex-col bt:flex-row justify-between items-center gap-5 bd:gap-0 pt-5 border-t border-grenadier text-sm">
          <span>{t("copyright")}</span>
          <span>
            Made by{" "}
            <Link href="https://justdesignfx.com" target="_blank" rel="noopener noreferrer" className="underline">
              JUST DESIGN FX
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
