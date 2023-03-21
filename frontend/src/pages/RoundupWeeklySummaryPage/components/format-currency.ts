export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });
  return formatter.format(amount);
}
