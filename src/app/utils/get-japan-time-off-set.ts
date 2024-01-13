import { Hours } from "../model";

export function getJapanTimeOffSet(date: Date): Hours {
  const offset = date.getTimezoneOffset();

  const japanOffset = 9 * 60;
  const offsetToJapan = offset + japanOffset;

  return offsetToJapan / 60;
}
