import { PhoneCountry, PhoneNumber, PhoneNumberLength } from './PhoneNumber'

/**
 * Phone numbering plan: how phone numbers of the world are read, checked and formatted.
 * `phoneNumbering` implements it on libphonenumber; another engine implements the same
 * four methods and replaces it.
 */
export interface PhoneNumbering {
  /**
   * Formats an international number as it is typed, like `+7 912 345 67 89` for `+79123456789`
   * and `+7 912 3` for `+79123`: the calling code and the groups of the national number are separated
   * by spaces. Text without digits gives `+` or `''`.
   */
  format(text: string): string

  /**
   * Reads a phone number from text. Text with `+` is an international number read as it is typed;
   * text without `+` is a number of `country`. Returns `undefined` when nothing can be read.
   */
  parse(text: string, country?: PhoneCountry): PhoneNumber | undefined

  /**
   * Checks whether the number in text, read like `parse` reads it, can be a number of its
   * country by its length. Text no number can be read from is `invalid`.
   */
  getLength(text: string, country?: PhoneCountry): PhoneNumberLength

  /**
   * Returns the calling code of a country without `+`: `7` for `RU`, `44` for `GB`.
   */
  getCallingCode(country: PhoneCountry): string
}
