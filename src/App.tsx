import React, { useState, useEffect } from 'react';
import {
  SectionId,
  UserProgress,
  ExamResultRecord,
} from './types';
import { STAGES, SECTIONS_DATA } from './data/curriculum';
import {
  loadProgress,
  saveProgress,
  toggleSectionComplete,
  saveNote,
  addExamResult,
} from './utils/storage';
import { SectionDetailView } from './components/SectionDetailView';
import { ExamGenerator } from './components/ExamGenerator';
import {
  BookOpen,
  Trophy,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Volume2,
  Volume1,
  ArrowRight,
  Flame,
  GraduationCap,
} from 'lucide-react';

export const App: React.FC = () => {
  // App State
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [activeSectionId, setActiveSectionId] = useState<SectionId | null>(null);
  const [currentView, setCurrentView] = useState<'curriculum' | 'exam-center'>('curriculum');

  // Sync progress
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Overall calculations
  const totalSections = Object.keys(SECTIONS_DATA).length;
  const completedCount = progress.completedSections.length;
  const progressPercentage = Math.round((completedCount / totalSections) * 100);

  const handleToggleComplete = (sId: SectionId) => {
    const updated = toggleSectionComplete(sId, progress);
    setProgress(updated);
  };

  const handleSaveNote = (sId: string, note: string) => {
    const updated = saveNote(sId, note, progress);
    setProgress(updated);
  };

  const handleSaveExamResult = (result: ExamResultRecord) => {
    const updated = addExamResult(result, progress);
    setProgress(updated);
  };

  const toggleRomanization = () => {
    const updated: UserProgress = {
      ...progress,
      showRomanization: !progress.showRomanization,
    };
    setProgress(updated);
  };

  const toggleSpeed = () => {
    const updated: UserProgress = {
      ...progress,
      audioSpeed: progress.audioSpeed === 1.0 ? 0.7 : 1.0,
    };
    setProgress(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-800 w-full overflow-x-hidden">
      {/* 1. TOP GLOBAL NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs w-full">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Immersion Brand */}
          <div
            onClick={() => {
              setActiveSectionId(null);
              setCurrentView('curriculum');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
              한
            </div>
            <div>
              <span className="font-playful text-lg sm:text-xl font-bold tracking-tight text-stone-900 block leading-tight">
                K-Start <span className="text-amber-600 font-extrabold">한글</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 block -mt-0.5 hidden xs:block">
                5-Year-Old Immersion
              </span>
            </div>
          </div>

          {/* Quick Controls: Romanization Toggle, Audio Speed & Views */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* View Switchers */}
            <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200">
              <button
                onClick={() => {
                  setCurrentView('curriculum');
                  setActiveSectionId(null);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'curriculum' && activeSectionId === null
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Modules</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('exam-center');
                  setActiveSectionId(null);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'exam-center'
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xs:inline">Smart</span> <span>Exam</span>
              </button>
            </div>

            {/* Romanization Toggle */}
            <button
              onClick={toggleRomanization}
              title={progress.showRomanization ? 'Hide Romanization' : 'Show Romanization'}
              className={`p-1.5 sm:p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                progress.showRomanization
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-stone-100 text-stone-400 border-stone-200 line-through'
              }`}
            >
              {progress.showRomanization ? <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="hidden sm:inline">Rom</span>
            </button>

            {/* Audio Speed Toggle */}
            <button
              onClick={toggleSpeed}
              title={`Switch audio speed (Current: ${progress.audioSpeed}x)`}
              className="px-2 sm:px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition-all shrink-0"
            >
              {progress.audioSpeed === 1.0 ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume1 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />}
              <span>{progress.audioSpeed}x</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. SUB-BANNER / PROGRESS BAR */}
      <div className="bg-amber-100/60 border-b border-amber-200/60 py-2.5 sm:py-3 w-full">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 shrink-0">
              <Flame className="w-4 h-4 text-amber-600" />
              <span className="hidden xs:inline">Mastery:</span>
            </span>
            <div className="flex-1 max-w-xs sm:max-w-md bg-white/80 h-2 sm:h-2.5 rounded-full overflow-hidden border border-amber-300/60 shrink-0">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-extrabold text-amber-900 shrink-0 text-[11px] sm:text-xs">
              {completedCount}/{totalSections} ({progressPercentage}%)
            </span>
          </div>

          <div className="text-stone-500 text-[11px] shrink-0">
            {activeSectionId ? (
              <button
                onClick={() => setActiveSectionId(null)}
                className="hover:text-amber-800 font-semibold cursor-pointer underline flex items-center gap-1"
              >
                ← Back to Curriculum
              </button>
            ) : (
              <span className="hidden md:inline">💡 Tip: Click "Mark Section as Complete" when mastered!</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. MAIN APP VIEW CONTENT */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {/* VIEW A: SINGLE SECTION IN-DEPTH DRILLDOWN */}
        {activeSectionId && SECTIONS_DATA[activeSectionId] && (
          <SectionDetailView
            section={SECTIONS_DATA[activeSectionId]}
            isCompleted={progress.completedSections.includes(activeSectionId)}
            onToggleComplete={() => handleToggleComplete(activeSectionId)}
            note={progress.customNotes[activeSectionId] || ''}
            onSaveNote={(nt) => handleSaveNote(activeSectionId, nt)}
            showRomanization={progress.showRomanization}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {/* VIEW B: SMART EXAM CENTER */}
        {!activeSectionId && currentView === 'exam-center' && (
          <ExamGenerator
            completedSectionIds={progress.completedSections}
            onSaveExamResult={handleSaveExamResult}
            showRomanization={progress.showRomanization}
            audioSpeed={progress.audioSpeed}
          />
        )}

        {/* VIEW C: MAIN CURRICULUM OVERVIEW DASHBOARD */}
        {!activeSectionId && currentView === 'curriculum' && (
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 w-full">
            {/* Hero Welcome Box */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-400 to-amber-600 rounded-3xl p-5 sm:p-8 lg:p-10 text-white shadow-md relative overflow-hidden w-full">
              <div className="relative z-10 max-w-3xl space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs">
                  Natural Language Immersion
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  Learn Korean the way a 5-year-old child naturally does.
                </h1>
                <p className="text-amber-50 text-xs sm:text-sm lg:text-base leading-relaxed">
                  No academic jargon or intimidating grammar rules. Start with sounds, mouth shapes, and toy LEGO blocks. Then watch sentences naturally click together!
                </p>

                <div className="pt-2 sm:pt-4 flex flex-wrap gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setActiveSectionId('hangul-vowels')}
                    className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white text-stone-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-amber-50 transition-all cursor-pointer active:scale-95 text-center"
                  >
                    Start From Stage 1 →
                  </button>
                  <button
                    onClick={() => setCurrentView('exam-center')}
                    className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-amber-900/30 border border-white/30 text-white font-extrabold text-xs sm:text-sm hover:bg-amber-900/50 transition-all cursor-pointer text-center"
                  >
                    Take a Smart Exam
                  </button>
                </div>
              </div>

              {/* Decorative Korean character watermarks */}
              <div className="absolute -right-4 -bottom-10 text-[140px] sm:text-[180px] font-black font-hangul text-white/10 select-none pointer-events-none hidden sm:block">
                한글
              </div>
            </div>

            {/* Stage-by-Stage Curriculum Accordions / Sections */}
            <div className="space-y-6 sm:space-y-8">
              {STAGES.map((stage) => {
                const stageSections = stage.sectionIds
                  .map((id) => SECTIONS_DATA[id])
                  .filter(Boolean);
                const stageCompletedCount = stage.sectionIds.filter((id) =>
                  progress.completedSections.includes(id)
                ).length;

                return (
                  <div
                    key={stage.id}
                    className="bg-white rounded-3xl border-2 border-stone-200 p-4 sm:p-6 lg:p-8 shadow-xs space-y-4 sm:space-y-5 w-full"
                  >
                    {/* Stage Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                            Stage {stage.stageNumber}
                          </span>
                          <span className="text-xs font-semibold text-stone-400">
                            {stageCompletedCount} / {stage.sectionIds.length} Mastered
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-stone-900 tracking-tight mt-1 break-words">
                          {stage.title}
                        </h2>
                        <p className="text-xs text-stone-500 break-words">{stage.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-sm text-stone-800">
                          {Math.round((stageCompletedCount / stage.sectionIds.length) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Lesson Cards Grid within this Stage: Responsive 1 col on mobile, 2 col on tablet/desktop, 3 col on large screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                      {stageSections.map((sec) => {
                        const isDone = progress.completedSections.includes(sec.id);
                        return (
                          <div
                            key={sec.id}
                            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all group flex flex-col justify-between ${
                              isDone
                                ? 'border-emerald-300 bg-emerald-50/20'
                                : 'border-stone-200 hover:border-amber-400 hover:bg-stone-50/60'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-hangul text-xs font-bold text-amber-700 break-words">
                                  {sec.koreanTitle}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleComplete(sec.id);
                                  }}
                                  title={isDone ? 'Mark as Incomplete' : 'Mark as Complete'}
                                  className="cursor-pointer shrink-0"
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-stone-300 hover:text-amber-500" />
                                  )}
                                </button>
                              </div>

                              <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-600 transition-colors break-words">
                                {sec.title}
                              </h3>

                              <p className="text-xs text-stone-500 line-clamp-2 break-words">
                                {sec.fiveYearOldSummary}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-3.5 mt-3 border-t border-stone-100 gap-2">
                              <span className="text-[10px] sm:text-[11px] font-semibold text-stone-400 truncate">
                                ⏱️ ~{sec.estimatedMinutes}m • {sec.vocab.length}w
                              </span>

                              <button
                                onClick={() => setActiveSectionId(sec.id)}
                                className="px-3 py-1.5 rounded-xl bg-stone-900 group-hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                              >
                                <span>Learn</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Test History if user took exams */}
            {progress.examHistory.length > 0 && (
              <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-6 shadow-2xs space-y-4 w-full">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Recent Smart Exam History</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {progress.examHistory.slice(0, 3).map((ex) => (
                    <div
                      key={ex.id}
                      className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{ex.date}</span>
                        <span className="text-amber-700">
                          {ex.score} / {ex.totalQuestions} ({Math.round((ex.score / ex.totalQuestions) * 100)}%)
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] capitalize">Focus: {ex.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-amber-200/60 bg-white py-6 text-center text-xs text-stone-400 w-full mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-stone-600">
            K-Start Korean Immersion • Designed for Mobile, Tablet, and Desktop Screens
          </p>
          <p>
            Powered by Web Speech API (ko-KR) • All progress persisted in local browser storage
          </p>
        </div>
      </footer>
    </div>
  );
};
