import React, { useState } from 'react';
import { SectionId, PracticeExercise, ExamResultRecord } from '../types';
import { SECTIONS_DATA } from '../data/curriculum';
import { ExerciseCard } from './ExerciseCard';
import {
  Sparkles,
  Trophy,
  Sliders,
  CheckCircle2,
  XCircle,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamGeneratorProps {
  completedSectionIds: SectionId[];
  onSaveExamResult: (result: ExamResultRecord) => void;
  showRomanization?: boolean;
  audioSpeed?: 1.0 | 0.7;
}

export const ExamGenerator: React.FC<ExamGeneratorProps> = ({
  completedSectionIds,
  onSaveExamResult,
  showRomanization = true,
  audioSpeed = 1.0,
}) => {
  // Test Configuration States
  const [selectedSections, setSelectedSections] = useState<SectionId[]>(
    completedSectionIds.length > 0 ? [...completedSectionIds] : ['hangul-vowels']
  );
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [testFocus, setTestFocus] = useState<'all' | 'grammar' | 'listening-speaking' | 'reading-writing'>('all');

  // Active Test States
  const [examActive, setExamActive] = useState(false);
  const [examQuestions, setExamQuestions] = useState<PracticeExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersRecord, setAnswersRecord] = useState<
    {
      question: PracticeExercise;
      isCorrect: boolean;
      userAnswer?: string;
    }[]
  >([]);
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  // Toggle module selection
  const handleToggleSection = (sId: SectionId) => {
    if (selectedSections.includes(sId)) {
      if (selectedSections.length === 1) return; // Keep at least one
      setSelectedSections(selectedSections.filter((id) => id !== sId));
    } else {
      setSelectedSections([...selectedSections, sId]);
    }
  };

  // Generate dynamic test strictly filtered by user-selected completed sections
  const handleStartExam = () => {
    const pool: PracticeExercise[] = [];

    selectedSections.forEach((secId) => {
      const section = SECTIONS_DATA[secId];
      if (section && section.exercises) {
        section.exercises.forEach((ex) => {
          let matchesFocus = true;
          if (testFocus === 'grammar') {
            matchesFocus = ex.type === 'sentence-unscramble' || ex.type === 'dictation';
          } else if (testFocus === 'listening-speaking') {
            matchesFocus = ex.type === 'listen-select' || ex.type === 'speaking-test';
          } else if (testFocus === 'reading-writing') {
            matchesFocus = ex.type === 'dictation' || ex.type === 'sentence-unscramble';
          }

          if (matchesFocus) {
            pool.push(ex);
          }
        });
      }
    });

    if (pool.length === 0) {
      selectedSections.forEach((secId) => {
        const s = SECTIONS_DATA[secId];
        if (s && s.exercises) pool.push(...s.exercises);
      });
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const finalSet = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setExamQuestions(finalSet);
    setCurrentIndex(0);
    setAnswersRecord([]);
    setIsExamCompleted(false);
    setExamActive(true);
  };

  const handleExerciseResult = (isCorrect: boolean) => {
    const currentQ = examQuestions[currentIndex];
    const newRecord = [
      ...answersRecord,
      {
        question: currentQ,
        isCorrect,
      },
    ];
    setAnswersRecord(newRecord);

    if (currentIndex + 1 < examQuestions.length) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 900);
    } else {
      setTimeout(() => {
        finishExam(newRecord);
      }, 900);
    }
  };

  const finishExam = (record: { question: PracticeExercise; isCorrect: boolean }[]) => {
    setIsExamCompleted(true);
    const score = record.filter((r) => r.isCorrect).length;

    if (score / record.length >= 0.7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const missed = record
      .filter((r) => !r.isCorrect)
      .map((r) => ({
        prompt: r.question.prompt,
        targetKorean: r.question.targetKorean || r.question.correctAnswer || '',
        userAnswer: 'Incorrect answer',
        correctAnswer: r.question.correctAnswer || r.question.targetKorean || '',
        explanation: r.question.explanation,
      }));

    const resultRecord: ExamResultRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score,
      totalQuestions: record.length,
      sectionsTested: selectedSections,
      focus: testFocus,
      missedQuestions: missed,
    };

    onSaveExamResult(resultRecord);
  };

  const handleRetake = () => {
    setExamActive(false);
    setIsExamCompleted(false);
  };

  return (
    <div className="space-y-6 w-full">
      {/* 1. SETUP / CONFIGURATION SCREEN */}
      {!examActive && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-4 sm:p-6 lg:p-8 shadow-xs space-y-6 w-full">
          <div className="flex flex-wrap items-start justify-between border-b border-stone-100 pb-4 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100 text-amber-800 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Adaptive Smart Exam Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight">
                Create Your Custom Mastery Test
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
                Questions are dynamically drawn <strong>strictly from modules you have marked complete</strong>, ensuring you are never tested on unfamiliar concepts!
              </p>
            </div>
          </div>

          {/* Module Selector */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-amber-500" />
                Select Completed Sections to Include:
              </label>
              <span className="text-xs text-stone-400 font-semibold">
                {selectedSections.length} modules selected
              </span>
            </div>

            {completedSectionIds.length === 0 ? (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                You haven't marked any sections complete yet! Go back to any lesson and click <strong>"Mark Section as Complete"</strong> when you are ready. For now, Section 1 is enabled for testing.
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {(completedSectionIds.length > 0 ? completedSectionIds : (['hangul-vowels'] as SectionId[])).map((sId) => {
                const s = SECTIONS_DATA[sId];
                if (!s) return null;
                const isSelected = selectedSections.includes(sId);
                return (
                  <button
                    key={sId}
                    type="button"
                    onClick={() => handleToggleSection(sId)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/80 text-amber-950 ring-2 ring-amber-200'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold truncate">{s.title}</p>
                      <p className="font-hangul text-[11px] text-stone-500 truncate">{s.koreanTitle}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected ? 'bg-amber-500 text-white' : 'border border-stone-300'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Focus & Question Count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Focus */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-500" />
                Test Skill Focus:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All 4 Pillars', emoji: '🌟' },
                  { id: 'grammar', label: 'Grammar Only', emoji: '📐' },
                  { id: 'listening-speaking', label: 'Listen & Speak', emoji: '🎙️' },
                  { id: 'reading-writing', label: 'Read & Write', emoji: '✍️' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTestFocus(f.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      testFocus === f.id
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="block text-base mb-0.5">{f.emoji}</span>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Number of Questions:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                      questionCount === num
                        ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-2xs'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              onClick={handleStartExam}
              disabled={selectedSections.length === 0}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              Start Exam Now ({questionCount} Questions)
            </button>
          </div>
        </div>
      )}

      {/* 2. ACTIVE EXAM TEST IN PROGRESS */}
      {examActive && !isExamCompleted && examQuestions.length > 0 && (
        <div className="space-y-4 w-full">
          {/* Progress Header */}
          <div className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 shadow-2xs flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {examQuestions.length}
              </span>
              <div className="w-32 sm:w-48 md:w-64 bg-stone-100 h-2 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / examQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <button
              onClick={handleRetake}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 underline cursor-pointer shrink-0"
            >
              Quit Exam
            </button>
          </div>

          {/* Current Question Exercise Card */}
          <ExerciseCard
            key={currentIndex}
            exercise={examQuestions[currentIndex]}
            onComplete={handleExerciseResult}
            showRomanization={showRomanization}
            audioSpeed={audioSpeed}
          />
        </div>
      )}

      {/* 3. EXAM FINISHED: SCORE REPORT & REVIEW OF MISTAKES */}
      {examActive && isExamCompleted && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-5 sm:p-8 shadow-xs space-y-6 w-full">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 text-3xl flex items-center justify-center mx-auto shadow-inner">
              🏆
            </div>
            <h3 className="text-2xl font-black text-stone-900">Exam Complete!</h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Here is how you performed across your mastered modules:
            </p>
          </div>

          {/* Big Score Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-900">
              {answersRecord.filter((r) => r.isCorrect).length} / {answersRecord.length}
            </div>
            <p className="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider">
              {Math.round(
                (answersRecord.filter((r) => r.isCorrect).length /
                  answersRecord.length) *
                  100
              )}
              % Mastery Score
            </p>
          </div>

          {/* Review of Mistakes if any */}
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-stone-900 flex flex-wrap items-center gap-2">
              <span>Detailed Question Review</span>
              <span className="text-xs font-normal text-stone-400">
                ({answersRecord.filter((r) => !r.isCorrect).length} mistakes to review)
              </span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {answersRecord.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 space-y-2 text-xs flex flex-col justify-between ${
                    rec.isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5 truncate pr-2">
                        {rec.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        Q{idx + 1}: {rec.question.prompt}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider shrink-0">
                        {rec.isCorrect ? 'Correct' : 'Missed'}
                      </span>
                    </div>

                    {rec.question.targetKorean && (
                      <p className="font-hangul text-sm sm:text-base font-bold text-stone-900 pt-1">
                        Target: {rec.question.targetKorean}
                      </p>
                    )}
                  </div>

                  <p className="text-stone-700 leading-relaxed border-t border-stone-200/50 pt-2 mt-2">
                    💡 {rec.question.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-stone-300 font-bold text-xs text-stone-700 hover:bg-stone-50 cursor-pointer text-center"
            >
              Configure Another Test
            </button>
            <button
              onClick={handleStartExam}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer shadow-sm active:scale-95 text-center"
            >
              Retake This Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
