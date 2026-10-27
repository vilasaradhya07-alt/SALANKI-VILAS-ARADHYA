export interface Service {
  id: string
  name: string
  sanskrit: string
  glyph: string
  shortDescription: string
  description: string
  includes: Array<string>
  duration: string
}

const services: Array<Service> = [
  {
    id: 'janma-kundli',
    name: 'Janma Kundli Reading',
    sanskrit: 'जन्म कुण्डली',
    glyph: '☉',
    shortDescription:
      'A complete reading of your birth chart — temperament, strengths and the chapters ahead.',
    description:
      'Your Janma Kundli is a map of the sky at the moment you were born. We read your Lagna, Moon sign and Nakshatra, the strength of each graha, and the Vimshottari Dasha you are running, to give a clear picture of your nature and the periods that lie ahead.',
    includes: [
      'Lagna, Rashi and Nakshatra explained',
      'Planetary strengths and key yogas',
      'Current and upcoming Dasha periods',
      'Written summary after the consultation',
    ],
    duration: '60 minutes',
  },
  {
    id: 'kundli-milan',
    name: 'Marriage Matching',
    sanskrit: 'कुण्डली मिलान',
    glyph: '♀',
    shortDescription:
      'Ashtakoota guna milan and a deeper look at both charts before you decide.',
    description:
      'Beyond the 36-point Ashtakoota score, we compare both charts for Mangala dosha, the seventh house and its lord, and the Dasha periods each partner will move through, so families can make a considered decision.',
    includes: [
      'Ashtakoota guna score with explanation',
      'Mangala (Kuja) dosha assessment',
      'Seventh-house and Dasha compatibility',
      'Guidance on a suitable wedding window',
    ],
    duration: '75 minutes',
  },
  {
    id: 'career-finance',
    name: 'Career & Finance',
    sanskrit: 'वृत्ति विचार',
    glyph: '♃',
    shortDescription:
      'Timing for job changes, business ventures and investments, read from your chart.',
    description:
      'We study the tenth, second and eleventh houses, the Dashamsha chart and current transits of Shani and Guru, to understand which paths suit you and when to act.',
    includes: [
      'Suitable fields and working style',
      'Dashamsha (D10) analysis',
      'Shani and Guru transit timing',
      'Favourable periods for change',
    ],
    duration: '45 minutes',
  },
  {
    id: 'muhurtha',
    name: 'Muhurtha Selection',
    sanskrit: 'मुहूर्त',
    glyph: '☽',
    shortDescription:
      'Auspicious dates and times for weddings, griha pravesha, naming and new beginnings.',
    description:
      'Using the Panchanga — tithi, vara, nakshatra, yoga and karana — matched against the charts of the people involved, we choose a muhurtha that supports the occasion.',
    includes: [
      'Weddings and engagements',
      'Griha pravesha and bhoomi puja',
      'Namakarana, upanayana and other samskaras',
      'Business openings and vehicle purchase',
    ],
    duration: '30 minutes',
  },
  {
    id: 'graha-shanti',
    name: 'Remedies & Graha Shanti',
    sanskrit: 'ग्रह शान्ति',
    glyph: '♄',
    shortDescription:
      'Mantra, daana and puja to ease difficult planetary periods such as Sade Sati.',
    description:
      'When a graha is afflicted or a challenging period like Sade Sati is running, we suggest proportionate remedies — mantra japa, daana, vrata or a Navagraha shanti — and can arrange the puja for you.',
    includes: [
      'Assessment of afflicted grahas',
      'Mantra and daana recommendations',
      'Navagraha or specific graha shanti puja',
      'Gemstone advice only where truly suited',
    ],
    duration: '45 minutes',
  },
  {
    id: 'prashna',
    name: 'Prashna (Horary)',
    sanskrit: 'प्रश्न',
    glyph: '☿',
    shortDescription:
      'A focused answer to one pressing question, cast for the moment it is asked.',
    description:
      'Prashna is useful when birth details are unknown or a single question needs a clear answer. A chart is cast for the moment you ask, and read for that question alone.',
    includes: [
      'One clearly framed question',
      'Chart cast for the time of asking',
      'No birth details required',
      'Short follow-up by message',
    ],
    duration: '30 minutes',
  },
]

export default services

export function findService(id: string) {
  return services.find((service) => service.id === id)
}
