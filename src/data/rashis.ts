export interface Rashi {
  name: string
  devanagari: string
  western: string
  glyph: string
  lord: string
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  quality: 'Chara (movable)' | 'Sthira (fixed)' | 'Dvisvabhava (dual)'
  sunTransit: string
  nature: string
}

// Sun-transit dates follow the sidereal (Lahiri) zodiac and shift by a day
// or so between years.
const rashis: Array<Rashi> = [
  {
    name: 'Mesha',
    devanagari: 'मेष',
    western: 'Aries',
    glyph: '♈',
    lord: 'Mangala (Mars)',
    element: 'Fire',
    quality: 'Chara (movable)',
    sunTransit: '14 Apr – 14 May',
    nature:
      'Courageous and quick to begin. Mesha leads from the front and thrives on challenge, but must learn patience.',
  },
  {
    name: 'Vrishabha',
    devanagari: 'वृषभ',
    western: 'Taurus',
    glyph: '♉',
    lord: 'Shukra (Venus)',
    element: 'Earth',
    quality: 'Sthira (fixed)',
    sunTransit: '15 May – 14 Jun',
    nature:
      'Steady, loyal and sensual. Vrishabha builds lasting comfort and values beauty, food and security.',
  },
  {
    name: 'Mithuna',
    devanagari: 'मिथुन',
    western: 'Gemini',
    glyph: '♊',
    lord: 'Budha (Mercury)',
    element: 'Air',
    quality: 'Dvisvabhava (dual)',
    sunTransit: '15 Jun – 16 Jul',
    nature:
      'Curious, witty and communicative. Mithuna learns fast and needs variety to stay engaged.',
  },
  {
    name: 'Karka',
    devanagari: 'कर्क',
    western: 'Cancer',
    glyph: '♋',
    lord: 'Chandra (Moon)',
    element: 'Water',
    quality: 'Chara (movable)',
    sunTransit: '17 Jul – 16 Aug',
    nature:
      'Nurturing and deeply intuitive. Karka protects family and home, and feels everything keenly.',
  },
  {
    name: 'Simha',
    devanagari: 'सिंह',
    western: 'Leo',
    glyph: '♌',
    lord: 'Surya (Sun)',
    element: 'Fire',
    quality: 'Sthira (fixed)',
    sunTransit: '17 Aug – 16 Sep',
    nature:
      'Generous, proud and dignified. Simha is a natural leader who shines when given responsibility.',
  },
  {
    name: 'Kanya',
    devanagari: 'कन्या',
    western: 'Virgo',
    glyph: '♍',
    lord: 'Budha (Mercury)',
    element: 'Earth',
    quality: 'Dvisvabhava (dual)',
    sunTransit: '17 Sep – 16 Oct',
    nature:
      'Precise, analytical and helpful. Kanya notices detail others miss and serves through skill.',
  },
  {
    name: 'Tula',
    devanagari: 'तुला',
    western: 'Libra',
    glyph: '♎',
    lord: 'Shukra (Venus)',
    element: 'Air',
    quality: 'Chara (movable)',
    sunTransit: '17 Oct – 15 Nov',
    nature:
      'Balanced, fair and diplomatic. Tula seeks harmony in relationships and a sense of justice.',
  },
  {
    name: 'Vrishchika',
    devanagari: 'वृश्चिक',
    western: 'Scorpio',
    glyph: '♏',
    lord: 'Mangala (Mars)',
    element: 'Water',
    quality: 'Sthira (fixed)',
    sunTransit: '16 Nov – 15 Dec',
    nature:
      'Intense, private and transformative. Vrishchika investigates deeply and rarely forgets.',
  },
  {
    name: 'Dhanu',
    devanagari: 'धनु',
    western: 'Sagittarius',
    glyph: '♐',
    lord: 'Guru (Jupiter)',
    element: 'Fire',
    quality: 'Dvisvabhava (dual)',
    sunTransit: '16 Dec – 14 Jan',
    nature:
      'Optimistic, principled and philosophical. Dhanu is drawn to dharma, teaching and travel.',
  },
  {
    name: 'Makara',
    devanagari: 'मकर',
    western: 'Capricorn',
    glyph: '♑',
    lord: 'Shani (Saturn)',
    element: 'Earth',
    quality: 'Chara (movable)',
    sunTransit: '14 Jan – 12 Feb',
    nature:
      'Disciplined, practical and ambitious. Makara climbs slowly and surely, and keeps its word.',
  },
  {
    name: 'Kumbha',
    devanagari: 'कुम्भ',
    western: 'Aquarius',
    glyph: '♒',
    lord: 'Shani (Saturn)',
    element: 'Air',
    quality: 'Sthira (fixed)',
    sunTransit: '13 Feb – 13 Mar',
    nature:
      'Independent, humane and inventive. Kumbha thinks of the wider community and its future.',
  },
  {
    name: 'Meena',
    devanagari: 'मीन',
    western: 'Pisces',
    glyph: '♓',
    lord: 'Guru (Jupiter)',
    element: 'Water',
    quality: 'Dvisvabhava (dual)',
    sunTransit: '14 Mar – 13 Apr',
    nature:
      'Compassionate, imaginative and devotional. Meena is sensitive to the unseen and gives freely.',
  },
]

export default rashis
