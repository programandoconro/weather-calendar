import { ChangeEvent, useRef, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";

import styles from "./input-search.module.css";
import { useDispatch } from "react-redux";
import { setCoordinates } from "@/app/store/reducers/coordinates";
import { toastSuccess } from "../toast-messages";
import { useRecentSearches } from "@/app/hooks/use-recent-searches";

export const InputSearch = () => {
  const provider = new OpenStreetMapProvider({ params: { "accept-language": "ja,en" } });
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showRecents, setShowRecents] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isComposingRef = useRef(false);
  const { recents, addRecent } = useRecentSearches();

  const applyLocation = (label: string, latitude: string, longitude: string) => {
    dispatch(setCoordinates({ latitude, longitude }));
    addRecent({ label, latitude, longitude });
    setInputValue("");
    setSearchResults([]);
    setShowRecents(false);
    toastSuccess({ latitude, longitude });
  };

  const triggerSearch = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await provider.search({ query: value });
      setSearchResults(results);
    }, 500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowRecents(false);
    // Don't search while IME is composing (Japanese/Chinese input)
    if (!isComposingRef.current) {
      triggerSearch(value);
    }
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    triggerSearch((e.target as HTMLInputElement).value);
  };

  const handleSelect = (result: SearchResult) => {
    applyLocation(result.label, result.y.toString(), result.x.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSelect(searchResults[0]);
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        onChange={handleChange}
        onCompositionStart={() => { isComposingRef.current = true; }}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowRecents(true)}
        onBlur={() => setTimeout(() => { setShowRecents(false); setSearchResults([]); }, 150)}
        placeholder="Search for a location"
        value={inputValue}
        autoComplete="off"
      />

      {searchResults.length > 0 && (
        <ul className={styles.dropdown}>
          {searchResults.map((result, index) => (
            <li
              key={`${result.label}_${index}`}
              className={styles.option}
              onMouseDown={() => handleSelect(result)}
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}

      {showRecents && searchResults.length === 0 && recents.length > 0 && (
        <ul className={styles.dropdown}>
          <li className={styles.recentsHeader}>Recent searches</li>
          {recents.map((r) => (
            <li
              key={r.label}
              className={styles.option}
              onMouseDown={() => applyLocation(r.label, r.latitude, r.longitude)}
            >
              {r.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
