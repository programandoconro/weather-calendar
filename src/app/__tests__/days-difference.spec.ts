import { daysDifference } from "../utils/days-difference";

describe("daysDifference", () => {
  it("should get 1 day difference between today and tomorrow", () => {
    const today = "2024-01-08T00:07:56.881807+00:00";
    const tomorrow = "2024-01-09 15:00:00";
    const dateToday = new Date(today);
    const dateTomorrow = new Date(tomorrow);
    const difference = daysDifference(dateTomorrow, dateToday);

    expect(difference).toBe(1);
  });
  it("should get 1 day difference between today and tomorrow if end of year", () => {
    const today = "2023-12-31T00:07:56.881807+00:00";
    const tomorrow = "2024-01-01 15:00:00";
    const dateToday = new Date(today);
    const dateTomorrow = new Date(tomorrow);
    const difference = daysDifference(dateTomorrow, dateToday);

    expect(difference).toBe(1);
  });
  it("should get 0 when two dates are same day", () => {
    const today = "2024-01-08 00:01:00";
    const alsoToday = "2024-01-08 23:59:59";
    const dateToday = new Date(today);
    const dateAlsoToday = new Date(alsoToday);
    const difference = daysDifference(dateAlsoToday, dateToday);

    expect(difference).toBe(0);
  });
  it("should get 7 when a week of difference", () => {
    const today = "2024-01-08 00:01:00";
    const nextWeek = "2024-01-15 23:59:59";
    const dateToday = new Date(today);
    const dateNextWeek = new Date(nextWeek);
    const difference = daysDifference(dateNextWeek, dateToday);

    expect(difference).toBe(7);
  });
  it("should get 0 when same day and difference is less than 9 hours", () => {
    const today = "2024-01-10T08:00:00.000Z";
    const alsoToday = "2024-01-10T09:00:00.000Z";
    const dateToday = new Date(today);
    const dateAlsoToday = new Date(alsoToday);
    const difference = daysDifference(dateAlsoToday, dateToday);

    expect(difference).toBe(0);
  });
});
