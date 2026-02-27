function getLocaleFromCountry(country: string) {
  return `en-${country}`;
}

export function formatCurrency(
  amount: number,
  currency: string,
  country: string,
) {
  return new Intl.NumberFormat(getLocaleFromCountry(country), {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  US: "USD",
  CA: "CAD",
  JP: "JPY",
};

export function getCurrencyFromCountry(country: string): string {
  return COUNTRY_TO_CURRENCY[country] ?? "EUR";
}
