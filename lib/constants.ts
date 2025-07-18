import { routing, type Locale, type Pathnames } from "@/i18n/routing"

export const baseUrl = "citysresidences.com"
export const initialScroll = true

export const countryPhoneCodes = {
  en: [
    { name: "Argentina", code: "+54" },
    { name: "Australia", code: "+61" },
    { name: "Bangladesh", code: "+880" },
    { name: "Brazil", code: "+55" },
    { name: "Canada", code: "+1" },
    { name: "China", code: "+86" },
    { name: "Egypt", code: "+20" },
    { name: "France", code: "+33" },
    { name: "Germany", code: "+49" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Italy", code: "+39" },
    { name: "Japan", code: "+81" },
    { name: "Malaysia", code: "+60" },
    { name: "Mexico", code: "+52" },
    { name: "Nigeria", code: "+234" },
    { name: "Pakistan", code: "+92" },
    { name: "Philippines", code: "+63" },
    { name: "Russia", code: "+7" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Singapore", code: "+65" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "Spain", code: "+34" },
    { name: "Thailand", code: "+66" },
    { name: "Turkey", code: "+90" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Vietnam", code: "+84" },
  ],
  tr: [
    { name: "Almanya", code: "+49" },
    { name: "Amerika Birleşik Devletleri", code: "+1" },
    { name: "Arjantin", code: "+54" },
    { name: "Avustralya", code: "+61" },
    { name: "Bangladeş", code: "+880" },
    { name: "Birleşik Arap Emirlikleri", code: "+971" },
    { name: "Birleşik Krallık", code: "+44" },
    { name: "Brezilya", code: "+55" },
    { name: "Çin", code: "+86" },
    { name: "Endonezya", code: "+62" },
    { name: "Filipinler", code: "+63" },
    { name: "Fransa", code: "+33" },
    { name: "Güney Afrika", code: "+27" },
    { name: "Güney Kore", code: "+82" },
    { name: "Hindistan", code: "+91" },
    { name: "İspanya", code: "+34" },
    { name: "İtalya", code: "+39" },
    { name: "Japonya", code: "+81" },
    { name: "Kanada", code: "+1" },
    { name: "Malezya", code: "+60" },
    { name: "Meksika", code: "+52" },
    { name: "Mısır", code: "+20" },
    { name: "Nijerya", code: "+234" },
    { name: "Pakistan", code: "+92" },
    { name: "Rusya", code: "+7" },
    { name: "Singapur", code: "+65" },
    { name: "Suudi Arabistan", code: "+966" },
    { name: "Tayland", code: "+66" },
    { name: "Türkiye", code: "+90" },
    { name: "Vietnam", code: "+84" },
  ],
}

export const muratKaderVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1076668374/rendition/1080p/file.mp4?loc=external&log_user=0&signature=9cb5431c29179de45c2a9528e203a341f2aa92b6c95641659f2de5e74791354f"

export const mainVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1096833227/rendition/1080p/file.mp4?loc=external&log_user=0&signature=e0ad4624c50728e0a3625c1c69c5f6a1459202f6b91fae8b5678201fd7181b5d"

export const kolajVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1069860586/rendition/1080p/file.mp4?loc=external&log_user=0&signature=93ffcc3ffcfe4a4ca2624cdbaef95fab5777741b7c5ab98d9e3f9bddf9f6062a"

export const locationVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1076654767/rendition/1080p/file.mp4?loc=external&log_user=0&signature=e051d94ef10aad5d5d1e207d6eb90156b96b1813ae50304a8b0cd0cf1d361fb9"

export const mustafaTonerVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1076668805/rendition/1080p/file.mp4?loc=external&log_user=0&signature=07ec8e59081ba6f5ddd518f08fb4101cbb62b5164e9eb3b299de7a4ab94afc4c"

export const melihBulgurVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1076669668/rendition/1080p/file.mp4?loc=external&log_user=0&signature=6c1df00cb3eb08578ce6ec9b08be5b2149abe995908dec33a8939cd2eff8506c"

export const pinarVeCemilAktasVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1076669307/rendition/1080p/file.mp4?loc=external&log_user=0&signature=7ae58e9ab6d78fb58ee636c7702acb47f7202f7f7a129974894b28abecc11ba6"

export const residencesVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1094341762/rendition/1080p/file.mp4?loc=external&log_user=0&signature=a1f5bd2a23cc5274e9f246ac320cd3995270f1e304eb92e6f1b2ed21c945ca9a"

export const citysLifeVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1094342078/rendition/1080p/file.mp4?loc=external&log_user=0&signature=378b7d6a3a88fb46dd4b7a5180b208ee90be202ad37d858d4f2124f65bc87d64"

export const citysParkVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1094342685/rendition/1080p/file.mp4?loc=external&log_user=0&signature=4fc9f6ec58c5d656752a416e12db6fc6705dd889f6df9d27acd0a829aa34dbaa"

export const membersClubVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1094342384/rendition/1080p/file.mp4?loc=external&log_user=0&signature=3fd50cf28bdac362b7bdb1ea7c44fd8b41fb25c521c03b9f693e388fabf59059"

export const citysIstanbulAvmVideo =
  "https://player.vimeo.com/progressive_redirect/playback/1090029618/rendition/1080p/file.mp4?loc=external&log_user=0&signature=f1d3f003fc9827566caaea65487458e20ce21ad51846208b95045b77f6875b34"

export const gsapGlobalClasses = {
  fadeIn: "gsap-global-fade-in",
}

export const sections = {
  citysMembersClub: {
    indoorSwimmingPool: {
      label: "Kapalı Yüzme Havuzu",
      id: "kapali-yuzme-havuzu",
    },
    macOne: {
      label: "MAC/One",
      id: "mac-one",
      subitems: {
        training: {
          label: "Antrenman",
          id: "antrenman",
        },
        changingRooms: {
          label: "Soyunma Odaları",
          id: "soyunma-odalari",
        },
        yoga: {
          label: "Yoga",
          id: "yoga",
        },
        pilates: {
          label: "Pilates",
          id: "pilates",
        },
        groupClasses: {
          label: "Grup Dersleri",
          id: "grup-dersleri",
        },
        sauna: {
          label: "Sauna",
          id: "sauna",
        },
      },
    },
    nuspa: {
      label: "Nuspa",
      id: "nuspa",
      subitems: {
        massage: {
          label: "Masaj",
          id: "masaj",
        },
        relaxation: {
          label: "Dinlenme",
          id: "dinlenme",
        },
        turkishBath: {
          label: "Hamam",
          id: "hamam",
        },
      },
    },
    dynamicZone: {
      label: "Dynamic Zone",
      id: "dynamic-zone",
      subitems: {
        padelTennis: {
          label: "Padel Tenis",
          id: "padel-tenis",
        },
        basketball: {
          label: "Basketbol",
          id: "basketbol",
        },
        tableTennis: {
          label: "Masa Tenisi",
          id: "masa-tenisi",
        },
        golfExperience: {
          label: "Golf Deneyimi",
          id: "golf-deneyimi",
        },
      },
    },
    cinema: {
      label: "Sinema",
      id: "sinema",
      subitems: {
        consoleGames: {
          label: "Konsol Oyunları",
          id: "konsol-oyunlari",
        },
        musicKaraoke: {
          label: "Müzik & Karaoke",
          id: "muzik-karaoke",
        },
        podcast: {
          label: "Podcast",
          id: "podcast",
        },
        meditation: {
          label: "Meditasyon",
          id: "meditasyon",
        },
      },
    },
    eventStudios: {
      label: "Etkinlik Stüdyoları",
      id: "etkinlik-studyolari",
    },
    kidsClub: {
      label: "Kids Club",
      id: "kids-club",
    },
    sharedOfficeSpaces: {
      label: "Paylaşımlı Ofis Alanları",
      id: "paylaşimli-ofis-alanlari",
      subitems: {
        rooms: {
          label: "Odalar",
          id: "odalar",
        },
        meetingRooms: {
          label: "Toplantı Odaları",
          id: "toplanti-odalari",
        },
      },
    },
    workshops: {
      label: "Atölyeler",
      id: "atolyeler",
      subitems: {
        cookingWorkshop: {
          label: "Yemek Atölyesi",
          id: "yemek-atolyesi",
        },
        artWorkshop: {
          label: "Sanat Atölyesi",
          id: "sanat-atolyesi",
        },
      },
    },
  },
}

// Navigation metadata for routes that should appear in navigation
// Keys MUST exist in routing.pathnames (type-safe!)
type NavigationMetadata = {
  titleKey: string
  id: string
  sectionsKey?: keyof typeof sections
  order: number
}

// Only define metadata for routes that should appear in navigation
const navigationConfig: Partial<Record<Pathnames, NavigationMetadata>> = {
  "/": {
    titleKey: "navigation.home",
    id: "home",
    order: 1,
  },
  "/project": {
    titleKey: "navigation.project",
    id: "project",
    order: 2,
  },
  "/location": {
    titleKey: "navigation.location",
    id: "location",
    order: 3,
  },
  "/residences": {
    titleKey: "navigation.residences",
    id: "residences",
    order: 4,
  },
  "/citys-park": {
    titleKey: "navigation.citysPark",
    id: "citysPark",
    order: 5,
  },
  "/citys-members-club": {
    titleKey: "navigation.citysMembersClub",
    id: "citysMembersClub",
    sectionsKey: "citysMembersClub",
    order: 6,
  },
  "/citys-life-privileges": {
    titleKey: "navigation.citysLifePrivileges",
    id: "citysLifePrivileges",
    order: 7,
  },
  "/citys-psm": {
    titleKey: "navigation.citysPsm",
    id: "citysPsm",
    order: 8,
  },
  "/citys-istanbul-avm": {
    titleKey: "navigation.citysIstanbul",
    id: "citysIstanbul",
    order: 9,
  },
  "/citys-times": {
    titleKey: "navigation.citysTimes",
    id: "citysTimes",
    order: 10,
  },
}

// Get routes that should appear in navigation
function getNavigationRoutes() {
  return Object.entries(navigationConfig)
    .filter(([, config]) => config !== undefined)
    .map(([routeKey, config]) => ({
      routeKey: routeKey as Pathnames,
      titleKey: config!.titleKey,
      id: config!.id,
      sectionsKey: config!.sectionsKey,
      order: config!.order,
    }))
    .sort((a, b) => a.order - b.order)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNavigationItems = (t: (key: any) => string, locale: Locale) =>
  getNavigationRoutes().map((item) => ({
    title: t(item.titleKey),
    href: getLocalizedPath(item.routeKey, locale),
    id: item.id,
    sections: item.sectionsKey ? sections[item.sectionsKey] : undefined,
  }))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNavigationItem = (id: string, t: (key: any) => string, locale: Locale) => {
  const item = getNavigationRoutes().find((navItem) => navItem.id === id)
  if (!item) return null

  return {
    title: t(item.titleKey),
    href: getLocalizedPath(item.routeKey, locale),
    id: item.id,
    sections: item.id ? sections[item.id as keyof typeof sections] : undefined,
  }
}

// Helper function to get localized path from routing configuration
function getLocalizedPath(routeKey: Pathnames, locale: Locale): string {
  const pathConfig = routing.pathnames[routeKey]

  if (typeof pathConfig === "string") {
    return pathConfig
  }

  return pathConfig[locale] || pathConfig[routing.defaultLocale]
}
