// Web Speech API wrapper for Text-to-Speech & Speech-to-Text in Korean (ko-KR)

export function speakKorean(text: string, rate: number = 1.0): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanText = text.replace(/[\(\)\[\]\{\}]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ko-KR';
    utterance.rate = rate; // 1.0 normal or 0.7 slow

    // Try finding a native ko-KR voice if available
    const voices = window.speechSynthesis.getVoices();
    const koreanVoice = voices.find((v) => v.lang.startsWith('ko') || v.lang === 'ko_KR');
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
}

// Normalize Korean text for comparison (remove spaces, punctuation, lowercase)
export function normalizeKorean(text: string): string {
  return text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"' \t\r\n]/g, '')
    .trim()
    .toLowerCase();
}

// Calculate similarity between spoken input and target text (0 to 100%)
export function calculateMatchScore(spoken: string, target: string): number {
  const normSpoken = normalizeKorean(spoken);
  const normTarget = normalizeKorean(target);

  if (normSpoken === normTarget) return 100;
  if (!normSpoken || !normTarget) return 0;

  // Simple Levenshtein distance
  const track = Array(normTarget.length + 1)
    .fill(null)
    .map(() => Array(normSpoken.length + 1).fill(null));

  for (let i = 0; i <= normTarget.length; i += 1) {
    track[i][0] = i;
  }
  for (let j = 0; j <= normSpoken.length; j += 1) {
    track[0][j] = j;
  }

  for (let i = 1; i <= normTarget.length; i += 1) {
    for (let j = 1; j <= normSpoken.length; j += 1) {
      const indicator = normTarget[i - 1] === normSpoken[j - 1] ? 0 : 1;
      track[i][j] = Math.min(
        track[i - 1][j] + 1, // deletion
        track[i][j - 1] + 1, // insertion
        track[i - 1][j - 1] + indicator // substitution
      );
    }
  }

  const distance = track[normTarget.length][normSpoken.length];
  const maxLength = Math.max(normTarget.length, normSpoken.length);
  const similarity = Math.max(0, (1 - distance / maxLength) * 100);
  return Math.round(similarity);
}

// Check speech recognition support
export function isSpeechRecognitionSupported(): boolean {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export function createSpeechRecognizer(
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
): { start: () => void; stop: () => void } | null {
  const SpeechRecognitionClass =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    return null;
  }

  try {
    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      onResult(final || interim, Boolean(final));
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      onError(event.error || 'Mic input error');
    };

    recognition.onend = () => {
      onEnd();
    };

    return {
      start: () => {
        try {
          recognition.start();
        } catch (e) {
          console.warn('Recognition start error:', e);
        }
      },
      stop: () => {
        try {
          recognition.stop();
        } catch (e) {
          console.warn('Recognition stop error:', e);
        }
      },
    };
  } catch (e) {
    console.error('Failed to create SpeechRecognition', e);
    return null;
  }
}
