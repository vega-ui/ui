import type { CountryCode } from 'libphonenumber-js/min'

/**
 * ISO 3166-1 alpha-2 code of a country with a phone numbering plan, like `RU` or `US`.
 */
export type PhoneCountry = CountryCode

/**
 * A phone number read from text: the calling code of its country and the
 * national number after it, without a national prefix.
 */
export interface PhoneNumber {
  /**
   * Calling code of the country, without `+`, like `7` or `44`.
   */
  callingCode: string

  /**
   * National significant number: the digits after the calling code, without a national prefix
   * like `8` in Russia or `0` in the United Kingdom. Empty while only the calling code is typed.
   */
  nationalNumber: string

  /**
   * Country of the number. Countries that share a calling code, like the United States and
   * Canada on `+1`, are told apart by the national number; while they cannot be, it is `undefined`.
   */
  country: PhoneCountry | undefined
}

/**
 * Whether a phone number can be a number of its country by its length:
 * `possible`, too `short`, too `long`, or an `invalid` length between the shortest and the longest.
 */
export type PhoneNumberLength = 'possible' | 'short' | 'long' | 'invalid'
