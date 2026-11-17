import { UserProgress, SectionId, ExamResultRecord } from '../types';

const STORAGE_KEY = 'k_start_korean_learning_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  completedSections: ['hangul-vowels'], // Default 1 completed so user sees immediate dashboard state & test generator works
  showRomanization: true,
  audioSpeed: 1.0,
  customNotes: {},
  examHistory: [],
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function toggleSectionComplete(sectionId: SectionId, current: UserProgress): UserProgress {
  const isCompleted = current.completedSections.includes(sectionId);
  const updatedCompleted = isCompleted
    ? current.completedSections.filter((id) => id !== sectionId)
    : [...current.completedSections, sectionId];

  const updated: UserProgress = {
    ...current,
    completedSections: updatedCompleted,
  };
  saveProgress(updated);
  return updated;
}

export function saveNote(sectionId: string, note: string, current: UserProgress): UserProgress {
  const updated: UserProgress = {
    ...current,
    customNotes: {
      ...current.customNotes,
      [sectionId]: note,
    },
  };
  saveProgress(updated);
  return updated;
}

export function addExamResult(result: ExamResultRecord, current: UserProgress): UserProgress {
  const updated: UserProgress = {
    ...current,
    examHistory: [result, ...current.examHistory],
  };
  saveProgress(updated);
  return updated;
}
