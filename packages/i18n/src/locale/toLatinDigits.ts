/**
 * First code points of the decimal digits of the numbering systems of `Intl`
 * whose digits are encoded in order, zero to nine, within one UTF-16 unit.
 */
const DIGIT_ZEROS = [
  0x0030, 0x0660, 0x06F0, 0x07C0, 0x0966, 0x09E6, 0x0A66, 0x0AE6, 0x0B66, 0x0BE6, 0x0C66, 0x0CE6, 0x0D66,
  0x0DE6, 0x0E50, 0x0ED0, 0x0F20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0, 0x1A80, 0x1A90, 0x1B50,
  0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900, 0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10,
]

/**
 * Replaces the digits of other numbering systems with Latin digits:
 * `١٤٠٥/٠١/٠١` (Arabic-Indic) and `۱۴۰۵/۰۱/۰۱` (Persian) become `1405/01/01`.
 * Every other character, digits outside the Basic Multilingual Plane
 * included, is kept, so the length does not change.
 */
export const toLatinDigits = (value: string) =>
  value.replace(/\p{Nd}/gu, (digit) => {
    const code = digit.charCodeAt(0)
    const zero = DIGIT_ZEROS.find((start) => code >= start && code <= start + 9)

    if (zero === undefined) return digit
    return String(code - zero)
  })
