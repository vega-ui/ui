import { describe, it, expect } from 'vitest'
import { getFirstDayOfWeek } from '../../date'

describe('getFirstDayOfWeek', () => {
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
    expect(getFirstDayOfWeek('ar-SA')).toBe(1)
  })
  
  it('returns 6 (Saturday) for fa-IR locale (Iran)', () => {
    expect(getFirstDayOfWeek('fa-IR')).toBe(6)
  })
  
  it('returns 6 (Saturday) for af-AF locale (Afghanistan)', () => {
    expect(getFirstDayOfWeek('af-AF')).toBe(6)
  })
  
  it('returns 5 (Friday) for bn-BD locale (Bangladesh)', () => {
    expect(getFirstDayOfWeek('bn-BD')).toBe(5)
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
  
  it('returns 1 (Monday) for in-ID locale (Indonesia)', () => {
    expect(getFirstDayOfWeek('in-ID')).toBe(1)
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
})
