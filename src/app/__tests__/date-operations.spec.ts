import { utcToJapanTime } from "../utils/date-operations";

describe("date operations", () => {
  describe("utcToJapanTime", () => {
    it("should transform utc to Japan time", () => {
      const utcDate = new Date("2024/01/02 00:00:00Z");
      const japanTime = utcToJapanTime(utcDate).toString();

      expect(japanTime).toBe(
        "Tue Jan 02 2024 09:00:00 GMT+0900 (Japan Standard Time)"
      );
    });
  });
});
