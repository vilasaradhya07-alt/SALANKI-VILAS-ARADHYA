import { Link } from '@tanstack/react-router'
import { site } from '../data/site'

const nav = [
  { href: '/#services', label: 'Services' },
  { href: '/#rashi', label: 'Rashis' },
  { href: '/#about', label: 'About' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-night/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full border border-gold/60 font-display text-xl text-gold transition group-hover:rotate-45"
          >
            ✶
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold text-parchment">
              {site.name}
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-gold/80">
              {site.tagline}
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-sm text-parchment/75 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#booking" className="action !px-5 !py-2 text-sm">
            Book a reading
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-night/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-parchment">{site.name}</p>
          <p className="mt-2 text-sm text-parchment/60">{site.description}</p>
        </div>
        <div className="text-sm text-parchment/70">
          <p className="eyebrow mb-3">Consultations</p>
          <p>{site.consultationModes.join(' · ')}</p>
          <p className="mt-1">In {site.languages.join(', ')}</p>
        </div>
        <div className="text-sm text-parchment/70">
          <p className="eyebrow mb-3">A note</p>
          <p>
            Jyotisha offers guidance and perspective. It is not a substitute
            for medical, legal or financial advice.
          </p>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-parchment/40">
        © {new Date().getFullYear()} {site.name}. ॐ तत् सत्
      </p>
    </footer>
  )
}
