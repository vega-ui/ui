/**
 * Locale of the runtime, the one `Intl` uses when no locale is given:
 * the browser language on the client, the server locale on the server.
 */
export const getDefaultLocale = () => new Intl.DateTimeFormat().resolvedOptions().locale
