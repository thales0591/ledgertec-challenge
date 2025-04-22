import githubIcon from '../assets/githubIcon.png'
import whatsappIcon from '../assets/whatsappIcon.png'
import emailIcon from '../assets/emailIcon.png'

export function Footer() {
  return (
    <footer className="bg-[#60787e] h-8 flex justify-center items-center">
      <h3 className="font-medium">Candidato Thales Oliveira</h3>
      <a
        href="https://github.com/thales0591"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={githubIcon} alt="GitHub" className="h-5 ml-4" />
      </a>
      <a
        href="https://wa.me/5583999700025"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsappIcon} alt="GitHub" className="h-5 ml-4" />
      </a>
      <a
        href="mailto:thales0591@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={emailIcon} alt="GitHub" className="h-5 ml-4" />
      </a>
    </footer>
  )
}
