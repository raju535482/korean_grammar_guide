import React, { useState } from 'react';
import { SectionContent } from '../types';
import { AudioButton } from './AudioButton';
import { SentenceVisualizer } from './SentenceVisualizer';
import { GrammarRuleCard } from './GrammarRuleCard';
import { ReadingDialogueViewer } from './ReadingDialogueViewer';
import { ExerciseCard } from './ExerciseCard';
import { HangulCanvas } from './HangulCanvas';
import {
  CheckCircle2,
  Clock,
  Pencil,
  Sparkles,
  Save,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SectionDetailViewProps {
  section: SectionContent;
  isCompleted: boolean;
  onToggleComplete: () => void;
  note: string;
  onSaveNote: (note: string) => void;
  showRomanization: boolean;
  audioSpeed: 1.0 | 0.7;
}

export const SectionDetailView: React.FC<SectionDetailViewProps> = ({
  section,
  isCompleted,
  onToggleComplete,
  note,
  onSaveNote,
  showRomanization,
  audioSpeed,
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'draw' | 'notes'>('learn');
  const [userNote, setUserNote] = useState(note);
  const [isSaved, setIsSaved] = useState(false);

  const handleNoteSave = () => {
    onSaveNote(userNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCompleteClick = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
    onToggleComplete();
  };

  return (
    <div className="space-y-6 w-full">
      {/* Lesson Header Banner */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 p-4 sm:p-6 lg:p-8 shadow-xs space-y-4 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-900">
                Lesson Section
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-stone-400">
                <Clock className="w-3.5 h-3.5" />
                ~{section.estimatedMinutes} mins
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight break-words">
              {section.title}
            </h1>
            <p className="font-hangul text-sm sm:text-base font-bold text-amber-700">
              {section.koreanTitle}
            </p>
          </div>

          {/* Prominent Mark Section as Complete Button */}
          <div className="w-full sm:w-auto">
            <button
              onClick={handleCompleteClick}
              className={`w-full sm:w-auto px-5 sm:px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-100'
                  : 'bg-stone-100 hover:bg-amber-500 hover:text-white text-stone-700 border-2 border-stone-300 hover:border-amber-500'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isCompleted ? 'text-white' : 'text-stone-400'}`} />
              <span>{isCompleted ? 'Completed ✓ (Click to Undo)' : 'Mark Section as Complete'}</span>
            </button>
          </div>
        </div>

        {/* 5-Year-Old Immersion Summary Box */}
        <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-2xl bg-amber-200/70 flex items-center justify-center text-lg sm:text-xl shrink-0">
            👶
          </div>
          <div className="space-y-1 text-xs min-w-0">
            <span className="font-bold uppercase tracking-wider text-amber-900 block">
              Intuitive 5-Year-Old Immersion Idea:
            </span>
            <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed break-words">
              {section.fiveYearOldSummary}
            </p>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-2">
          {[
            { id: 'learn', label: '📖 Lesson Guide', count: section.vocab.length },
            { id: 'practice', label: '🎯 4-Skill Practice', count: section.exercises.length },
            { id: 'draw', label: '✍️ Hangul Canvas', count: null },
            { id: 'notes', label: '📝 My Notes', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-stone-200 shrink-0">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: LEARN (Vocabulary, Sentences & Grammar Cards) */}
      {activeTab === 'learn' && (
        <div className="space-y-6 lg:space-y-8 w-full">
          {/* Detailed Guide Points */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-2xs space-y-3">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-400">
              Core Concepts to Grasp:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              {section.detailedGuide.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="break-words">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vocabulary Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>Core Vocabulary & Sounds</span>
                <span className="text-xs font-normal text-stone-400">
                  ({section.vocab.length} items)
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {section.vocab.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl border-2 border-stone-200 p-4 shadow-xs space-y-2 hover:border-amber-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {v.emoji && <span className="text-xl shrink-0">{v.emoji}</span>}
                          <span className="font-hangul text-xl sm:text-2xl font-bold text-stone-900 truncate">
                            {v.korean}
                          </span>
                        </div>
                        {showRomanization && (
                          <p className="text-xs font-mono font-medium text-amber-700 truncate">
                            {v.romanization}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <AudioButton text={v.audioText || v.korean} speed={audioSpeed} size="sm" />
                        <AudioButton text={v.audioText || v.korean} speed={0.7} size="sm" variant="ghost" label="0.7x" />
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-stone-800 border-t border-stone-100 pt-2 break-words">
                      {v.english}
                    </p>
                  </div>

                  {v.tips && (
                    <p className="text-[11px] text-stone-500 italic bg-stone-50 p-2 rounded-lg break-words mt-2">
                      💡 {v.tips}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Grammar Rule Cards */}
          {section.grammarCards.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Grammar Rules & "Do / Don't" Cards
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {section.grammarCards.map((card) => (
                  <GrammarRuleCard
                    key={card.id}
                    card={card}
                    showRomanization={showRomanization}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Interactive Sentence Architecture Visualizers */}
          {section.sentences.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Sentence Architecture & Particle Breakdown
              </h3>
              <div className="space-y-4">
                {section.sentences.map((st) => (
                  <SentenceVisualizer
                    key={st.id}
                    korean={st.korean}
                    romanization={st.romanization}
                    english={st.english}
                    literalBreakdown={st.literalBreakdown}
                    explanation={st.explanation}
                    showRomanization={showRomanization}
                    audioSpeed={audioSpeed}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mini-Story Reading Dialogue */}
          {section.story && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Interactive Reading Dialogue
              </h3>
              <ReadingDialogueViewer
                story={section.story}
                showRomanization={showRomanization}
              />
            </div>
          )}

          {/* Bottom Complete Banner */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-stone-900">
                Ready to validate your skills?
              </h4>
              <p className="text-xs text-stone-500">
                Practice the 4 language pillars or mark this section complete to include it in the Smart Exam!
              </p>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('practice')}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-amber-300 font-bold text-xs text-amber-900 hover:bg-amber-100 cursor-pointer text-center"
              >
                Go to Practice
              </button>
              <button
                onClick={handleCompleteClick}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer shadow-sm active:scale-95 text-center"
              >
                {isCompleted ? 'Mark as Incomplete' : 'Mark Complete ✓'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 4-SKILL PRACTICE EXERCISES */}
      {activeTab === 'practice' && (
        <div className="space-y-6 w-full">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Work through these listening, typing, reading, and speaking exercises to solidify your memory.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {section.exercises.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                showRomanization={showRomanization}
                audioSpeed={audioSpeed}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HANGUL CANVAS DRAWING PRACTICE */}
      {activeTab === 'draw' && (
        <div className="space-y-6 w-full">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              Interactive Hangul Stroke Guide
            </h3>
            <p className="text-xs text-stone-500">
              Draw and trace Korean characters right on your screen to build tactile muscle memory!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {section.vocab.slice(0, 4).map((v) => (
              <HangulCanvas
                key={v.id}
                targetCharacter={v.korean}
                romanization={v.romanization}
                english={v.english}
                strokeHint={v.tips}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PERSONAL SECTION NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-4 sm:p-6 lg:p-8 shadow-xs space-y-4 w-full">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Personal Study Notes for {section.title}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Write down your personal mnemonics, reminders, or questions. These are saved automatically in your browser storage.
            </p>
          </div>

          <textarea
            rows={8}
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Write your notes here... (e.g., 'ㄴ reminds me of a nose pointing forward!')"
            className="w-full p-4 rounded-2xl border-2 border-stone-200 focus:border-amber-500 focus:outline-hidden text-sm text-stone-800 leading-relaxed font-sans"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-emerald-600 font-semibold">
              {isSaved ? 'Notes saved to your browser! ✓' : ''}
            </span>
            <button
              onClick={handleNoteSave}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <Save className="w-4 h-4" />
              Save Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
