import { utcToJapanTime } from "../utils/utc-to-japan-time";

describe("utcToJapanTime", () => {
  it("should add 9 hours to utc date", () => {
    const date = new Date("2024-01-11T00:00:00.000Z");
    const newDate = utcToJapanTime(date);

    expect(newDate).toStrictEqual(new Date("2024-01-11T09:00:00.000Z"));
  });
});
