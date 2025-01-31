import { ContactForm } from "@/components/form-contact"
import { Video } from "@/components/utility/video"
import { Wrapper } from "@/components/wrapper"

export default function Contact() {
  return (
    <Wrapper>
      <div className="grid grid-cols-2 px-8 py-20 pt-60">
        <div className="col-span-1 p-10 space-y-16 flex flex-col justify-center">
          <h1 className="text-bricky-brick text-2xl font-normal font-halenoir max-w-xl">
            Lütfen iletişim bilgilerinizi giriniz. Satış ekibimiz kısa süre içinde sizinle iletişime geçecektir.
          </h1>
          <ContactForm />
        </div>
        <div className="col-span-1 bg-slate-400">
          <Video
            primaryVideoUrl="https://player.vimeo.com/progressive_redirect/playback/1050026684/rendition/1080p/file.mp4?loc=external&log_user=0&signature=fda1ef0d723ecd6a77745792fc70643e9bc8e0cce3e4b8e3cf266d25613fb891"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Wrapper>
  )
}
