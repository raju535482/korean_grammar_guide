import React, { useState, useEffect } from 'react';
import { PracticeExercise } from '../types';
import { AudioButton } from './AudioButton';
import { HangulKeyboard } from './HangulKeyboard';
import {
  Mic,
  MicOff,
  CheckCircle,
  XCircle,
  Sparkles,
} from 'lucide-react';
import {
  createSpeechRecognizer,
  isSpeechRecognitionSupported,
  calculateMatchScore,
} from '../utils/speech';
import confetti from 'canvas-confetti';

interface ExerciseCardProps {
  exercise: PracticeExercise;
  onComplete?: (isCorrect: boolean) => void;
  showRomanization?: boolean;
  audioSpeed?: 1.0 | 0.7;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onComplete,
  showRomanization = true,
  audioSpeed = 1.0,
}) => {
  // Common states
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [unscrambledOrder, setUnscrambledOrder] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState(
    exercise.jumbledTokens ? [...exercise.jumbledTokens] : []
  );

  // Speaking state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  // Evaluation states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setTypedAnswer('');
    setUnscrambledOrder([]);
    setAvailableTokens(exercise.jumbledTokens ? [...exercise.jumbledTokens] : []);
    setIsRecording(false);
    setSpokenText('');
    setMatchScore(null);
    setMicError(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [exercise.id]);

  // Handle Token Clicking for Unscramble
  const handleSelectToken = (tokenId: string) => {
    if (isSubmitted) return;
    setUnscrambledOrder((prev) => [...prev, tokenId]);
    setAvailableTokens((prev) => prev.filter((t) => t.id !== tokenId));
  };

  const handleRemoveToken = (tokenId: string) => {
    if (isSubmitted) return;
    const token = exercise.jumbledTokens?.find((t) => t.id === tokenId);
    if (!token) return;
    setUnscrambledOrder((prev) => prev.filter((id) => id !== tokenId));
    setAvailableTokens((prev) => [...prev, token]);
  };

  // Handle Speech Recognition
  const startListening = () => {
    setMicError(null);
    setSpokenText('');
    setMatchScore(null);

    if (!isSpeechRecognitionSupported()) {
      setMicError('Speech recognition is not supported in this browser. Please use Chrome/Edge or type manually.');
      return;
    }

    const recognizer = createSpeechRecognizer(
      (transcript, isFinal) => {
        setSpokenText(transcript);
        if (isFinal) {
          const score = calculateMatchScore(transcript, exercise.targetKorean || '');
          setMatchScore(score);
          setIsRecording(false);
        }
      },
      (error) => {
        setMicError(`Microphone issue: ${error}. Check permissions.`);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (recognizer) {
      setIsRecording(true);
      recognizer.start();
    }
  };

  // Submission Check
  const handleSubmit = () => {
    if (isSubmitted) return;

    let correct = false;

    if (exercise.type === 'listen-select') {
      correct = selectedOption === exercise.correctAnswer;
    } else if (exercise.type === 'dictation') {
      const cleanUser = typedAnswer.replace(/\s+/g, '').trim();
      const cleanTarget = (exercise.correctAnswer || '').replace(/\s+/g, '').trim();
      correct = cleanUser === cleanTarget;
    } else if (exercise.type === 'sentence-unscramble') {
      const builtString = unscrambledOrder
        .map((id) => exercise.jumbledTokens?.find((t) => t.id === id)?.text)
        .join(' ');
      const cleanBuilt = builtString.replace(/\s+/g, '').trim();
      const cleanTarget = (exercise.correctAnswer || '').replace(/\s+/g, '').trim();
      correct = cleanBuilt === cleanTarget;
    } else if (exercise.type === 'speaking-test') {
      correct = (matchScore ?? 0) >= 70;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    if (onComplete) {
      onComplete(correct);
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-stone-200 p-4 sm:p-6 shadow-xs space-y-4 transition-all w-full flex flex-col justify-between">
      <div className="space-y-4">
        {/* Exercise Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-stone-100 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-800">
              {exercise.type === 'listen-select' && '🎧 Listen & Select'}
              {exercise.type === 'dictation' && '✍️ Dictation & Typing'}
              {exercise.type === 'sentence-unscramble' && '🧩 Sentence Unscramble'}
              {exercise.type === 'speaking-test' && '🎙️ Speaking Voice Check'}
            </span>
          </div>
          {exercise.audioTarget && (
            <div className="flex items-center gap-1.5 shrink-0">
              <AudioButton text={exercise.audioTarget} speed={audioSpeed} size="sm" />
              <AudioButton text={exercise.audioTarget} speed={0.7} size="sm" variant="ghost" label="0.7x" />
            </div>
          )}
        </div>

        {/* Exercise Question Prompt */}
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-bold text-stone-900 break-words">{exercise.prompt}</h4>
          {exercise.subPrompt && (
            <p className="text-xs text-stone-500 break-words">{exercise.subPrompt}</p>
          )}
        </div>

        {/* 1. LISTEN & SELECT */}
        {exercise.type === 'listen-select' && exercise.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {exercise.options.map((opt) => (
              <button
                key={opt}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(opt)}
                className={`p-3.5 sm:p-4 rounded-xl border-2 font-hangul text-base sm:text-lg font-bold text-center transition-all cursor-pointer break-words ${
                  selectedOption === opt
                    ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200'
                    : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50 text-stone-800'
                } ${isSubmitted && opt === exercise.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* 2. SENTENCE UNSCRAMBLE */}
        {exercise.type === 'sentence-unscramble' && (
          <div className="space-y-3 pt-1">
            {exercise.targetEnglish && (
              <div className="text-xs sm:text-sm font-semibold text-stone-700 bg-stone-50 p-2.5 sm:p-3 rounded-xl border border-stone-200 break-words">
                Target: <span className="text-amber-800 font-bold">"{exercise.targetEnglish}"</span>
              </div>
            )}

            {/* Drop Zone */}
            <div className="min-h-[54px] p-2 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {unscrambledOrder.length === 0 ? (
                <span className="text-xs text-amber-700/70 italic px-2">
                  Click the blocks below in order to build the sentence...
                </span>
              ) : (
                unscrambledOrder.map((id) => {
                  const token = exercise.jumbledTokens?.find((t) => t.id === id);
                  if (!token) return null;
                  return (
                    <button
                      key={id}
                      disabled={isSubmitted}
                      onClick={() => handleRemoveToken(id)}
                      className="font-hangul text-sm sm:text-base font-bold px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border-2 border-amber-400 text-stone-900 shadow-2xs hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer active:scale-95"
                      title="Click to remove"
                    >
                      {token.text}
                    </button>
                  );
                })
              )}
            </div>

            {/* Word Bank */}
            <div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Available Word Blocks:
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {availableTokens.map((t) => (
                  <button
                    key={t.id}
                    disabled={isSubmitted}
                    onClick={() => handleSelectToken(t.id)}
                    className="font-hangul text-sm sm:text-base font-bold px-3 py-1.5 sm:py-2 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 hover:bg-amber-100 hover:border-amber-400 active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    {t.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. DICTATION / TYPING */}
        {exercise.type === 'dictation' && (
          <div className="space-y-3 pt-1">
            <input
              type="text"
              disabled={isSubmitted}
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Type in Korean..."
              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-stone-300 font-hangul text-lg sm:text-xl focus:border-amber-500 focus:outline-hidden transition-all bg-white shadow-2xs"
            />

            {!isSubmitted && (
              <HangulKeyboard
                onInsert={(ch) => setTypedAnswer((prev) => prev + ch)}
                onBackspace={() => setTypedAnswer((prev) => prev.slice(0, -1))}
                onSpace={() => setTypedAnswer((prev) => prev + ' ')}
                onClear={() => setTypedAnswer('')}
              />
            )}
          </div>
        )}

        {/* 4. SPEAKING VOICE TEST */}
        {exercise.type === 'speaking-test' && (
          <div className="space-y-3 pt-1 text-center">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-1.5">
              <span className="font-hangul text-2xl sm:text-3xl font-black text-amber-900 block break-words">
                {exercise.targetKorean}
              </span>
              {showRomanization && exercise.targetRomanization && (
                <p className="text-xs sm:text-sm font-mono text-amber-700">
                  [{exercise.targetRomanization}]
                </p>
              )}
              <p className="text-xs sm:text-sm font-semibold text-stone-700">
                "{exercise.targetEnglish}"
              </p>
              <div className="pt-2 flex justify-center">
                <AudioButton text={exercise.targetKorean || ''} speed={audioSpeed} label="Hear Native Audio" size="md" variant="primary" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 pt-1">
              <button
                onClick={startListening}
                disabled={isRecording || isSubmitted}
                className={`w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-bounce ring-4 ring-rose-200'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95'
                }`}
              >
                {isRecording ? <MicOff className="w-6 sm:w-8 h-6 sm:h-8" /> : <Mic className="w-6 sm:w-8 h-6 sm:h-8" />}
              </button>
              <span className="text-[11px] sm:text-xs font-semibold text-stone-600">
                {isRecording ? 'Listening now... Speak Korean clearly!' : 'Click mic & speak'}
              </span>
            </div>

            {micError && (
              <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {micError}
              </div>
            )}

            {spokenText && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <div className="text-[10px] sm:text-xs text-stone-400 uppercase font-bold">You Said:</div>
                <p className="font-hangul text-base sm:text-lg font-bold text-stone-800 break-words">{spokenText}</p>
                {matchScore !== null && (
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="text-xs font-bold">Match Score:</span>
                    <span
                      className={`text-xs sm:text-sm font-extrabold ${
                        matchScore >= 70 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {matchScore}%
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer: Check Answer / Next */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 mt-2">
        <div className="text-[11px] sm:text-xs text-stone-500">
          {!isSubmitted && 'Give it your best shot!'}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer text-center"
          >
            Check Answer
          </button>
        ) : (
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isCorrect ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
              {isCorrect ? 'Awesome! Correct' : 'Keep Going! Review below'}
            </span>
          </div>
        )}
      </div>

      {/* Post-Submit Explanation Card */}
      {isSubmitted && (
        <div
          className={`p-3.5 sm:p-4 rounded-xl border-2 text-xs leading-relaxed space-y-1 mt-2 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-stone-800'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Explanation:</span>
          </div>
          <p className="break-words">{exercise.explanation}</p>
          {exercise.correctAnswer && !isCorrect && (
            <p className="font-semibold text-rose-700 pt-1">
              Correct Answer:{' '}
              <span className="font-hangul font-bold text-sm text-stone-900 break-words">
                {exercise.correctAnswer}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
