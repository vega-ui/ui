import { afterEach, describe, it, expect, vi } from 'vitest'
import { getFirstDayOfWeek } from '..'

describe('getFirstDayOfWeek', () => {
  it('uses the runtime locale without a locale', () => {
    expect(getFirstDayOfWeek()).toBe(getFirstDayOfWeek(new Intl.DateTimeFormat().resolvedOptions().locale))
  })

  it('accepts the locales argument of Intl', () => {
    expect(getFirstDayOfWeek(['ru-RU', 'en-US'])).toBe(1)
    expect(getFirstDayOfWeek(new Intl.Locale('en-US'))).toBe(0)
  })

  it('returns 1 (Monday) for an invalid locale', () => {
    expect(getFirstDayOfWeek('not a locale')).toBe(1)
  })
  
  describe('week info of Intl.Locale', () => {
    const RealLocale = Intl.Locale
    
    const stubLocale = (weekInfo: PropertyDescriptorMap) => {
      class StubLocale extends RealLocale {}
      
      Object.defineProperties(StubLocale.prototype, {
        weekInfo: { get: () => undefined },
        getWeekInfo: { value: undefined },
        ...weekInfo,
      })
      
      vi.stubGlobal('Intl', Object.create(Intl, { Locale: { value: StubLocale } }))
    }
    
    afterEach(() => {
      vi.unstubAllGlobals()
    })
    
    it('reads Sunday as 7 from getWeekInfo()', () => {
      stubLocale({ getWeekInfo: { value: () => ({ firstDay: 7 }) } })
      expect(getFirstDayOfWeek('de-DE')).toBe(0)
    })
    
    it('reads Sunday as 7 from the weekInfo getter', () => {
      stubLocale({ weekInfo: { get: () => ({ firstDay: 7 }) } })
      expect(getFirstDayOfWeek('de-DE')).toBe(0)
    })
    
    it('reads the other days as they are', () => {
      stubLocale({ getWeekInfo: { value: () => ({ firstDay: 6 }) } })
      expect(getFirstDayOfWeek('de-DE')).toBe(6)
    })
    
    it('prefers getWeekInfo() over the weekInfo getter', () => {
      stubLocale({
        getWeekInfo: { value: () => ({ firstDay: 1 }) },
        weekInfo: { get: () => ({ firstDay: 7 }) },
      })
      expect(getFirstDayOfWeek('en-US')).toBe(1)
    })
    
    describe('without week info', () => {
      it.each([
        ['fa-IR', 6],
        ['ar-EG', 6],
        ['pt-BR', 0],
        ['en-US', 0],
        ['en-GB', 1],
        ['de-DE', 1],
        ['dv-MV', 5],
        ['fa', 6],
        ['pt', 0],
        ['xx-YY', 1],
      ])('falls back to the region of %s', (locale, firstDay) => {
        stubLocale({})
        expect(getFirstDayOfWeek(locale)).toBe(firstDay)
      })
    })
  })
})
