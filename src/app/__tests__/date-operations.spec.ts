import calculateFromUTCDate, { utcToJapanTime } from "../utils/date-operations";

describe("date operations", () => {
  describe("calculateFromUTCDate", () => {
    afterAll(() => {
      jest.useFakeTimers().resetAllMocks();
    });

    it("should get number of days for tomorrow even when today is last day of year", () => {
      const lastDayOfYear = new Date("2023/12/31 12:00:00Z");
      jest.useFakeTimers({
        now: lastDayOfYear.getTime(),
      });
      const daysFromToday = calculateFromUTCDate(
        "2024/01/01 03:00:00"
      ).daysFromToday;

      expect(daysFromToday).toBe(1);
    });
    it("should get 0 days difference when date is same as today", () => {
      const date = new Date("2024/01/01 03:00:00Z");
      jest.useFakeTimers({
        now: date.getTime(),
      });
      const daysFromToday = calculateFromUTCDate(
        "2024/01/01 09:00:00"
      ).daysFromToday;

      expect(daysFromToday).toBe(0);
    });
    it("should get 0 days difference when date is same as today at diff hours", () => {
      const date = new Date("2024/01/01 00:00:00Z");
      jest.useFakeTimers({
        now: date.getTime(),
      });
      const daysFromToday = calculateFromUTCDate(
        "2024/01/01 03:00:00"
      ).daysFromToday;

      expect(daysFromToday).toBe(0);
    });
    it("should get negative values when date already passed", () => {
      const today = new Date("2024/01/01 12:00:00Z");
      jest.useFakeTimers({
        now: today.getTime(),
      });
      const daysFromToday = calculateFromUTCDate("2023/12/31").daysFromToday;

      expect(daysFromToday.toString()).toBe("-1");
    });
  });

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
