export const japaneseFormatDate = (date: Date) => {
  const dateJapaneseFormat = `
  ${date.getFullYear()}年
  ${date.getMonth() + 1}月${date.getDate()}日`;

  return dateJapaneseFormat;
};
