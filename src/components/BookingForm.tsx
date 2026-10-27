import { useEffect, useRef, useState, type FormEvent } from 'react'
import services from '../data/services'
import { bookingForm, site } from '../data/site'

type Submission =
  | { status: 'idle' | 'pending' | 'error' }
  | { status: 'success'; serviceName: string; name: string }

export function BookingForm({
  serviceId,
  onServiceChange,
}: {
  serviceId: string
  onServiceChange: (id: string) => void
}) {
  const [submission, setSubmission] = useState<Submission>({ status: 'idle' })
  const submitting = useRef(false)
  const service = services.find((item) => item.id === serviceId)

  useEffect(() => {
    if (!submitting.current) setSubmission({ status: 'idle' })
  }, [serviceId])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || submission.status === 'success' || !service)
      return
    const data = new FormData(event.currentTarget)
    const body = new URLSearchParams()
    data.forEach((value, key) => body.append(key, String(value)))
    submitting.current = true
    setSubmission({ status: 'pending' })
    try {
      const response = await fetch(bookingForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Booking was not accepted')
      setSubmission({
        status: 'success',
        serviceName: service.name,
        name: String(data.get('name')).trim().split(/\s+/)[0],
      })
    } catch {
      setSubmission({ status: 'error' })
    } finally {
      submitting.current = false
    }
  }

  const locked =
    submission.status === 'pending' || submission.status === 'success'

  return (
    <section
      id="booking"
      tabIndex={-1}
      aria-labelledby="booking-heading"
      className="scroll-mt-24 px-5 py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 rounded-[2rem] bg-parchment p-6 text-umber shadow-[0_40px_120px_-40px] shadow-gold/40 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:p-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">
            Book a consultation
          </p>
          <h2
            id="booking-heading"
            className="mt-3 text-4xl leading-tight text-night sm:text-5xl"
          >
            Begin with the moment you were born.
          </h2>
          <p id="booking-note" className="mt-5 leading-relaxed text-umber/80">
            Send your birth details and what you would like to understand. We
            reply by email or phone to confirm a time and the consultation fee.
            Nothing is charged by this form.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {site.principles.map((principle) => (
              <li key={principle} className="flex gap-3">
                <span aria-hidden="true" className="text-saffron">
                  ✶
                </span>
                {principle}
              </li>
            ))}
          </ul>
        </div>

        <form
          name={bookingForm.name}
          method="POST"
          action={bookingForm.endpoint}
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          aria-busy={submission.status === 'pending'}
          onChange={() => {
            if (!submitting.current && submission.status === 'error')
              setSubmission({ status: 'idle' })
          }}
        >
          <input type="hidden" name="form-name" value={bookingForm.name} />
          <input
            type="hidden"
            name="subject"
            value={`Consultation request: ${service?.name ?? ''}`}
          />
          <input
            type="hidden"
            name="service-name"
            value={service?.name ?? ''}
          />
          <p hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset
            disabled={locked}
            className="grid gap-5 sm:grid-cols-2 disabled:opacity-70"
          >
            <legend className="sr-only">Your consultation request</legend>
            <div className="sm:col-span-2">
              <label htmlFor="booking-service" className="form-label">
                Consultation
              </label>
              <select
                id="booking-service"
                name="service-id"
                value={serviceId}
                onChange={(event) => onServiceChange(event.target.value)}
                required
                className="form-input"
              >
                {services.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {item.duration}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="booking-name" className="form-label">
                Full name
              </label>
              <input
                id="booking-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="booking-email" className="form-label">
                Email
              </label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="booking-phone" className="form-label">
                Phone / WhatsApp
              </label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="[0-9+()\-\s]{7,20}"
                title="Digits, spaces, +, - and brackets only"
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="booking-mode" className="form-label">
                Consult by
              </label>
              <select
                id="booking-mode"
                name="consultation-mode"
                defaultValue={site.consultationModes[0]}
                className="form-input"
              >
                {site.consultationModes.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="booking-birth-date" className="form-label">
                Date of birth
              </label>
              <input
                id="booking-birth-date"
                name="birth-date"
                type="date"
                className="form-input"
                required={service?.id !== 'prashna'}
              />
            </div>
            <div>
              <label htmlFor="booking-birth-time" className="form-label">
                Time of birth{' '}
                <span className="font-normal text-umber/60">(if known)</span>
              </label>
              <input
                id="booking-birth-time"
                name="birth-time"
                type="time"
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="booking-birth-place" className="form-label">
                Place of birth
              </label>
              <input
                id="booking-birth-place"
                name="birth-place"
                placeholder="Town, district, country"
                maxLength={120}
                className="form-input"
                required={service?.id !== 'prashna'}
              />
            </div>
            <div>
              <label htmlFor="booking-language" className="form-label">
                Preferred language
              </label>
              <select
                id="booking-language"
                name="language"
                defaultValue={site.languages[0]}
                className="form-input"
              >
                {site.languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="booking-message" className="form-label">
                What would you like guidance on?
              </label>
              <textarea
                id="booking-message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={4}
                placeholder={
                  service?.id === 'kundli-milan'
                    ? "Please include your partner's birth date, time and place."
                    : 'Career, marriage, health, a decision you are weighing…'
                }
                className="form-input"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                aria-describedby="booking-note"
                className="action"
              >
                {submission.status === 'pending'
                  ? 'Sending…'
                  : 'Request consultation'}
              </button>
              <p className="text-xs text-umber/60">
                We usually reply within one day.
              </p>
            </div>
          </fieldset>
          <p role="status" className="sr-only">
            {submission.status === 'pending' ? 'Sending your request…' : ''}
          </p>
          {submission.status === 'error' && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm"
            >
              We couldn’t confirm your request. Your details are still here —
              please try again in a moment.
            </p>
          )}
          {submission.status === 'success' && (
            <div className="mt-6 rounded-2xl border border-gold bg-white/60 p-6">
              <p role="status" className="font-display text-2xl text-night">
                Thank you, {submission.name}. Your request for{' '}
                {submission.serviceName} was received.
              </p>
              <p className="mt-2 text-sm text-umber/70">
                We will be in touch shortly to confirm a time.
              </p>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-saffron underline underline-offset-4"
                onClick={() => setSubmission({ status: 'idle' })}
              >
                Send another request
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
