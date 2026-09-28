"use client";

import { useMemo } from "react";
import { useSearch } from "@/ContextAPi/SearchContext";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

const useFilteredSearch = (data = [], fields = []) => {
  const { searchQuery } = useSearch();

  const query = searchQuery?.toLowerCase() || "";

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.filter((item) =>
      fields.some((field) => {
        const value = getNestedValue(item, field);

        return (
          value &&
          value.toString().toLowerCase().includes(query)
        );
      })
    );
  }, [data, fields, query]);

  return filteredData;
};

export default useFilteredSearch;
