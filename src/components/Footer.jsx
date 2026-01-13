import { BsGithub } from "react-icons/bs"
import { IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5"
import { BiLogoGmail } from "react-icons/bi"

const socials = [
  { Icon: BiLogoGmail, href: "mailto:theavdeshjadon@gmail.com", label: "Email" },
  { Icon: IoLogoLinkedin, href: "https://linkedin.com/in/avdeshjadon", label: "LinkedIn" },
  { Icon: IoLogoTwitter, href: "https://x.com/AvdeshJado26477", label: "Twitter" },
  { Icon: BsGithub, href: "https://github.com/avdeshjadon", label: "GitHub" },
]

export default function Footer() {
  return (
    <footer className="bg-white mt-16 border-t border-black px-5 lg:px-28">
      <div className="py-10 lg:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-medium text-black">Avdesh <span className="text-[#71717A]">Jadon</span></h3>
          <p className="mt-2 text-[#71717A] text-sm font-light">Software Developer</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="bg-white p-2 rounded border border-black hover:bg-black hover:text-white transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-xs font-light text-[#71717A]">© {new Date().getFullYear()} Avdesh Jadon</p>
        </div>
      </div>
    </footer>
  )
}
