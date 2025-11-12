import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getWeekDayNames } from '../../date'

type MockLocaleClass = new (locale?: string) => { weekInfo: { firstDay: number } }

describe('getWeekDayNames', () => {
  it('returns Monday-first order with explicit firstDayOfWeek=1 (en-US, short)', () => {
    const days = getWeekDayNames('en-US', 'short', 1)
    expect(days).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  })
  
  it('returns Sunday-first order with explicit firstDayOfWeek=0 (en-US, short)', () => {
    const days = getWeekDayNames('en-US', 'short', 0)
    expect(days).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
  })
  
  it('returns Russian long names with Monday-first when forced', () => {
    const days = getWeekDayNames('ru-RU', 'long', 1)
    expect(days).toHaveLength(7)
    expect(days[0]).toBe('понедельник')
    expect(days[6]).toBe('воскресенье')
  })
  
  it('returns narrow Japanese names and preserves length', () => {
    const days = getWeekDayNames('ja-JP', 'narrow', 1)
    expect(days).toHaveLength(7)
    days.forEach(d => expect(typeof d).toBe('string'))
  })
  
  describe('auto-detection via Intl.Locale.weekInfo.firstDay', () => {
    let OriginalLocale: typeof Intl.Locale
    
    beforeAll(() => {
      OriginalLocale = Intl.Locale
    })
    
    afterAll(() => {
      Object.defineProperty(Intl, 'Locale', { value: OriginalLocale, configurable: true })
    })
    
    it('auto-detects Sunday-first for en-US when weekInfo.firstDay=7', () => {
      const MockLocale: MockLocaleClass = class {
        weekInfo = { firstDay: 7 }
        constructor() {}
      }
      
      Object.defineProperty(Intl, 'Locale', { value: MockLocale, configurable: true })
      const days = getWeekDayNames('en-US', 'short')
      expect(days[0]).toBe('Sun')
      expect(days).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    })
    
    it('auto-detects Monday-first for ru-RU when weekInfo.firstDay=1', () => {
      const MockLocale: MockLocaleClass = class {
        weekInfo = { firstDay: 1 }
        constructor() {}
      }
      
      Object.defineProperty(Intl, 'Locale', { value: MockLocale, configurable: true })
      const days = getWeekDayNames('ru-RU', 'short')
      expect(days[0]).toBe('пн')
      expect(days[6]).toBe('вс')
    })
  })
})
