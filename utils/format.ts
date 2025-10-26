export const formatNumber = (n?: number | null, fallback = '-') =>
  typeof n === 'number' && isFinite(n) ? new Intl.NumberFormat().format(n) : fallback;

export const formatDate = (
  d?: Date | string | number,
  locales = 'id-ID',
  opts: Intl.DateTimeFormatOptions = {}
) => {
  if (!d) return '-';
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  return new Intl.DateTimeFormat(locales, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...opts,
  }).format(date);
};
