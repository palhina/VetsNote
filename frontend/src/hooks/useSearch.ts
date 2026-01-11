import { useState, useCallback } from "react";
import { useApiRequest } from "./useApiRequest";
import type { PatientCase, SeminarNote } from "../types";

interface SearchResult {
  patient_cases: PatientCase[];
  seminar_notes: SeminarNote[];
}

interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  searchedCases: PatientCase[];
  searchedNotes: SeminarNote[];
  isLoading: boolean;
  handleSearch: () => Promise<void>;
  handleClearSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const useSearch = (): UseSearchReturn => {
  const { execute: fetchSearch, isLoading } = useApiRequest<SearchResult>();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCases, setSearchedCases] = useState<PatientCase[]>([]);
  const [searchedNotes, setSearchedNotes] = useState<SeminarNote[]>([]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }

    try {
      const result = await fetchSearch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`,
        { method: "GET" }
      );
      setSearchedCases(result.patient_cases);
      setSearchedNotes(result.seminar_notes);
      setIsSearching(true);
    } catch (err) {
      console.error("検索に失敗しました", err);
    }
  }, [searchQuery, fetchSearch]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearching(false);
    setSearchedCases([]);
    setSearchedNotes([]);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    searchedCases,
    searchedNotes,
    isLoading,
    handleSearch,
    handleClearSearch,
    handleKeyDown,
  };
};
