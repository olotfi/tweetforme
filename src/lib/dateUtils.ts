export function getFormattedDateAndTime(date: Date) {
  const formattedDate = date.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short'
  });
  const formattedTime = date
    .toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit'
    })
    .substring(0, 5);

  return `${formattedDate} ${formattedTime}${date.getHours() < 12 ? 'am' : 'pm'}`;
}
