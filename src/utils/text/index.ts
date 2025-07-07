export const truncateText = (text: string, maxLength = 250): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  // Find last period or space near the maxLength boundary
  const endIndex = text.lastIndexOf('.', maxLength);
  const safeIndex = endIndex > maxLength * 0.6 ? endIndex : text.lastIndexOf(' ', maxLength);

  return text.substring(0, safeIndex).trim() + '...';
};
