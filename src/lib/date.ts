export const formatRelative = (date: string) => {
  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
  const diff = new Date(date).getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  const hours = Math.round(diff / 3600000);
  const days = Math.round(diff / 86400000);

  if (Math.abs(minutes) < 60) {
    return formatter.format(minutes, 'minute');
  }
  if (Math.abs(hours) < 24) {
    return formatter.format(hours, 'hour');
  }
  return formatter.format(days, 'day');
};
