import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import services from '../data/services'
import rashis from '../data/rashis'
import { site } from '../data/site'
import { BookingForm } from './BookingForm'

const img = (file: string, width: number) =>
  `/.netlify/images?url=/img/${file}&w=${width}&fm=webp`

export function HomePage() {
  const [serviceId, setServiceId] = useState(services[0].id)
  return (
    <main>
      <Hero />
      <Services onBook={setServiceId} />
      <RashiExplorer />
      <Steps />
      <About />
      <BookingForm serviceId={serviceId} onServiceChange={setServiceId} />
    </main>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-gold/15"
    >
      <img
        src={img('hero-cosmos.png', 1800)}
        srcSet={`${img('hero-cosmos.png', 900)} 900w, ${img('hero-cosmos.png', 1800)} 1800w`}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-90 max-md:opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-transparent" />
      <div className="mx-auto flex min-h-[82vh] max-w-7xl items-center px-5 py-24">
        <div className="max-w-xl">
          <p className="eyebrow rise">ज्योतिष · Jyotisha</p>
          <h1
            className="rise mt-5 text-5xl leading-[1.02] text-parchment sm:text-7xl"
            style={{ animationDelay: '120ms' }}
          >
            Your stars, read with{' '}
            <em className="font-medium text-gold">care and tradition.</em>
          </h1>
          <p
            className="rise mt-6 text-lg leading-relaxed text-parchment/75"
            style={{ animationDelay: '240ms' }}
          >
            {site.name} offers Vedic astrology consultations rooted in a
            lineage of Purohits — birth chart readings, marriage matching,
            auspicious muhurtha and gentle remedies, in{' '}
            {site.languages.join(', ')}.
          </p>
          <div
            className="rise mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: '360ms' }}
          >
            <a href="#booking" className="action">
              Book a consultation <span aria-hidden="true">→</span>
            </a>
            <a href="#services" className="action-ghost">
              Explore services
            </a>
          </div>
          <dl
            className="rise mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-gold/20 pt-6 text-sm"
            style={{ animationDelay: '480ms' }}
          >
            {[
              ['12', 'Rashis'],
              ['27', 'Nakshatras'],
              ['9', 'Grahas'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-4xl text-gold">
                    {value}
                  </span>
                  <span className="text-parchment/60">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Services({ onBook }: { onBook: (id: string) => void }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 px-5 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Consultations</p>
            <h2
              id="services-heading"
              className="mt-3 text-4xl text-parchment sm:text-5xl"
            >
              Guidance for every turning point.
            </h2>
          </div>
          <p className="text-parchment/65 md:justify-self-end md:text-right">
            Each reading is prepared from your own chart before we meet — never
            a generic forecast.
          </p>
        </div>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-gold/20 bg-gold/20 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.id}
              className="group relative flex flex-col bg-ink p-8 transition hover:bg-dusk"
            >
              <span
                aria-hidden="true"
                className="absolute right-6 top-4 font-display text-7xl text-gold/10 transition group-hover:text-gold/25"
              >
                {service.glyph}
              </span>
              <p className="font-display text-lg italic text-saffron">
                {service.sanskrit}
              </p>
              <h3 className="mt-1 text-3xl text-parchment">{service.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-parchment/65">
                {service.shortDescription}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold/70">
                {service.duration}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <a
                  href="#booking"
                  onClick={() => onBook(service.id)}
                  className="font-semibold text-gold underline-offset-4 hover:underline"
                >
                  Book {service.name.toLowerCase()}
                </a>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: service.id }}
                  className="text-parchment/60 underline underline-offset-4 hover:text-parchment"
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function RashiExplorer() {
  const [index, setIndex] = useState(0)
  const rashi = rashis[index]
  return (
    <section
      id="rashi"
      aria-labelledby="rashi-heading"
      className="scroll-mt-20 border-y border-gold/15 bg-ink/60 px-5 py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <div
            aria-hidden="true"
            className="slow-turn absolute inset-0 rounded-full border border-dashed border-gold/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[14%] rounded-full border border-gold/30"
          />
          <div className="absolute inset-[30%] grid place-items-center rounded-full bg-night/80 text-center shadow-[0_0_80px_-10px] shadow-gold/40">
            <div aria-live="polite">
              <span className="block font-display text-6xl text-gold">
                {rashi.glyph}
              </span>
              <span className="block font-display text-2xl text-parchment">
                {rashi.devanagari}
              </span>
            </div>
          </div>
          <div role="group" aria-label="Choose a Rashi">
            {rashis.map((item, i) => {
              const angle = (i / rashis.length) * 2 * Math.PI - Math.PI / 2
              const selected = i === index
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${item.name} (${item.western})`}
                  onClick={() => setIndex(i)}
                  style={{
                    left: `${50 + 43 * Math.cos(angle)}%`,
                    top: `${50 + 43 * Math.sin(angle)}%`,
                  }}
                  className={`absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-xl transition sm:size-14 sm:text-2xl ${
                    selected
                      ? 'scale-110 border-gold bg-gold text-night'
                      : 'border-gold/30 bg-night text-gold hover:border-gold hover:bg-dusk'
                  }`}
                >
                  {item.glyph}
                </button>
              )
            })}
          </div>
        </div>
        <div>
          <p className="eyebrow">The twelve Rashis</p>
          <h2
            id="rashi-heading"
            className="mt-3 text-4xl text-parchment sm:text-5xl"
          >
            Find your Moon sign.
          </h2>
          <p className="mt-4 text-parchment/65">
            In Vedic astrology your Rashi is the sign the Moon occupied at
            birth. Choose one on the wheel to learn its nature.
          </p>
          <article
            key={rashi.name}
            className="rise mt-10 rounded-3xl border border-gold/25 bg-night/60 p-8"
          >
            <h3 className="text-4xl text-gold">
              {rashi.name}{' '}
              <span className="text-2xl text-parchment/50">
                · {rashi.western}
              </span>
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-parchment/80">
              {rashi.nature}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-sm sm:grid-cols-4">
              {[
                ['Lord', rashi.lord],
                ['Tattva', rashi.element],
                ['Nature', rashi.quality],
                ['Sun transit', rashi.sunTransit],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="text-xs uppercase tracking-[0.2em] text-gold/70">
                    {term}
                  </dt>
                  <dd className="mt-1 text-parchment">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
          <p className="mt-6 text-sm text-parchment/50">
            Not sure of your Rashi? We calculate it from your birth details in
            every consultation.
          </p>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section aria-labelledby="steps-heading" className="px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="ornament mb-4 text-sm">
          <span className="eyebrow">How it works</span>
        </div>
        <h2
          id="steps-heading"
          className="text-center text-4xl text-parchment sm:text-5xl"
        >
          Three steps to your reading.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {site.steps.map((step, i) => (
            <li key={step.title} className="relative pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 font-display text-6xl leading-none text-gold/40"
              >
                {['१', '२', '३'][i]}
              </span>
              <h3 className="text-2xl text-parchment">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-parchment/65">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 px-5 py-12"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <figure className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -rotate-2 rounded-[2rem] border border-gold/30"
          />
          <img
            src={img('consultation.png', 900)}
            srcSet={`${img('consultation.png', 600)} 600w, ${img('consultation.png', 900)} 900w`}
            sizes="(min-width: 768px) 45vw, 100vw"
            alt="A traditional astrologer's desk with a hand-drawn horoscope chart, a brass oil lamp, rudraksha beads and palm-leaf manuscripts"
            loading="lazy"
            width={928}
            height={1152}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
        </figure>
        <div>
          <p className="eyebrow">About</p>
          <h2
            id="about-heading"
            className="mt-3 text-4xl text-parchment sm:text-5xl"
          >
            A family practice, carried forward.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-parchment/75">
            Consultations are given by {site.astrologer}, of the Salanki family
            of Purohits, where Jyotisha has been studied and practised
            alongside temple and household rituals.
          </p>
          <p className="mt-4 leading-relaxed text-parchment/65">
            Charts are cast by hand-checked calculation and read in the
            Parashari tradition. The aim is always clarity and peace of mind —
            not fear. Where remedies help, they are simple, affordable and
            explained.
          </p>
          <blockquote className="mt-10 border-l-2 border-saffron pl-6 font-display text-2xl italic text-gold-soft">
            “The planets indicate; they do not compel.”
          </blockquote>
        </div>
      </div>
    </section>
  )
}
