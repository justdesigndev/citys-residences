import { cn } from "@/lib/utils"

import { ScaleOut } from "@/components/animations/scale-out"
import { GsapSplitText } from "@/components/gsap-split-text"
import { IconCitysMembersClubLogo } from "@/components/icons"
import { LinkToPage } from "@/components/link-to-page"
import { LogoSection } from "@/components/logo-section"
import { MembersClubItem } from "@/components/members-club-item"
import { SectionsMenuInitializer } from "@/components/sections-menu-initializer"
import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"
import { gsapGlobalClasses, membersClubVideo, sections } from "@/lib/constants"

export default function Page() {
  const items = [
    {
      title: "Kapalı Yüzme Havuzu",
      subtitle: "Her mevsim kendi ritminde",
      description: `
        <p>Dört mevsim sıcak, dört mevsim hazır. <br /> Bazen sabah erken, bazen günün tam ortasında... <br /> Kulaçlar atılır, yükler hafifler.</p>
        <p>Yüzmek bir egzersiz değil, günün telaşından kendini nazikçe ayırmaktır... <br /> Yaşamak için bazen sadece bir kulaç yeter.</p>
        <p>Zihin durulur, adım adım geride kalır dünya.</p>
      `,
      url: ["/img/citys-members-club/01.jpg"],
      sectionId: sections.citysMembersClub.indoorSwimmingPool.id,
    },
    {
      title: "Spor & Spa <br /> Resepsiyon",
      subtitle: "Şimdi senin zamanın",
      description: `
        <p>Bireysel antrenmanlardan grup derslerine kendi sınırlarını zorladığın yerdesin.</p>
        <p>Hangi antrenmanı tercih edersin, bugün ruh halin nasıl, yüzmek mi iyi gelir, yoksa biraz sessizlik mi?</p>
        <p>Sen anlatmasan da hisseden birileri vardır. Her şey bir bakışla anlaşılır.</p>
        <p>Programın, ihtiyaçların, o günkü enerjin...</p>
      `,
      url: ["/img/citys-members-club/02.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.sportAndSpaReception.id,
    },
    {
      title: "Soyunma Odaları",
      subtitle: "Konforun ve hijyenin yeni tanımı",
      description: `
        <p>Her şey rahatlığın için tasarlandı.</p>
        <p>Her köşe işlevsel ama bir o kadar da zarif; <br /> havludan dolaba, aynadan oturma alanına kadar tüm detaylar özenli...</p>
        <p>Sadelik burada şıklığın temel parçası. Hijyen ise olağanüstü olduğunu ilk anda hissedeceğin kadar kusursuz.</p>
        <p>Samimi, rafine, her şey yerli yerinde.</p>
      `,
      url: ["/img/citys-members-club/03.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.changingRooms.id,
    },
    {
      title: "Gym",
      subtitle: "Kendinin en iyi versiyonuna ulaş",
      description: `
        <p>MAC/One deneyimi ile özenle tasarlanmış gym alanları ve stüdyolarda; <br /> her şey, sadece bedenini değil ruhunu da güçlendirmek için...</p>
        <p>İster birebir antrenmanla kendi sınırlarını zorla, ister grup derslerinde yüksek motive ol...</p>
        <p>Özel ekipmanlarla gelişmiş antrenman alanlarında tempoyu yakala.</p>
        <p>Yenilen, daha iyi hisset, daha çok yaşa.</p>

      `,
      url: ["/img/citys-members-club/04.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.yoga.id,
    },
    {
      title: "Stüdyolar",
      subtitle: "Antrenman gibi değil, eğlence gibi",
      description: `
        <p>Kimi zaman enerjinin birlikte yükseldiği bir sosyal alan, kimi zaman kendi bedenini ve ritmini dinleyebileceğin sakin bir durak... <br /> MAC/One Stüdyoları, ruh haline göre şekillenen esnek bir deneyim.</p>
        <p>HIIT, Zumba, Core, Cycling, Dans, Esneme ve daha niceleri... <br /> Her birinde hareketin neşesiyle buluş...</p>
        <p>Ritimle coş, kendin ol; her seferinde kendini daha iyi, daha canlı, daha sen gibi hisset...</p>
      `,
      url: ["/img/citys-members-club/05.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.studios.id,
    },
    {
      title: "Yoga Stüdyosu",
      subtitle: "Dinginlik için ayrılmış bir alan",
      description: `
        <p>Nefesin ve hareketin uyumuna zemin hazırlayan yoga stüdyosu ile kendinize iyi gelecek bir yolculuğa davetlisiniz.</p>
      `,
      url: ["/img/citys-members-club/06.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.yoga.id,
    },
    {
      title: "Pilates Stüdyosu",
      subtitle: "Her duruşun bir çizgisi, her çizginin bir dengesi var",
      description: `
        <p>Pilates Stüdyosu, her hareketin merkezinde dengeyi arar.</p>
        <p>Alan, akışa eşlik eden ışık ve dinginlikle kendi ritmini kurar. Her seans, hareketle mekân arasında kurulan sessiz bir uyumdan doğar.</p>
      `,
      url: ["/img/citys-members-club/07.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.pilates.id,
    },
    {
      title: "Duşlar",
      subtitle: "Konfor detaylarda gizlidir",
      description: `
        <p>Her ayrıntısıyla özenle tasarlanmış bu alan, antrenman yorgunluğunuzu ödüllendirdiğiniz ve kendinize döndüğünüz bir mekan sunar.</p>
      `,
      url: ["/img/citys-members-club/08.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.dryShowers.id,
    },

    {
      title: "Sauna",
      subtitle: "Sıcaklığın içsel bir dengeye dönüştüğü alan",
      description: `
        <p>Doğal dokularla şekillenen zarif bir denge içinde tasarlanan saunada, sadece bedeninizi değil zihninizi de arındırın.</p>
      `,
      url: ["/img/citys-members-club/09.jpg"],
      sectionId: sections.citysMembersClub.macOne.subitems.sauna.id,
    },
    {
      title: "Spa & Wellness <br /> Resepsiyon",
      subtitle: "Şimdi sadece kendinlesin...",
      description: `
        <p>Sauna, buhar odası ve masaj alanlarını içeren wellness bölümü hem bedeninizi hem de zihninizi rahatlatmak için kusursuz kurgulandı.</p>
      `,
      url: ["/img/citys-members-club/10.jpg"],
      sectionId: sections.citysMembersClub.nuspa.subitems.spaWellness.id,
    },
    {
      title: "Masaj",
      subtitle: "Her şey sen rahatla diye...",
      description: `
        <p>Bazen bedenin anlatır içindeki yorgunluğu... <br /> İşte o an geldiğinde “NUSPA” masaj odalarında her şey sana göre odaklanır.</p>
        <p>Aromatik yağlardan ruhuna iyi gelenleri seç, sadece gevşe, hafifle, hünerli ellere teslim ol. Bazen her şey bir dokunuşla değişir...</p>
        <p>Müziğin derinden gelen sesi sana yük olan her şeyi yavaşça bırakır, sanki yeniden doğarsın...</p>
        <p>Bedenin gevşer, ruhun hafifler.</p>
      `,
      url: ["/img/citys-members-club/11.jpg"],
      sectionId: sections.citysMembersClub.nuspa.subitems.massage.id,
    },
    {
      title: "Dinlenme",
      subtitle: "Burada dinlenmek bir yaşam biçimi",
      description: `
        <p>Zihninizin arındığı, bedeninizin yenilendiği alanlar; <br /> City's Members Club seçkin yaşam tasarımının ayrılmaz bir parçası.</p>
        <p>Enerjinize ve ruhunuza eşlik eden bir deneyim, sakinliğin yeni dengesi...</p>
      `,
      url: ["/img/citys-members-club/12.jpg"],
      sectionId: sections.citysMembersClub.nuspa.subitems.relaxation.id,
    },
    {
      title: "Hamam",
      subtitle: "Zamansız bir ritüelin yeniden tasarımı",
      description: `
        <p>Yüzyıllardır süregelen Türk tarihine özel geleneksel bakım ritüellerini Citys’in modern yorumuyla yaşayın.</p>
        <p>Su, buhar ve sessizlikle bedenin hafifliğini hissedin. Burada zihniniz arınır, yenilenir ve yeniden doğarsınız.</p> 
      `,
      url: ["/img/citys-members-club/13.jpg"],
      sectionId: sections.citysMembersClub.nuspa.subitems.turkishBath.id,
    },
    {
      title: "Padel Tenis",
      subtitle: "Yeni nesil sporun adresi",
      description: `
        <p>Dünyanın en hızlı yükselen ve en prestijli sporları arasına giren padel tenise siz de hayatınızda yer açın.</p>
        <p>Arkadaşlarınızla eğlenirken hem forma girin hem de rekabetin keyfini stil sahibi bir atmosferde yaşayın.</p>
        <p>Padel tenis ile enerjiniz tazelensin.</p>
      `,
      url: ["/img/citys-members-club/14.jpg"],
      sectionId: sections.citysMembersClub.dynamicZone.subitems.padelTennis.id,
    },
    {
      title: "Basketbol",
      subtitle: "Sınırlar belli. Özgürlük sizin.",
      description: `
        <p>Bir pota, bir top ve siz.</p>
        <p>Dilerseniz bireysel antrenman, kimi zaman omuz omuza arkadaşlarınızla enerjik dostça bir rekabet.</p>
        <p>Enerjiniz her zaman parmaklarınızın ucunda.</p>
        <p>Her atış bir hedef. Her zıplayış bir özgürlük.</p>
      `,
      url: ["/img/citys-members-club/15.jpg"],
      sectionId: sections.citysMembersClub.dynamicZone.subitems.basketball.id,
    },
    {
      title: "Masa Tenisi",
      subtitle: "Kısa hamleler, kalıcı anlar",
      description: `
        <p>Top sekiyor, kahkahalar yayılıyor. İki raket, bir masa, sonsuz eğlence...</p>
        <p>Hareketin enerji ile buluştuğu, sohbetin oyuna dönüştüğü yer. Sadece bir oyun değil yaşamın en keyifli hali.</p>
      `,
      url: ["/img/citys-members-club/16.jpg"],
      sectionId: sections.citysMembersClub.dynamicZone.subitems.tableTennis.id,
    },
    {
      title: "Golf Deneyimi",
      subtitle: "Golf size hiç bu kadar yakın olmamıştı",
      description: `
        <p>Doğanın huzuru, sporun zerafeti ve odaklanmanın gücü artık sizinle birlikte.</p>
        <p>Golf deneyimi için kısa bir mola tüm gününüzü değiştirebilir. ister kendi başınıza sakin bir antrenman ister arkadaşlarınızla keyifli bir vuruş keyfi.</p>
        <p>Yeşilin ritmini sadece birkaç adımda keşfedin.</p>
      `,
      url: ["/img/citys-members-club/17.jpg"],
      sectionId: sections.citysMembersClub.dynamicZone.subitems.golfExperience.id,
    },
    {
      title: "Sinema Salonu",
      subtitle: "Sadece size özel CineWAM ayrıcalığıyla",
      description: `
        <p>En yeni filmler, sevdiğiniz diziler, büyük maçlar...</p>
        <p>Bir sinema perdesi düşünün ışıklar sönüyor ama bu kez sadece sizin için.</p>
        <p>İster vizyondaki filmi tek başınıza izleyin ister sevdiklerinizle özel bir seans düzenleyin.</p>
        <p>City’s Members Club sinema deneyimi özel tasarlanmış konsepti ile çok farklı.</p>
      `,
      url: ["/img/citys-members-club/18.jpg"],
      sectionId: sections.citysMembersClub.cinema.id,
    },
    {
      title: "PlayStation Odası",
      subtitle: "Rakibini getir ya da takımını kur",
      description: `
        <p>Sadece eğlenmek için değil rekabet etmek ve paylaşmak için tasarlandı.</p>
        <p>İster birebir mücadele ister arkadaş grubuyla co-op keyfi... Turnuva modları, özel etkinlikler ve randevulu kullanım.</p>
        <p>Burada her oyun bir anıya, her karşılaşma yeni bir hikayeye dönüşür.</p>
      `,
      url: ["/img/citys-members-club/19.jpg"],
      sectionId: sections.citysMembersClub.eventStudios.subitems.playstation.id,
    },
    {
      title: "Müzik & Karaoke",
      subtitle: "Kendinizi duymakla kalmayın. Duyurun.",
      description: `
        <p>İyi bir müzik eşliğinde sesini özgür bırak.</p>
        <p>Dostlarını getir müziğini paylaş. Kayıt yap. Mikrofona değil, kendine yaklaş.</p>
        <p>Eğlence özgürlük tek odada. Burası sadece müzik odası değil, kendin olma alanı.</p>
        <p>Bu stüdyo hayatın ritmini ciddiye alan herkes için tasarlandı.</p>
      `,
      url: ["/img/citys-members-club/20.jpg"],
      sectionId: sections.citysMembersClub.eventStudios.subitems.musicKaraoke.id,
    },
    {
      title: "Podcast",
      subtitle: "Kayıt burada, etki her yerde",
      description: `
        <p>Bu stüdyo anlatmanın gücünü anlayan herkes için...</p>
        <p>Kayıt tuşuna basman yeterli. Senin sesin ve görüntün ile düşün, anlat, kaydet, iz bırak, dünyaya yayıl.</p>
        <p>Profesyonel altyapısı size özel tasarlanmış ortamı ve yüksek kalitesi ile işlerinizi geliştirin, markanızı yaratın, geleceği yakalayın.</p>
      `,
      url: ["/img/citys-members-club/21.jpg"],
      sectionId: sections.citysMembersClub.eventStudios.subitems.podcast.id,
    },
    {
      title: "Meditasyon",
      subtitle: "Sessizliği Planladık",
      description: `
        <p>Günün kesintisiz temposu, dikkat dağınıklığı ve bitmeyen düşünce trafiği arasında City’s Members Club meditasyon odanız zihninize ayrılmış sakin bir durak.</p>
        <p>Zihin yavaşladığında, hayat yeniden başlar.</p>
        <p>Hiçbir şey yapmamak yapılabilecek en iyi şeydir.</p>
        <p>Durmak da bir akıştır.</p>
      `,
      url: ["/img/citys-members-club/22.jpg"],
      sectionId: sections.citysMembersClub.eventStudios.subitems.meditation.id,
    },
    {
      title: "Kids Club",
      subtitle: "Oyun, gelişimin en doğal hali",
      description: `
        <p>Oyun çocuk için sadece bir eğlence değil; öğrenmenin, gelişmenin ve dünyayı keşfetmenin ilk yolu...</p>
        <p>City’s Members Club’da iki ayrı katta iki ayrı yaş grubu için özel detaylar ile tasarlanan alanlarda sadece eğlence yok, güven var, özen var, pedagog eşliğinde yapılandırılmış bir öğrenme dünyası var.</p>
        <p>Rahat bir nefes sizin, güvenli ve heyecanlı bir dünya onların.</p>
      `,
      url: [
        "/img/citys-members-club/23.jpg",
        "/img/citys-members-club/24.jpg",
        "/img/citys-members-club/25.jpg",
        "/img/citys-members-club/26.jpg",
        "/img/citys-members-club/27.jpg",
      ],
      sectionId: sections.citysMembersClub.kidsClub.id,
    },
    {
      title: "Esnek Çalışma",
      subtitle: "Farklı çalış, birlikte üret",
      description: `
        <p>Muhtelif büyüklüklerdeki toplantı odalarında kısa online toplantılar veya uzun soluklu ekip toplantılarına kadar tüm ihtiyaçlarınız ile uyumlu alanlar.</p>
        <p>Çalıştığın alan tasarlanmış bir yaşam tarzı.</p>
        <p>İş değil, üretim. Ofis değil, ekosistem. Aç bilgisayarı. Kapat şehrin gürültüsünü. Kendi ritmini bul.</p>
        <p>Çünkü çalışmak masa değil ortam meselesi.</p>
        <p>Ev gibi değil, daha iyi.</p>
      `,
      url: ["/img/citys-members-club/28.jpg"],
      sectionId: sections.citysMembersClub.sharedOfficeSpaces.subitems.meetingRooms.id,
    },
    {
      title: "Toplantı Odaları",
      subtitle: "Bir toplantı değil, bir etkinin başlangıcı",
      description: `
        <p>Fikirlerin sınırları aştığı alanlar. Burada fikirler konuşmaz, birbiriyle dans eder.</p>
        <p>City’s Members Club tasarımıyla farklılaşan sıra dışı toplantılar, birlikte üretmenin en ideal hali.</p>
        <p>Olağanüstü fikirler ilham veren ortamlar ister. Burası bir toplantı değil, iz bırakma alanı.</p>
        <p>Stratejik kararlarını, mutlulukla sonuçlanan bir başarı hikayesine dönüştür.</p>
      `,
      url: ["/img/citys-members-club/29.jpg"],
      sectionId: sections.citysMembersClub.sharedOfficeSpaces.subitems.meetingRooms.id,
    },
    {
      title: "Yemek Atölyesi",
      subtitle: "Lezzet paylaşılırsa çoğalır",
      description: `
          <p>Kahve ve taze ekmeğin rahatlatıcı kokusu, tutkulu, keyifli ve heyecanlı sohbetlerle birleşiyor.</p>
          <p>Mutfak sever çocuk ve yetişkinler için özel hazırlanmış birçok yemek atölyesinden birisi mutlaka sizin için.</p>
          <p>Her tarif birlikte olmanın en lezzetli hali...</p>
        `,
      url: ["/img/citys-members-club/30.jpg"],
      sectionId: sections.citysMembersClub.workshops.subitems.cookingWorkshop.id,
    },
    {
      title: "Sanat Atölyesi",
      subtitle: "İlham için yer ayırdık",
      description: `
          <p>Kimi renklerle düşünür, kimi dokunarak anlatır. Biz bu farklı anlatım biçimlerine, bu eşsiz iç dünyalara alan açtık.</p>
          <p>Burası sadece bir atölye değil fırçadan tuvale, hamurdan seramiğe, sanattan hayallere uzanan bir özgürlük alanı...</p>
          <p>Çocukların hayal kurduğu, yetişkinlerin ise duygularına ses verdiği, kendi iç seslerini duyabildiği bir ayrıcalık.</p>
          <p>Hayal eden çocuklar dünyayı değiştirebilir... Kendini ifade eden yetişkinler daha mutlu yaşar. İzin verin yaşam kendi rengini bulsun.</p>
        `,
      url: ["/img/citys-members-club/31.jpg"],
      sectionId: sections.citysMembersClub.workshops.subitems.artWorkshop.id,
    },
  ]

  return (
    <Wrapper>
      <SectionsMenuInitializer sections={Object.values(sections.citysMembersClub)} />
      <section className="h-svh bg-bricky-brick relative z-10 overflow-hidden">
        <ScaleOut>
          <Video
            primaryVideoUrl={membersClubVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </ScaleOut>
      </section>
      <section className="relative z-20 bg-minor-blue">
        <LogoSection foregroundLogo={<IconCitysMembersClubLogo fill="#000000" />} foregroundDuration={0.5} />
        <div className="flex flex-col items-center justify-center pb-24">
          <div className={cn("relative w-[35vw] h-[35vw] mb-12", gsapGlobalClasses.fadeIn)}>
            <Img src="/img/members-cat.png" alt="City's Members Club" fill className="object-contain" />
          </div>
          <h2
            id="masaj"
            className="font-primary font-medium text-black text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl xl:leading-normal 2xl:leading-tight xl:max-w-4xl 2xl:max-w-6xl text-center"
          >
            <GsapSplitText stagger={0.2} splitBy="lines" duration={1}>
              Yaşam yeniden tasarlandı: CITY’S
            </GsapSplitText>
          </h2>
        </div>
      </section>
      <section className="bg-white z-30">
        {items.map((item, i) => (
          <MembersClubItem
            key={i}
            item={item}
            align={i % 2 === 0 ? "ltr" : "rtl"}
            className={i % 2 === 0 ? "bg-white" : "bg-unbleached"}
            sectionId={item.sectionId as string}
          />
        ))}
      </section>
      <LinkToPage
        previous={{ title: "City's Park", href: "/citys-park" }}
        next={{ title: "City's Life Ayrıcalıkları", href: "/citys-life-privileges" }}
      />
    </Wrapper>
  )
}
