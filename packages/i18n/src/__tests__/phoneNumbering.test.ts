import { describe, expect, it } from 'vitest'
import { phoneNumbering } from '..'

const { parse, getLength } = phoneNumbering

describe('phoneNumbering', () => {
  describe('parse', () => {
    it('reads the calling code, the national number and the country of an international number', () => {
      expect(parse('+7 912 345-67-89')).toEqual({ callingCode: '7', nationalNumber: '9123456789', country: 'RU' })
      expect(parse('+1 204 555 1234')).toEqual({ callingCode: '1', nationalNumber: '2045551234', country: 'CA' })
      expect(parse('+7 912')).toEqual({ callingCode: '7', nationalNumber: '912', country: undefined })
    })

    it('reads a number without + as a number of the country, dropping its national prefix', () => {
      expect(parse('8 (912) 345-67-89', 'RU')).toEqual({ callingCode: '7', nationalNumber: '9123456789', country: 'RU' })
      expect(parse('8 10 44 20 7946 0958', 'RU')).toEqual({ callingCode: '44', nationalNumber: '2079460958', country: 'GB' })
    })

    it('reads nothing from text without digits, with an unknown calling code, or without + and a country', () => {
      expect(parse('')).toBeUndefined()
      expect(parse('+')).toBeUndefined()
      expect(parse('+999')).toBeUndefined()
      expect(parse('9123456789')).toBeUndefined()
      expect(parse('', 'RU')).toBeUndefined()
    })
  })

  describe('getLength', () => {
    it('checks the length of a number against the lengths of its country', () => {
      expect(getLength('+79123456789')).toBe('possible')
      expect(getLength('+7912345678')).toBe('short')
      expect(getLength('+7912345678901234')).toBe('long')
      expect(getLength('+791234567890')).toBe('invalid')
    })

    it('reads text without + as a number of the country, and text without a number as invalid', () => {
      expect(getLength('8 912 345-67-89', 'RU')).toBe('possible')
      expect(getLength('8 912 345-67', 'RU')).toBe('short')
      expect(getLength('9123456789')).toBe('invalid')
    })
  })
})
