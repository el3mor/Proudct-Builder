export function numWithCommas(x: string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
