export const WEEK_DAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export const FUTURE_DAYS_LOOKUP: Record<number, string> = {
  0: "今日",
  1: "明日",
  2: "明後日",
  3: "３日後",
  4: "４日後",
  5: "５日後",
} as const;
