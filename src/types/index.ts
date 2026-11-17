export type SectionId = 
  | 'hangul-vowels'
  | 'hangul-consonants'
  | 'syllable-blocks'
  | 'batchim'
  | 'core-nouns-family-food'
  | 'everyday-verbs'
  | 'colors-and-feelings'
  | 'sentence-sov-structure'
  | 'particles-topic-subject'
  | 'particles-object-location'
  | 'polite-conjugation';

export type StageId = 'stage-1' | 'stage-2' | 'stage-3' | 'stage-4';

export interface Stage {
  id: StageId;
  title: string;
  stageNumber: number;
  subtitle: string;
  description: string;
  accentColor: string; // e.g. amber, emerald, sky, purple
  icon: string;
  sectionIds: SectionId[];
}

export interface WordBreakdown {
  korean: string;
  romanization: string;
  literal: string;
  partOfSpeech: 'subject' | 'object' | 'verb' | 'particle' | 'noun' | 'adjective' | 'other';
}

export interface VocabItem {
  id: string;
  korean: string;
  romanization: string;
  english: string;
  literal?: string;
  category?: string;
  emoji?: string;
  audioText?: string; // string to feed Web Speech API
  tips?: string;
  breakdown?: WordBreakdown[];
}

export interface SentenceItem {
  id: string;
  korean: string;
  romanization: string;
  english: string;
  literalBreakdown: WordBreakdown[];
  explanation: string;
  audioText?: string;
}

export interface GrammarRuleCard {
  id: string;
  title: string;
  badge: string;
  kidSummary: string; // "Kid-friendly 5-year-old explanation"
  ruleExplanation: string;
  blocksFormula?: { text: string; color: string; label: string }[];
  dos: { korean: string; romanization: string; english: string; why: string }[];
  donts: { korean: string; romanization: string; wrongEnglish: string; explanation: string }[];
  exceptions?: string[];
}

export interface DialogueTurn {
  speaker: string;
  speakerEmoji: string;
  korean: string;
  romanization: string;
  english: string;
  literal: string;
  breakdown: WordBreakdown[];
}

export interface StoryOrDialogue {
  id: string;
  title: string;
  koreanTitle: string;
  context: string;
  turns: DialogueTurn[];
}

export interface PracticeExercise {
  id: string;
  type: 'listen-select' | 'dictation' | 'reading-comprehension' | 'sentence-unscramble' | 'speaking-test' | 'drawing-canvas';
  sectionId: SectionId;
  prompt: string;
  subPrompt?: string;
  audioTarget?: string;
  targetKorean?: string;
  targetEnglish?: string;
  targetRomanization?: string;
  options?: string[]; // for multiple choice
  correctAnswer?: string; // string or joined string
  jumbledTokens?: { id: string; text: string; partOfSpeech?: string }[];
  correctTokenOrder?: string[];
  explanation: string;
}

export interface SectionContent {
  id: SectionId;
  stageId: StageId;
  title: string;
  koreanTitle: string;
  icon: string;
  estimatedMinutes: number;
  fiveYearOldSummary: string;
  detailedGuide: string[];
  vocab: VocabItem[];
  sentences: SentenceItem[];
  grammarCards: GrammarRuleCard[];
  story?: StoryOrDialogue;
  exercises: PracticeExercise[];
}

export interface UserProgress {
  completedSections: SectionId[];
  showRomanization: boolean;
  audioSpeed: 1.0 | 0.7;
  customNotes: Record<string, string>; // sectionId -> note
  examHistory: ExamResultRecord[];
}

export interface ExamResultRecord {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  sectionsTested: SectionId[];
  focus: 'all' | 'grammar' | 'listening-speaking' | 'reading-writing';
  missedQuestions: {
    prompt: string;
    targetKorean: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}
