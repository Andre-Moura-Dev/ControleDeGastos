export const money = (value) =>
  Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const shortMoney = (value) =>
  Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export const dateLabel = (iso) => {
  const date = new Date(iso + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
};

export const localIsoDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isValidIsoDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day;
};

export const parseAmount = (value) => {
  const input = String(value).trim().replace(/\s/g, '');
  if (input.includes(',')) {
    if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(input)) return NaN;
    return Number(input.replace(/\./g, '').replace(',', '.'));
  }
  if (!/^\d+(?:\.\d+)?$/.test(input)) return NaN;
  return Number(input);
};

export const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
