import calculateFromUTCDate from "../utils/date-operations";

describe("calculateFromUTCDate", () => {
  it("should get number of days for tomorrow even when today is last day of year", () => {
    const lastDayOfYear = new Date("2023/12/31 12:00:00Z");
    jest.useFakeTimers({
      now: lastDayOfYear.getTime(),
    });
    const daysUntilTomorrow = calculateFromUTCDate("2024/01/01 03:00:00");
    expect(daysUntilTomorrow.dayFromToday).toBe(1);
  });
  it("should get 0 days difference when date is same as today", () => {
    const date = new Date("2024/01/01 03:00:00Z");
    jest.useFakeTimers({
      now: date.getTime(),
    });
    const daysUntilTomorrow = calculateFromUTCDate("2024/01/01 09:00:00");
    expect(daysUntilTomorrow.dayFromToday).toBe(0);
  });
  it("should get 0 days difference when date is same as today at diff hours", () => {
    const date = new Date("2024/01/01 00:00:00Z");
    jest.useFakeTimers({
      now: date.getTime(),
    });
    const daysUntilTomorrow = calculateFromUTCDate("2024/01/01 03:00:00");
    expect(daysUntilTomorrow.dayFromToday).toBe(0);
  });
  it("should get negative values when date already passed", () => {
    const today = new Date("2024/01/01 12:00:00Z");
    jest.useFakeTimers({
      now: today.getTime(),
    });
    const daysUntilTomorrow = calculateFromUTCDate("2023/12/31");
    expect(daysUntilTomorrow.dayFromToday.toString()).toBe("-1");
  });
});
