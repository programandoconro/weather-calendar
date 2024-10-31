import { getJapanTimeOffSet } from "../utils/get-japan-time-off-set";
import * as timezonedDate from "timezoned-date";

describe("getJapanTimeOffSet", () => {
  it("should return 9 hours offset if utc date", () => {
    const utcDate = timezonedDate.makeConstructor(0);
    const offSet = getJapanTimeOffSet(new utcDate());

    expect(offSet).toBe(9);
  });
  it("should return 0 hours offset if japan date", () => {
    const utcDate = timezonedDate.makeConstructor(540);
    const offSet = getJapanTimeOffSet(new utcDate());

    expect(offSet).toBe(0);
  });
});
