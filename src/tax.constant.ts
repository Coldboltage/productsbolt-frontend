// Standard VAT / GST rates (decimal)
// For countries without VAT, estimated consumer tax is used.

export const TAX_RATES: Record<string, number> = {
  // 🇪🇺 EU
  AT: 0.2,
  BE: 0.21,
  BG: 0.2,
  HR: 0.25,
  CY: 0.19,
  CZ: 0.21,
  DK: 0.25,
  EE: 0.22,
  FI: 0.24,
  FR: 0.2,
  DE: 0.19,
  GR: 0.24,
  HU: 0.27,
  IE: 0.23,
  IT: 0.22,
  LV: 0.21,
  LT: 0.21,
  LU: 0.17,
  MT: 0.18,
  NL: 0.21,
  PL: 0.23,
  PT: 0.23,
  RO: 0.19,
  SK: 0.2,
  SI: 0.22,
  ES: 0.21,
  SE: 0.25,

  // 🇬🇧 UK
  GB: 0.2,

  // 🇪🇺 Non-EU Europe
  NO: 0.25,
  IS: 0.24,
  CH: 0.081,
  TR: 0.2,

  // 🌎 Major TCG Markets

  // 🇺🇸 US (estimated avg sales tax)
  US: 0.0,

  // 🇨🇦 Canada (blended estimate)
  CA: 0.13,

  // 🇯🇵 Japan
  JP: 0.1,

  // 🇦🇺 Australia
  AU: 0.1,

  // 🇳🇿 New Zealand
  NZ: 0.15,

  // 🇸🇬 Singapore
  SG: 0.09,

  // 🇭🇰 Hong Kong
  HK: 0.0,
};
