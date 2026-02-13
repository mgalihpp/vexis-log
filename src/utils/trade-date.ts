const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const pad = (value: number) => String(value).padStart(2, "0");

export function toTradeDate(value: Date | string): Date | null {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getTradeDateKey(value: Date | string): string {
  const date = toTradeDate(value);
  if (!date) {
    return String(value);
  }

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function getTradeDateLabel(value: Date | string): string {
  const date = toTradeDate(value);
  if (!date) {
    return String(value);
  }

  return `${date.getUTCDate()} ${MONTH_LABELS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function getTradeTimeLabel(value: Date | string): string {
  const date = toTradeDate(value);
  if (!date) {
    return "";
  }

  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
}
