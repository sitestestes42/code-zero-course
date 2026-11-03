import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

export type ProgressState = {
  completedLessonIds: string[];
  quizAttempts: Record<string, { score: number; total: number; at: string }>;
  projectLinks: Record<string, string>;
  completedProjects: string[];
};

type ProgressContextValue = ProgressState & {
  loading: boolean;
  syncError: string | null;
  markLessonComplete: (lessonId: string) => void;
  recordQuizAttempt: (quizId: string, score: number, total: number) => void;
  saveProjectLink: (projectId: string, link: string) => void;
  toggleProjectComplete: (projectId: string) => void;
  refresh: () => Promise<void>;
};

const storageKey = "codigozero-progress-v1";
const emptyProgress: ProgressState = { completedLessonIds: [], quizAttempts: {}, projectLinks: {}, completedProjects: [] };
const ProgressContext = createContext<ProgressContextValue | null>(null);

function readLocal(): ProgressState {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? { ...emptyProgress, ...JSON.parse(stored) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

function writeLocal(value: ProgressState) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Some private browsing contexts can disable localStorage. The UI still works in memory.
  }
}

async function getRemoteProgress(): Promise<ProgressState | null> {
  if (!supabase) return null;
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return null;
  const { data, error } = await supabase.from("lesson_progress").select("payload").eq("user_id", authData.user.id).maybeSingle();
  if (error || !data?.payload) return null;
  return { ...emptyProgress, ...(data.payload as Partial<ProgressState>) };
}

async function saveRemoteProgress(value: ProgressState) {
  if (!supabase) return;
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) return;
  const { error } = await supabase.from("lesson_progress").upsert({ user_id: authData.user.id, payload: value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => readLocal());
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setSyncError(null);
    const local = readLocal();
    setProgress(local);
    try {
      const remote = await getRemoteProgress();
      if (remote) {
        setProgress(remote);
        writeLocal(remote);
      }
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : "Não foi possível sincronizar agora.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const update = useCallback((updater: (current: ProgressState) => ProgressState) => {
    setProgress((current) => {
      const next = updater(current);
      writeLocal(next);
      void saveRemoteProgress(next).catch((error) => setSyncError(error instanceof Error ? error.message : "Falha ao sincronizar."));
      return next;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(() => ({
    ...progress,
    loading,
    syncError,
    markLessonComplete: (lessonId) => update((current) => ({ ...current, completedLessonIds: current.completedLessonIds.includes(lessonId) ? current.completedLessonIds : [...current.completedLessonIds, lessonId] })),
    recordQuizAttempt: (quizId, score, total) => update((current) => ({ ...current, quizAttempts: { ...current.quizAttempts, [quizId]: { score, total, at: new Date().toISOString() } } })),
    saveProjectLink: (projectId, link) => update((current) => ({ ...current, projectLinks: { ...current.projectLinks, [projectId]: link } })),
    toggleProjectComplete: (projectId) => update((current) => ({ ...current, completedProjects: current.completedProjects.includes(projectId) ? current.completedProjects.filter((id) => id !== projectId) : [...current.completedProjects, projectId] })),
    refresh,
  }), [loading, progress, refresh, syncError, update]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress precisa estar dentro de ProgressProvider");
  return context;
}
