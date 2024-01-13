import { utcToJapanTime } from "./utc-to-japan-time";

export const japaneseFormatDate = (date: Date) => {
  const japanDate = utcToJapanTime(date);

  const dateJapaneseFormat = `
  ${japanDate.getFullYear()}年
  ${japanDate.getMonth() + 1}月${japanDate.getDate()}日`;

  return dateJapaneseFormat;
};
