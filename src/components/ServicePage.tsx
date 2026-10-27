import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import services, { type Service } from '../data/services'
import { BookingForm } from './BookingForm'

export function ServicePage({ service }: { service: Service }) {
  const [serviceId, setServiceId] = useState(service.id)
  const others = services.filter((item) => item.id !== service.id)
  return (
    <main>
      <section className="px-5 pb-8 pt-12">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            hash="services"
            className="text-sm text-parchment/60 underline underline-offset-4 hover:text-gold"
          >
            ← All consultations
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div className="rise">
              <p className="font-display text-2xl italic text-saffron">
                {service.sanskrit}
              </p>
              <h1 className="mt-2 text-5xl leading-tight text-parchment sm:text-7xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-parchment/75">
                {service.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#booking"
                  className="action"
                  onClick={() => setServiceId(service.id)}
                >
                  Book this consultation <span aria-hidden="true">→</span>
                </a>
                <span className="text-sm uppercase tracking-[0.2em] text-gold/70">
                  {service.duration}
                </span>
              </div>
            </div>
            <aside className="relative overflow-hidden rounded-3xl border border-gold/25 bg-ink p-8">
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-10 font-display text-[12rem] leading-none text-gold/10"
              >
                {service.glyph}
              </span>
              <h2 className="relative text-2xl text-gold">What’s included</h2>
              <ul className="relative mt-6 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-parchment/85">
                    <span aria-hidden="true" className="text-saffron">
                      ✶
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
      <BookingForm serviceId={serviceId} onServiceChange={setServiceId} />
      <section aria-labelledby="more-heading" className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 id="more-heading" className="text-3xl text-parchment">
            Other consultations
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: item.id }}
                  className="action-ghost !py-2 text-sm"
                >
                  <span aria-hidden="true">{item.glyph}</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
