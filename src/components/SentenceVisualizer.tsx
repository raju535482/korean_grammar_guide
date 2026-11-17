import React, { useState } from 'react';
import { WordBreakdown } from '../types';
import { AudioButton } from './AudioButton';

interface SentenceVisualizerProps {
  korean: string;
  romanization: string;
  english: string;
  literalBreakdown: WordBreakdown[];
  explanation?: string;
  showRomanization?: boolean;
  audioSpeed?: 1.0 | 0.7;
}

export const SentenceVisualizer: React.FC<SentenceVisualizerProps> = ({
  korean,
  romanization,
  english,
  literalBreakdown,
  explanation,
  showRomanization = true,
  audioSpeed = 1.0,
}) => {
  const getBadgeStyle = (pos: WordBreakdown['partOfSpeech']) => {
    switch (pos) {
      case 'subject':
        return 'bg-blue-50 border-blue-300 text-blue-900 ring-blue-100';
      case 'object':
        return 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-emerald-100';
      case 'verb':
        return 'bg-amber-50 border-amber-300 text-amber-900 ring-amber-100';
      case 'particle':
        return 'bg-purple-50 border-purple-300 text-purple-900 ring-purple-100';
      case 'noun':
        return 'bg-sky-50 border-sky-300 text-sky-900 ring-sky-100';
      case 'adjective':
        return 'bg-rose-50 border-rose-300 text-rose-900 ring-rose-100';
      default:
        return 'bg-stone-50 border-stone-300 text-stone-900 ring-stone-100';
    }
  };

  const getPosLabel = (pos: WordBreakdown['partOfSpeech']) => {
    switch (pos) {
      case 'subject':
        return 'Subject (주어)';
      case 'object':
        return 'Object (목적어)';
      case 'verb':
        return 'Verb (동사)';
      case 'particle':
        return 'Particle (조사)';
      case 'noun':
        return 'Noun (명사)';
      case 'adjective':
        return 'Adjective (형용사)';
      default:
        return 'Word';
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-amber-200/80 p-4 sm:p-5 shadow-xs space-y-4 hover:border-amber-300 transition-colors w-full">
      {/* Top Bar with audio */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-3">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-hangul text-xl sm:text-2xl font-bold text-stone-900 tracking-wide break-words">
              {korean}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <AudioButton text={korean} speed={audioSpeed} size="sm" />
              <AudioButton text={korean} speed={0.7} size="sm" variant="ghost" label="0.7x" />
            </div>
          </div>
          {showRomanization && (
            <p className="text-xs font-mono font-medium text-amber-800/80 tracking-wide break-words">
              {romanization}
            </p>
          )}
        </div>
        <div className="shrink-0">
          <span className="inline-block px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
            SOV Structure
          </span>
        </div>
      </div>

      {/* English Natural Meaning */}
      <div className="flex flex-wrap items-baseline gap-2 text-stone-700">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 shrink-0">
          Natural Meaning:
        </span>
        <span className="text-sm sm:text-base font-semibold text-stone-900 break-words">
          “{english}”
        </span>
      </div>

      {/* Interactive Color-Coded Building Blocks */}
      <div>
        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
          Word-by-Word Block Breakdown:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {literalBreakdown.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between border-2 rounded-xl p-2 sm:p-2.5 text-center transition-all hover:scale-[1.02] shadow-2xs ${getBadgeStyle(
                item.partOfSpeech
              )}`}
            >
              <div>
                <span className="font-hangul text-base sm:text-lg font-bold block break-words">
                  {item.korean}
                </span>
                {showRomanization && (
                  <span className="text-[10px] sm:text-[11px] font-mono text-stone-500 block truncate mt-0.5">
                    {item.romanization}
                  </span>
                )}
              </div>
              <div className="mt-2 space-y-1">
                <span className="text-[11px] sm:text-xs font-semibold block px-1.5 py-0.5 rounded bg-white/80 shadow-2xs break-words">
                  {item.literal}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-tight opacity-75 block uppercase truncate">
                  {getPosLabel(item.partOfSpeech)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanatory Note */}
      {explanation && (
        <div className="bg-amber-50/70 border-l-4 border-amber-400 p-3 rounded-r-xl text-xs text-stone-700 leading-relaxed">
          <span className="font-bold text-amber-900">Architecture Tip: </span>
          {explanation}
        </div>
      )}
    </div>
  );
};
