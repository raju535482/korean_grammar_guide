import React, { useState } from 'react';
import { StoryOrDialogue, WordBreakdown } from '../types';
import { BookOpen, Sparkles, X } from 'lucide-react';
import { AudioButton } from './AudioButton';

interface ReadingDialogueViewerProps {
  story: StoryOrDialogue;
  showRomanization?: boolean;
}

export const ReadingDialogueViewer: React.FC<ReadingDialogueViewerProps> = ({
  story,
  showRomanization = true,
}) => {
  const [selectedWord, setSelectedWord] = useState<WordBreakdown | null>(null);

  return (
    <div className="bg-white rounded-2xl border-2 border-stone-200 p-4 sm:p-6 shadow-xs space-y-5 w-full">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between border-b border-stone-100 pb-4 gap-2">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Mini-Story</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 break-words">{story.title}</h3>
          <p className="font-hangul text-xs sm:text-sm font-semibold text-stone-500 mt-0.5">
            {story.koreanTitle}
          </p>
        </div>
        <p className="text-[11px] sm:text-xs text-stone-400 italic max-w-xs text-left sm:text-right">
          {story.context}
        </p>
      </div>

      <div className="text-xs text-stone-500 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Click on any word block below to reveal its grammar role & definition!</span>
      </div>

      {/* Dialogue Conversation Turns */}
      <div className="space-y-3 sm:space-y-4">
        {story.turns.map((turn, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-stone-50/70 border border-stone-100 hover:bg-stone-50 transition-colors"
          >
            {/* Speaker Avatar */}
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-2xs">
              {turn.speakerEmoji}
            </div>

            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wide truncate">
                  {turn.speaker}
                </span>
                <AudioButton text={turn.korean} size="sm" />
              </div>

              {/* Clickable Interactive Korean sentence words */}
              <div className="flex flex-wrap items-center gap-1.5 py-1">
                {turn.breakdown.map((wd, wIdx) => (
                  <button
                    key={wIdx}
                    onClick={() => setSelectedWord(wd)}
                    className="font-hangul text-sm sm:text-base font-bold text-stone-900 px-2 py-1 rounded-lg bg-white border border-stone-200 hover:border-amber-400 hover:bg-amber-50/80 active:scale-95 transition-all cursor-pointer shadow-2xs break-words"
                  >
                    {wd.korean}
                  </button>
                ))}
              </div>

              {showRomanization && (
                <p className="text-[11px] sm:text-xs font-mono text-stone-400 break-words">{turn.romanization}</p>
              )}

              <p className="text-xs sm:text-sm font-medium text-stone-700 break-words">
                "{turn.english}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clicked Word Pop-up Modal / Drawer */}
      {selectedWord && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-md space-y-2 relative animate-in fade-in zoom-in-95 duration-150">
          <button
            onClick={() => setSelectedWord(null)}
            className="absolute top-3 right-3 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-amber-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 pr-8">
            <span className="font-hangul text-xl sm:text-2xl font-black text-amber-900">
              {selectedWord.korean}
            </span>
            <span className="text-xs font-mono text-amber-700">
              [{selectedWord.romanization}]
            </span>
            <AudioButton text={selectedWord.korean} size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
              <span className="text-stone-400 uppercase font-bold text-[10px] block">
                Literal Meaning
              </span>
              <span className="font-semibold text-stone-800 break-words">{selectedWord.literal}</span>
            </div>
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
              <span className="text-stone-400 uppercase font-bold text-[10px] block">
                Grammar Pillar
              </span>
              <span className="font-semibold text-amber-800 capitalize break-words">
                {selectedWord.partOfSpeech}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
