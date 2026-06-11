import { useState } from "react";

const STORAGE_KEY = "weather-recent-searches";
const MAX = 10;

export type RecentSearch = {
  label: string;
  latitude: string;
  longitude: string;
};

export function useRecentSearches() {
  const [recents, setRecents] = useState<RecentSearch[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  const addRecent = (entry: RecentSearch) => {
    setRecents((prev) => {
      const filtered = prev.filter((r) => r.label !== entry.label);
      const next = [entry, ...filtered].slice(0, MAX);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { recents, addRecent };
}
