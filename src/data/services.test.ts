import { describe, expect, it } from 'vitest'
import services, { findService } from './services'

describe('service lookup', () => {
  it('looks up exact service IDs', () => {
    for (const service of services)
      expect(findService(service.id)).toBe(service)
  })
  it.each(['missing', 'Janma-Kundli', ' janma-kundli', ''])(
    'rejects unknown or noncanonical ID %s',
    (id) => {
      expect(findService(id)).toBeUndefined()
    },
  )
})
