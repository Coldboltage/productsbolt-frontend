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
