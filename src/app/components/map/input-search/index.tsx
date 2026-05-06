import { ChangeEvent, useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";

import styles from "./input-search.module.css";
import { useDispatch } from "react-redux";
import { setCoordinates } from "@/app/store/reducers/coordinates";
import { toastSuccess } from "../toast-messages";

export const InputSearch = () => {
  const provider = new OpenStreetMapProvider();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [mounted, setMounted] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSelectedOption = (results: SearchResult[]) => {
    const selectedOption = results.find(
      (result) => result.label === inputValue
    );
    if (selectedOption) {
      const latitude = selectedOption.y.toString();
      const longitude = selectedOption.x.toString();
      dispatch(
        setCoordinates({
          latitude,
          longitude,
        })
      );
      setInputValue("");
      toastSuccess({ latitude, longitude });
    }
  };

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      // Avoid calling the API on the first render
      return;
    }
    const debouncedSearch = setTimeout(async () => {
      // TODO: Handle wrong data from the API with zod
      const results = await provider.search({ query: inputValue });
      setSearchResults(results);
      handleSelectedOption(results);
    }, 500);

    return () => {
      clearTimeout(debouncedSearch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        list="datalist"
        className={styles.input}
        onChange={handleSearch}
        placeholder="Search for a location"
        value={inputValue}
        autoComplete="off"
      />
      <datalist id="datalist" className={styles.dropdown}>
        {searchResults.map((result, index) => (
          <option
            className={styles.option}
            key={`${result.label}_${index}`}
            value={result.label}
          />
        ))}
      </datalist>
    </div>
  );
};
