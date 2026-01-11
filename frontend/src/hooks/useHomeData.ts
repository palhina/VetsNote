import { useState, useEffect, useCallback } from "react";
import { useApiRequest } from "./useApiRequest";
import { useAuth } from "./useAuth";
import type { PatientCase, SeminarNote } from "../types";

interface UseHomeDataReturn {
  cases: PatientCase[];
  notes: SeminarNote[];
  isLoading: boolean;
  handleDeleteCase: (id: number) => void;
  handleDeleteNote: (id: number) => void;
}

export const useHomeData = (): UseHomeDataReturn => {
  const { user } = useAuth();
  const { execute: fetchCases, isLoading: casesLoading } =
    useApiRequest<PatientCase[]>();
  const { execute: fetchNotes, isLoading: notesLoading } =
    useApiRequest<SeminarNote[]>();

  const [cases, setCases] = useState<PatientCase[]>([]);
  const [notes, setNotes] = useState<SeminarNote[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [casesData, notesData] = await Promise.all([
          fetchCases("/api/patient-cases", { method: "GET" }),
          fetchNotes("/api/seminar-notes", { method: "GET" }),
        ]);
        setCases(casesData);
        setNotes(notesData);
      } catch (err) {
        console.error("データの取得に失敗しました", err);
      }
    };

    if (user) {
      loadData();
    }
  }, [user, fetchCases, fetchNotes]);

  const handleDeleteCase = useCallback((id: number) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleDeleteNote = useCallback((id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    cases,
    notes,
    isLoading: casesLoading || notesLoading,
    handleDeleteCase,
    handleDeleteNote,
  };
};
