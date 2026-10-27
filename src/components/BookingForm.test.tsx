import { readFileSync } from 'node:fs'
import { useState } from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BookingForm } from './BookingForm'
import { bookingForm } from '../data/site'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

function Form() {
  const [id, setId] = useState('kundli-milan')
  return <BookingForm serviceId={id} onServiceChange={setId} />
}

async function fillForm() {
  render(<Form />)
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Full name'), 'Asha Rao')
  await user.type(screen.getByLabelText('Email'), 'asha@example.com')
  await user.type(screen.getByLabelText('Phone / WhatsApp'), '+91 98450 12345')
  fireEvent.change(screen.getByLabelText('Date of birth'), {
    target: { value: '1994-03-21' },
  })
  await user.type(screen.getByLabelText('Place of birth'), 'Mysuru, India')
  await user.type(
    screen.getByLabelText('What would you like guidance on?'),
    'Marriage matching with my fiancé.',
  )
  return user
}

const submitButton = () =>
  screen.getByRole('button', { name: 'Request consultation' })

describe('consultation booking', () => {
  it('sends the selected service and birth details and confirms accepted submissions', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('Accepted'))
    vi.stubGlobal('fetch', fetch)
    const user = await fillForm()
    await user.click(submitButton())
    await screen.findByText(/Your request for Marriage Matching was received/)
    expect(screen.getByText(/Thank you, Asha/)).toBeTruthy()
    const [url, init] = fetch.mock.calls[0]
    expect(url).toBe(bookingForm.endpoint)
    expect(init.headers['Content-Type']).toBe(
      'application/x-www-form-urlencoded',
    )
    expect(Object.fromEntries(new URLSearchParams(init.body))).toMatchObject({
      'form-name': 'consultation-booking',
      subject: 'Consultation request: Marriage Matching',
      'service-id': 'kundli-milan',
      'service-name': 'Marriage Matching',
      name: 'Asha Rao',
      email: 'asha@example.com',
      phone: '+91 98450 12345',
      'birth-date': '1994-03-21',
      'birth-place': 'Mysuru, India',
      'bot-field': '',
    })
    expect(screen.getByRole('group').hasAttribute('disabled')).toBe(true)
    await user.click(
      screen.getByRole('button', { name: 'Send another request' }),
    )
    expect(screen.getByRole('group').hasAttribute('disabled')).toBe(false)
  })

  it.each([400, 500])(
    'keeps details after HTTP %s and supports retry',
    async (status) => {
      const fetch = vi
        .fn()
        .mockResolvedValueOnce(new Response('', { status }))
        .mockResolvedValueOnce(new Response('Accepted'))
      vi.stubGlobal('fetch', fetch)
      const user = await fillForm()
      await user.click(submitButton())
      await screen.findByRole('alert')
      expect(
        (screen.getByLabelText('Full name') as HTMLInputElement).value,
      ).toBe('Asha Rao')
      await user.click(submitButton())
      await screen.findByText(/was received/)
      expect(fetch.mock.calls[1][1].body).toBe(fetch.mock.calls[0][1].body)
    },
  )

  it('blocks duplicate submissions while pending', async () => {
    let resolve!: (response: Response) => void
    const fetch = vi.fn().mockReturnValue(
      new Promise<Response>((done) => {
        resolve = done
      }),
    )
    vi.stubGlobal('fetch', fetch)
    await fillForm()
    const form = submitButton().closest('form')!
    act(() => {
      fireEvent.submit(form)
      fireEvent.submit(form)
    })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeTruthy()
    await act(async () => resolve(new Response('Accepted')))
    expect(screen.getByText(/was received/)).toBeTruthy()
  })

  it('rejects unprocessed registration HTML returned with HTTP 200', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response(readFileSync('public/__forms.html', 'utf8')),
        ),
    )
    const user = await fillForm()
    await user.click(submitButton())
    await screen.findByRole('alert')
    expect(screen.queryByText(/was received/)).toBeNull()
  })

  it('matches static registration names, fields and honeypot', () => {
    const { container } = render(<Form />)
    const form = container.querySelector('form')!
    const registration = new DOMParser()
      .parseFromString(readFileSync('public/__forms.html', 'utf8'), 'text/html')
      .querySelector('form')!
    for (const attribute of [
      'name',
      'method',
      'data-netlify',
      'netlify-honeypot',
    ])
      expect(form.getAttribute(attribute)).toBe(
        registration.getAttribute(attribute),
      )
    const names = (element: Element) =>
      [...element.querySelectorAll('[name]')]
        .map((field) => field.getAttribute('name'))
        .sort()
    expect(names(form)).toEqual(names(registration))
    expect(form.querySelector('[name="bot-field"]')?.closest('p')?.hidden).toBe(
      true,
    )
  })
})
