import React from 'react';

// Common Hangul jamo layout for on-screen typing assistance
const CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ'];

interface HangulKeyboardProps {
  onInsert: (char: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onClear: () => void;
}

export const HangulKeyboard: React.FC<HangulKeyboardProps> = ({
  onInsert,
  onBackspace,
  onSpace,
  onClear,
}) => {
  return (
    <div className="bg-stone-100/90 border border-stone-200 rounded-2xl p-2.5 sm:p-3 shadow-inner space-y-2 w-full">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider px-1">
        <span>On-Screen Hangul Helper Keyboard</span>
        <button
          onClick={onClear}
          className="text-stone-400 hover:text-stone-700 underline cursor-pointer"
        >
          Clear Input
        </button>
      </div>

      {/* Consonants Row */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
        {CONSONANTS.map((c) => (
          <button
            key={c}
            onClick={() => onInsert(c)}
            className="w-7 sm:w-8 h-8 sm:h-9 rounded-lg bg-white border border-stone-300 font-hangul text-sm sm:text-base font-bold text-stone-800 hover:bg-amber-100 hover:border-amber-400 active:scale-95 transition-all shadow-2xs cursor-pointer flex items-center justify-center"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Vowels Row */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
        {VOWELS.map((v) => (
          <button
            key={v}
            onClick={() => onInsert(v)}
            className="w-7 sm:w-8 h-8 sm:h-9 rounded-lg bg-amber-50/80 border border-amber-200 font-hangul text-sm sm:text-base font-bold text-amber-900 hover:bg-amber-200 hover:border-amber-400 active:scale-95 transition-all shadow-2xs cursor-pointer flex items-center justify-center"
          >
            {v}
          </button>
        ))}
      </div>

      {/* Control Buttons (Space, Backspace) */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <button
          onClick={onSpace}
          className="flex-1 max-w-[160px] py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer shadow-2xs text-center"
        >
          Space (띄어쓰기)
        </button>
        <button
          onClick={onBackspace}
          className="px-4 py-2 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-100 active:scale-95 transition-all cursor-pointer shadow-2xs text-center"
        >
          ⌫ Backspace
        </button>
      </div>
    </div>
  );
};
