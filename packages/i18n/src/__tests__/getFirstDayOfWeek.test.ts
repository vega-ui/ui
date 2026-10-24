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

  it('returns 0 (Sunday) for en-US locale', () => {
    expect(getFirstDayOfWeek('en-US')).toBe(0)
  })
  
  it('returns 1 (Monday) for ru-RU locale', () => {
    expect(getFirstDayOfWeek('ru-RU')).toBe(1)
  })
  
  it('returns 1 (Monday) for fi-FI locale', () => {
    expect(getFirstDayOfWeek('fi-FI')).toBe(1)
  })
  
  it('returns 0 (Sunday) for ar-SA locale', () => {
    expect(getFirstDayOfWeek('ar-SA')).toBe(0)
  })
  
  it('returns 6 (Saturday) for fa-IR locale (Iran)', () => {
    expect(getFirstDayOfWeek('fa-IR')).toBe(6)
  })
  
  it('returns 6 (Saturday) for af-AF locale (Afghanistan)', () => {
    expect(getFirstDayOfWeek('af-AF')).toBe(6)
  })
  
  it('returns 0 (Sunday) for bn-BD locale (Bangladesh)', () => {
    expect(getFirstDayOfWeek('bn-BD')).toBe(0)
  })
  
  it('returns 5 (Friday) for dv-MV locale (Maldives)', () => {
    expect(getFirstDayOfWeek('dv-MV')).toBe(5)
  })
  
  it('returns 0 (Sunday) for he-IL locale (Israel)', () => {
    expect(getFirstDayOfWeek('he-IL')).toBe(0)
  })
  
  it('returns 0 (Sunday) for ja-JP locale (Japan)', () => {
    expect(getFirstDayOfWeek('ja-JP')).toBe(0)
  })
  
  it('returns 0 (Sunday) for ko-KR locale (South Korea)', () => {
    expect(getFirstDayOfWeek('ko-KR')).toBe(0)
  })
  
  it('returns 1 (Monday) for zh-CN locale (China)', () => {
    expect(getFirstDayOfWeek('zh-CN')).toBe(1)
  })
  
  it('returns 1 (Monday) for de-DE locale (Germany)', () => {
    expect(getFirstDayOfWeek('de-DE')).toBe(1)
  })
  
  it('returns 1 (Monday) for fr-FR locale (France)', () => {
    expect(getFirstDayOfWeek('fr-FR')).toBe(1)
  })
  
  it('returns 1 (Monday) for es-ES locale (Spain)', () => {
    expect(getFirstDayOfWeek('es-ES')).toBe(1)
  })
  
  it('returns 1 (Monday) for it-IT locale (Italy)', () => {
    expect(getFirstDayOfWeek('it-IT')).toBe(1)
  })
  
  it('returns 0 (Sunday) for in-ID locale (Indonesia)', () => {
    expect(getFirstDayOfWeek('in-ID')).toBe(0)
  })
  
  it('returns 0 (Sunday) for ph-PH locale (Philippines)', () => {
    expect(getFirstDayOfWeek('ph-PH')).toBe(0)
  })
  
  it('returns 1 (Monday) for pl-PL locale (Poland)', () => {
    expect(getFirstDayOfWeek('pl-PL')).toBe(1)
  })
  
  it('returns 1 (Monday) for se-SE locale (Sweden)', () => {
    expect(getFirstDayOfWeek('se-SE')).toBe(1)
  })
  
  it('falls back correctly for unsupported locales', () => {
    expect(getFirstDayOfWeek('xx-YY')).toBe(1)
  })
  
  it('returns 0 (Sunday) for pt-BR locale (Brazil)', () => {
    expect(getFirstDayOfWeek('pt-BR')).toBe(0)
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
