import { Stage, SectionContent } from '../types';

export const STAGES: Stage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    title: 'Sounds & Hangul (The Building Blocks)',
    subtitle: 'From simple mouth sounds to syllable blocks',
    description: 'Learn King Sejong\'s scientific alphabet like a child discovers phonics: vowels, consonants, and how they snap together like LEGO.',
    accentColor: 'amber',
    icon: 'Blocks',
    sectionIds: ['hangul-vowels', 'hangul-consonants', 'syllable-blocks', 'batchim'],
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    title: "A 5-Year-Old's World (Core Nouns & Actions)",
    subtitle: 'Naming everyday magic & favorite actions',
    description: 'Build your foundational vocabulary: mom, dad, milk, apple, puppies, eating, sleeping, and jumping!',
    accentColor: 'emerald',
    icon: 'Smile',
    sectionIds: ['core-nouns-family-food', 'everyday-verbs', 'colors-and-feelings'],
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    title: 'Sentence Architecture (How Phrases Form)',
    subtitle: 'Unlocking Korean\'s secret backwards order (SOV)',
    description: 'English says "I eat apple", but Korean says "I apple eat!" Master the visual word puzzle.',
    accentColor: 'sky',
    icon: 'Layers',
    sectionIds: ['sentence-sov-structure'],
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    title: 'Rules & Regulations (Grammar & Particles)',
    subtitle: 'The tiny sticky tags and polite magic words',
    description: 'Topic and subject markers (은/는, 이/가), direct objects (을/를), and the friendly everyday -아요/어요 polite endings.',
    accentColor: 'purple',
    icon: 'Sparkles',
    sectionIds: ['particles-topic-subject', 'particles-object-location', 'polite-conjugation'],
  },
];

export const SECTIONS_DATA: Record<string, SectionContent> = {
  'hangul-vowels': {
    id: 'hangul-vowels',
    stageId: 'stage-1',
    title: 'Basic & Bright Vowels',
    koreanTitle: '기본 모음 (Basic Vowels)',
    icon: 'Sun',
    estimatedMinutes: 8,
    fiveYearOldSummary: 'Vowels are the open-mouth singing sounds of Korean! Three shapes make them all: Sun (dot/dash ·), Man standing tall (|), and Flat Earth (—).',
    detailedGuide: [
      'Hangul was invented in 1443 by King Sejong the Great so everyone could easily read and write in just a morning.',
      'Unlike English with 26 irregular letters, Korean vowels are purely phonetic: vertical vowels stand tall (|), and horizontal vowels lie flat (—).',
      'The silent placeholder "ㅇ" sits before a vowel when it stands by itself (e.g. 아, 어, 오) so it forms a nice neat square!'
    ],
    vocab: [
      {
        id: 'v-a',
        korean: '아',
        romanization: 'a',
        english: 'Ah! (as in father)',
        tips: 'Mouth opens wide, standing line with sun shining to the right.',
        audioText: '아',
        category: 'Vowel'
      },
      {
        id: 'v-eo',
        korean: '어',
        romanization: 'eo',
        english: 'Uh (as in sun / cut)',
        tips: 'Standing line with sun pointing inside toward your heart.',
        audioText: '어',
        category: 'Vowel'
      },
      {
        id: 'v-o',
        korean: '오',
        romanization: 'o',
        english: 'Oh! (as in boat)',
        tips: 'Horizontal line on bottom, sun ray shooting straight up to the sky.',
        audioText: '오',
        category: 'Vowel'
      },
      {
        id: 'v-u',
        korean: '우',
        romanization: 'u',
        english: 'Oo (as in moon / soup)',
        tips: 'Horizontal line on top, water droplet hanging down.',
        audioText: '우',
        category: 'Vowel'
      },
      {
        id: 'v-eu',
        korean: '으',
        romanization: 'eu',
        english: 'Eu (smiling teeth grit, as in "brook")',
        tips: 'Flat flat earth! Pull your lips wide into a goofy grin.',
        audioText: '으',
        category: 'Vowel'
      },
      {
        id: 'v-i',
        korean: '이',
        romanization: 'i',
        english: 'Ee (as in see / tree)',
        tips: 'A single upright tree or tall person standing proud.',
        audioText: '이',
        category: 'Vowel'
      },
      {
        id: 'v-ai',
        korean: '아이',
        romanization: 'a-i',
        english: 'Child / Kid',
        literal: 'Ah + Ee',
        emoji: '👶',
        audioText: '아이',
        tips: 'Put "아" and "이" together and you get your very first Korean word: kid!',
        category: 'Word'
      },
      {
        id: 'v-oi',
        korean: '오이',
        romanization: 'o-i',
        english: 'Cucumber',
        literal: 'Oh + Ee',
        emoji: '🥒',
        audioText: '오이',
        tips: 'Crisp green cucumber! Two simple vowels joined together.',
        category: 'Word'
      },
      {
        id: 'v-uyu',
        korean: '우유',
        romanization: 'u-yu',
        english: 'Milk',
        literal: 'Oo + Yoo',
        emoji: '🥛',
        audioText: '우유',
        tips: 'Every 5-year-old\'s breakfast favorite!',
        category: 'Word'
      }
    ],
    sentences: [
      {
        id: 's-v-1',
        korean: '아이가 우유를 마셔요.',
        romanization: 'a-i-ga u-yu-reul ma-syeo-yo',
        english: 'The child drinks milk.',
        literalBreakdown: [
          { korean: '아이', romanization: 'a-i', literal: 'child', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '우유', romanization: 'u-yu', literal: 'milk', partOfSpeech: 'object' },
          { korean: '를', romanization: 'reul', literal: '[Object tag]', partOfSpeech: 'particle' },
          { korean: '마셔요', romanization: 'ma-syeo-yo', literal: 'drinks [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Notice how "아이" (child) and "우유" (milk) are built completely from simple vowels we just learned!'
      }
    ],
    grammarCards: [
      {
        id: 'g-vowel-block',
        title: 'The Silent Round Helper: "ㅇ"',
        badge: 'LEGO Rule #1',
        kidSummary: 'In Korean, a vowel gets lonely and cannot sit alone! It must wear a silent round hat "ㅇ" in front or on top.',
        ruleExplanation: 'When a Korean syllable starts with a vowel sound, the consonant spot is filled with the silent circle "ㅇ". It makes zero sound at the start of a block!',
        dos: [
          { korean: '아', romanization: 'a', english: 'Ah (Correct)', why: 'Silent circle placed before vertical vowel ㅏ' },
          { korean: '오', romanization: 'o', english: 'Oh (Correct)', why: 'Silent circle placed above horizontal vowel ㅗ' }
        ],
        donts: [
          { korean: 'ㅏ', romanization: 'a', wrongEnglish: 'Incomplete block', explanation: 'A bare vowel stroke cannot exist in printed Korean text without a consonant partner!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-v-1',
        type: 'listen-select',
        sectionId: 'hangul-vowels',
        prompt: 'Listen to the audio sound and pick the matching vowel block:',
        audioTarget: '우',
        targetKorean: '우',
        targetEnglish: 'Oo (as in moon)',
        options: ['오', '우', '어', '으'],
        correctAnswer: '우',
        explanation: '"우" makes the round "oo" sound pointing downward.'
      },
      {
        id: 'ex-v-2',
        type: 'listen-select',
        sectionId: 'hangul-vowels',
        prompt: 'Listen and select the Korean word for "Cucumber":',
        audioTarget: '오이',
        targetKorean: '오이',
        targetEnglish: 'Cucumber (o-i)',
        options: ['아이', '오이', '우유', '이'],
        correctAnswer: '오이',
        explanation: '"오이" (o-i) means cucumber in Korean!'
      },
      {
        id: 'ex-v-3',
        type: 'dictation',
        sectionId: 'hangul-vowels',
        prompt: 'Type or assemble the word you hear ("Milk"):',
        audioTarget: '우유',
        targetKorean: '우유',
        targetEnglish: 'Milk',
        correctAnswer: '우유',
        explanation: 'Milk is 우유 (u-yu).'
      },
      {
        id: 'ex-v-4',
        type: 'speaking-test',
        sectionId: 'hangul-vowels',
        prompt: 'Press the microphone button and clearly speak the word "Child":',
        targetKorean: '아이',
        targetRomanization: 'a-i',
        targetEnglish: 'Child / Kid',
        explanation: 'Say "ah-ee" clearly into your microphone!'
      }
    ]
  },

  'hangul-consonants': {
    id: 'hangul-consonants',
    stageId: 'stage-1',
    title: 'Basic Consonants & Mouth Shapes',
    koreanTitle: '기본 자음 (Basic Consonants)',
    icon: 'Sparkle',
    estimatedMinutes: 10,
    fiveYearOldSummary: 'Korean consonant letters are literal cartoon drawings of your tongue, teeth, and throat when making the sound!',
    detailedGuide: [
      'ㄱ represents the tongue root touching your soft palate (G/K sound).',
      'ㄴ represents the tip of your tongue pressing behind your upper front teeth (N sound).',
      'ㅁ is a drawing of your closed lips making the "M" box sound.',
      'ㅅ is your two front teeth whistling the "S" sound.'
    ],
    vocab: [
      {
        id: 'c-g',
        korean: 'ㄱ',
        romanization: 'g / k',
        english: 'Gun shape (G/K)',
        tips: 'Tongue hooks up at the back of mouth. Sound between G and K.',
        audioText: '기역',
        category: 'Consonant'
      },
      {
        id: 'c-n',
        korean: 'ㄴ',
        romanization: 'n',
        english: 'Nose tip (N)',
        tips: 'Tongue touches upper gum ridge like an English N.',
        audioText: '니은',
        category: 'Consonant'
      },
      {
        id: 'c-d',
        korean: 'ㄷ',
        romanization: 'd / t',
        english: 'Door shape (D/T)',
        tips: 'Like ㄴ with a ceiling! Tongue snaps forward.',
        audioText: '디귿',
        category: 'Consonant'
      },
      {
        id: 'c-m',
        korean: 'ㅁ',
        romanization: 'm',
        english: 'Mouth box (M)',
        tips: 'A square like closed smiling lips.',
        audioText: '미음',
        category: 'Consonant'
      },
      {
        id: 'c-b',
        korean: 'ㅂ',
        romanization: 'b / p',
        english: 'Bucket shape (B/P)',
        tips: 'A cup holding water, lips pop open.',
        audioText: '비읍',
        category: 'Consonant'
      },
      {
        id: 'c-s',
        korean: 'ㅅ',
        romanization: 's',
        english: 'Slide / Tooth shape (S)',
        tips: 'Two teeth whistling air.',
        audioText: '시옷',
        category: 'Consonant'
      },
      {
        id: 'c-gogi',
        korean: '고기',
        romanization: 'go-gi',
        english: 'Meat',
        literal: 'ㄱ+ㅗ + ㄱ+ㅣ',
        emoji: '🥩',
        audioText: '고기',
        tips: 'Tasty BBQ meat!',
        category: 'Word'
      },
      {
        id: 'c-namu',
        korean: '나무',
        romanization: 'na-mu',
        english: 'Tree / Wood',
        literal: 'ㄴ+ㅏ + ㅁ+ㅜ',
        emoji: '🌳',
        audioText: '나무',
        tips: 'Tongue tip ㄴ + ㅏ and mouth box ㅁ + ㅜ = Tree!',
        category: 'Word'
      },
      {
        id: 'c-nabi',
        korean: '나비',
        romanization: 'na-bi',
        english: 'Butterfly',
        literal: 'ㄴ+ㅏ + ㅂ+ㅣ',
        emoji: '🦋',
        audioText: '나비',
        tips: 'Flutters in the warm Korean spring.',
        category: 'Word'
      }
    ],
    sentences: [
      {
        id: 's-c-1',
        korean: '나무에 나비가 앉아요.',
        romanization: 'na-mu-e na-bi-ga an-ja-yo',
        english: 'A butterfly sits on the tree.',
        literalBreakdown: [
          { korean: '나무', romanization: 'na-mu', literal: 'tree', partOfSpeech: 'noun' },
          { korean: '에', romanization: 'e', literal: 'on / at', partOfSpeech: 'particle' },
          { korean: '나비', romanization: 'na-bi', literal: 'butterfly', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '앉아요', romanization: 'an-ja-yo', literal: 'sits [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Both "나무" (tree) and "나비" (butterfly) are made from the simple consonants we just met!'
      }
    ],
    grammarCards: [
      {
        id: 'g-mouth-organ',
        title: 'King Sejong’s Tongue Camera',
        badge: 'Phonics Magic',
        kidSummary: 'When you say ㄴ, feel your tongue touch the roof of your mouth? King Sejong literally drew that tongue touching the roof!',
        ruleExplanation: 'Hangul is the world’s only featural alphabet designed intentionally to match human articulatory phonetics.',
        dos: [
          { korean: 'ㄴ', romanization: 'n', english: 'Tip of tongue touching teeth roof', why: 'Visual match to your tongue' },
          { korean: 'ㅁ', romanization: 'm', english: 'Lips closed together in a square', why: 'Visual match to mouth profile' }
        ],
        donts: [
          { korean: 'English B vs D confusion', romanization: '-', wrongEnglish: 'Mixing up mirror letters', explanation: 'Hangul letters are built systematically by adding strokes (ㄴ -> ㄷ -> ㅌ) for stronger air bursts!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-c-1',
        type: 'listen-select',
        sectionId: 'hangul-consonants',
        prompt: 'Listen to the audio and identify the word meaning "Tree":',
        audioTarget: '나무',
        targetKorean: '나무',
        targetEnglish: 'Tree',
        options: ['고기', '나무', '나비', '다리'],
        correctAnswer: '나무',
        explanation: '나무 (na-mu) means tree!'
      },
      {
        id: 'ex-c-2',
        type: 'sentence-unscramble',
        sectionId: 'hangul-consonants',
        prompt: 'Unscramble the blocks to write "Butterfly" (na-bi):',
        targetKorean: '나비',
        targetEnglish: 'Butterfly',
        jumbledTokens: [
          { id: 't2', text: '비', partOfSpeech: 'noun' },
          { id: 't1', text: '나', partOfSpeech: 'noun' }
        ],
        correctTokenOrder: ['t1', 't2'],
        correctAnswer: '나비',
        explanation: '나 (na) + 비 (bi) = 나비 (butterfly).'
      },
      {
        id: 'ex-c-3',
        type: 'speaking-test',
        sectionId: 'hangul-consonants',
        prompt: 'Say the Korean word for "Meat" (고기):',
        targetKorean: '고기',
        targetRomanization: 'go-gi',
        targetEnglish: 'Meat',
        explanation: 'Pronounce "go-gi" gently!'
      }
    ]
  },

  'syllable-blocks': {
    id: 'syllable-blocks',
    stageId: 'stage-1',
    title: 'Syllable Block Assembly (The LEGO System)',
    koreanTitle: '글자 만들기 (Syllable Blocks)',
    icon: 'Layers',
    estimatedMinutes: 10,
    fiveYearOldSummary: 'Korean letters never lie in a messy single line! They pack into neat, cute little square lunchboxes.',
    detailedGuide: [
      'Every Korean syllable block MUST contain at least one Consonant (C) and one Vowel (V).',
      'If the vowel stands tall (| like ㅏ, ㅓ, ㅣ), put the consonant on the LEFT: [C | V] -> [ㄱ + ㅏ = 가].',
      'If the vowel lies flat (— like ㅗ, ㅜ, ㅡ), put the consonant on the TOP: [C / V] -> [ㄱ / ㅗ = 고].',
      'This geometric harmony gives Korean its beautiful, clean architectural balance.'
    ],
    vocab: [
      {
        id: 'b-ga',
        korean: '가',
        romanization: 'ga',
        english: 'Go / Street',
        literal: 'ㄱ (left) + ㅏ (right)',
        audioText: '가',
        category: 'Block'
      },
      {
        id: 'b-no',
        korean: '노',
        romanization: 'no',
        english: 'Yellow / Song',
        literal: 'ㄴ (top) + ㅗ (bottom)',
        audioText: '노',
        category: 'Block'
      },
      {
        id: 'b-dasi',
        korean: '다시',
        romanization: 'da-si',
        english: 'Again / Once more',
        literal: 'ㄷ+ㅏ + ㅅ+ㅣ',
        audioText: '다시',
        tips: 'When you want to play a game again!',
        category: 'Word'
      },
      {
        id: 'b-bada',
        korean: '바다',
        romanization: 'ba-da',
        english: 'Ocean / Sea',
        literal: 'ㅂ+ㅏ + ㄷ+ㅏ',
        emoji: '🌊',
        audioText: '바다',
        tips: 'Wide blue ocean waves!',
        category: 'Word'
      },
      {
        id: 'b-saja',
        korean: '사자',
        romanization: 'sa-ja',
        english: 'Lion',
        literal: 'ㅅ+ㅏ + ㅈ+ㅏ',
        emoji: '🦁',
        audioText: '사자',
        tips: 'King of the jungle!',
        category: 'Word'
      }
    ],
    sentences: [
      {
        id: 's-b-1',
        korean: '사자가 바다에 가요.',
        romanization: 'sa-ja-ga ba-da-e ga-yo',
        english: 'The lion goes to the sea.',
        literalBreakdown: [
          { korean: '사자', romanization: 'sa-ja', literal: 'lion', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '바다', romanization: 'ba-da', literal: 'sea / ocean', partOfSpeech: 'noun' },
          { korean: '에', romanization: 'e', literal: 'to / toward', partOfSpeech: 'particle' },
          { korean: '가요', romanization: 'ga-yo', literal: 'goes [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Every single syllable in this sentence is a neat 2-part [Consonant + Vowel] block!'
      }
    ],
    grammarCards: [
      {
        id: 'g-block-layout',
        title: 'Side-by-Side vs. Top-to-Bottom',
        badge: 'LEGO Rule #2',
        kidSummary: 'Tall vowels stand beside you like a best friend. Flat vowels sleep underneath you like a mattress!',
        ruleExplanation: 'Vertical vowels (ㅏ, ㅑ, ㅓ, ㅕ, ㅣ, ㅐ, ㅔ) sit to the right of the consonant. Horizontal vowels (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ) sit directly below the consonant.',
        dos: [
          { korean: '바 (ㅂ + ㅏ)', romanization: 'ba', english: 'Side-by-side (Vertical vowel)', why: 'ㅏ is tall' },
          { korean: '보 (ㅂ + ㅗ)', romanization: 'bo', english: 'Top-and-bottom (Horizontal vowel)', why: 'ㅗ is flat' }
        ],
        donts: [
          { korean: 'ㅂㅏ or ㅂㅗ', romanization: '-', wrongEnglish: 'Linear writing', explanation: 'Korean never strings letters horizontally in a line like English does.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-b-1',
        type: 'listen-select',
        sectionId: 'syllable-blocks',
        prompt: 'Listen and select the word for "Ocean" (ba-da):',
        audioTarget: '바다',
        targetKorean: '바다',
        targetEnglish: 'Ocean / Sea',
        options: ['사자', '바다', '다시', '나무'],
        correctAnswer: '바다',
        explanation: '바다 (ba-da) means ocean or sea!'
      },
      {
        id: 'ex-b-2',
        type: 'sentence-unscramble',
        sectionId: 'syllable-blocks',
        prompt: 'Put together the word for "Lion" (sa-ja):',
        targetKorean: '사자',
        targetEnglish: 'Lion',
        jumbledTokens: [
          { id: 'b2', text: '자' },
          { id: 'b1', text: '사' }
        ],
        correctTokenOrder: ['b1', 'b2'],
        correctAnswer: '사자',
        explanation: '사 + 자 = 사자 (Lion)!'
      },
      {
        id: 'ex-b-3',
        type: 'speaking-test',
        sectionId: 'syllable-blocks',
        prompt: 'Say the word "Lion" into your microphone:',
        targetKorean: '사자',
        targetRomanization: 'sa-ja',
        targetEnglish: 'Lion',
        explanation: 'Say "sa-ja" clearly!'
      }
    ]
  },

  'batchim': {
    id: 'batchim',
    stageId: 'stage-1',
    title: 'Batchim (The Basement Final Consonants)',
    koreanTitle: '받침 (Final Consonants)',
    icon: 'ChevronsDown',
    estimatedMinutes: 12,
    fiveYearOldSummary: 'Batchim is the heavy footstep at the bottom of the block! It’s like adding a cozy basement floor to your LEGO house.',
    detailedGuide: [
      '"Batchim" (받침) literally means "prop" or "support" in Korean.',
      'It is a consonant that sits at the very bottom of a syllable block.',
      'For example: [ㄱ + ㅏ = 가] (no basement). Add [ㅇ] to the basement and you get [강 = gang] (River)!',
      'Add [ㅂ] to the basement of [ㅂ + ㅏ = 바] and you get [밥 = bap] (Rice / Food)!'
    ],
    vocab: [
      {
        id: 'bt-bap',
        korean: '밥',
        romanization: 'bap',
        english: 'Rice / Meal',
        literal: 'ㅂ+ㅏ + ㅂ(basement)',
        emoji: '🍚',
        audioText: '밥',
        tips: 'The most important word in Korean culture!',
        category: 'Food'
      },
      {
        id: 'bt-mul',
        korean: '물',
        romanization: 'mul',
        english: 'Water',
        literal: 'ㅁ+ㅜ + ㄹ(basement)',
        emoji: '💧',
        audioText: '물',
        tips: 'Fresh cool water!',
        category: 'Food'
      },
      {
        id: 'bt-gang',
        korean: '강',
        romanization: 'gang',
        english: 'River',
        literal: 'ㄱ+ㅏ + ㅇ(basement -ng sound)',
        emoji: '🏞️',
        audioText: '강',
        tips: 'ㅇ in the basement sounds like "ng" in song!',
        category: 'Nature'
      },
      {
        id: 'bt-bang',
        korean: '방',
        romanization: 'bang',
        english: 'Room',
        literal: 'ㅂ+ㅏ + ㅇ(basement)',
        emoji: '🚪',
        audioText: '방',
        tips: 'Like in PC-bang or noraebang (karaoke room)!',
        category: 'Place'
      },
      {
        id: 'bt-dal',
        korean: '달',
        romanization: 'dal',
        english: 'Moon / Month',
        literal: 'ㄷ+ㅏ + ㄹ(basement)',
        emoji: '🌙',
        audioText: '달',
        tips: 'The shining moon at night.',
        category: 'Nature'
      },
      {
        id: 'bt-son',
        korean: '손',
        romanization: 'son',
        english: 'Hand',
        literal: 'ㅅ+ㅗ + ㄴ(basement)',
        emoji: '🖐️',
        audioText: '손',
        tips: 'Little hands high five!',
        category: 'Body'
      }
    ],
    sentences: [
      {
        id: 's-bt-1',
        korean: '물이 맑아요.',
        romanization: 'mul-i mal-ga-yo',
        english: 'The water is clear.',
        literalBreakdown: [
          { korean: '물', romanization: 'mul', literal: 'water', partOfSpeech: 'subject' },
          { korean: '이', romanization: 'i', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '맑아요', romanization: 'mal-ga-yo', literal: 'is clear [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Notice how the basement ㄹ in "물" flows smoothly into the next vowel sound "이" (sounds like mu-ri)!'
      }
    ],
    grammarCards: [
      {
        id: 'g-batchim-flow',
        title: 'The Basement Flow Rule (Liaison)',
        badge: 'Pronunciation Magic',
        kidSummary: 'If your basement consonant sees an empty round room (ㅇ) next door, it hops upstairs to play!',
        ruleExplanation: 'When a syllable with a final consonant is followed by a vowel starting with silent "ㅇ", the basement consonant sound slides directly into the next syllable: 밥이 sounds like [바비 / ba-bi].',
        dos: [
          { korean: '물이', romanization: 'mul + i -> [mu-ri]', english: 'Water (flows smoothly)', why: 'ㄹ floats up into the empty circle' },
          { korean: '밥이', romanization: 'bap + i -> [ba-bi]', english: 'Rice (flows smoothly)', why: 'ㅂ floats up into the empty circle' }
        ],
        donts: [
          { korean: '물-이 (stiff stop)', romanization: 'mool... ee', wrongEnglish: 'Choppy pronunciation', explanation: 'Don\'t pause awkwardly between the syllables; let it glide naturally like a gentle song!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-bt-1',
        type: 'listen-select',
        sectionId: 'batchim',
        prompt: 'Listen to the audio and select the word for "Water":',
        audioTarget: '물',
        targetKorean: '물',
        targetEnglish: 'Water (mul)',
        options: ['밥', '물', '달', '손'],
        correctAnswer: '물',
        explanation: '물 (mul) has ㄹ in the basement and means water!'
      },
      {
        id: 'ex-bt-2',
        type: 'dictation',
        sectionId: 'batchim',
        prompt: 'Type the Korean word for "Rice / Meal":',
        audioTarget: '밥',
        targetKorean: '밥',
        targetEnglish: 'Rice / Meal',
        correctAnswer: '밥',
        explanation: '밥 (bap) is the word for warm cooked rice or a meal.'
      },
      {
        id: 'ex-bt-3',
        type: 'speaking-test',
        sectionId: 'batchim',
        prompt: 'Say the Korean word for "Hand" (son):',
        targetKorean: '손',
        targetRomanization: 'son',
        targetEnglish: 'Hand',
        explanation: 'Say "sohn" clearly!'
      }
    ]
  },

  'core-nouns-family-food': {
    id: 'core-nouns-family-food',
    stageId: 'stage-2',
    title: 'Family, Animals & Delicious Food',
    koreanTitle: '가족과 맛있는 음식 (Family & Food)',
    icon: 'Heart',
    estimatedMinutes: 12,
    fiveYearOldSummary: 'Everything a 5-year-old loves: Mom, Dad, cute puppies, sweet apples, and banana milk!',
    detailedGuide: [
      'Children learn their first words through the comforting people and yummy foods right in front of them.',
      'Mom is "엄마" (eom-ma) and Dad is "아빠" (a-ppa)—super easy because they sound just like infant babbling across all cultures!',
      'Puppy is "강아지" (gang-a-ji) and Kitty is "고양이" (go-yang-i).'
    ],
    vocab: [
      {
        id: 'n-mom',
        korean: '엄마',
        romanization: 'eom-ma',
        english: 'Mom',
        emoji: '👩',
        audioText: '엄마',
        tips: 'Warm and loving mother.',
        category: 'Family'
      },
      {
        id: 'n-dad',
        korean: '아빠',
        romanization: 'a-ppa',
        english: 'Dad',
        emoji: '👨',
        audioText: '아빠',
        tips: 'Strong and playful father.',
        category: 'Family'
      },
      {
        id: 'n-dog',
        korean: '강아지',
        romanization: 'gang-a-ji',
        english: 'Puppy',
        emoji: '🐶',
        audioText: '강아지',
        tips: 'Playful barking puppy (woof = 멍멍 meong-meong)!',
        category: 'Animals'
      },
      {
        id: 'n-cat',
        korean: '고양이',
        romanization: 'go-yang-i',
        english: 'Cat / Kitty',
        emoji: '🐱',
        audioText: '고양이',
        tips: 'Cute purring kitten (meow = 야옹 ya-ong)!',
        category: 'Animals'
      },
      {
        id: 'n-apple',
        korean: '사과',
        romanization: 'sa-gwa',
        english: 'Apple / Apology',
        emoji: '🍎',
        audioText: '사과',
        tips: 'Crunchy red apple! Fun fact: in Korean, "사과" also means "apology".',
        category: 'Food'
      },
      {
        id: 'n-banana',
        korean: '바나나',
        romanization: 'ba-na-na',
        english: 'Banana',
        emoji: '🍌',
        audioText: '바나나',
        tips: 'Sounds identical to English!',
        category: 'Food'
      },
      {
        id: 'n-friend',
        korean: '친구',
        romanization: 'chin-gu',
        english: 'Friend',
        emoji: '🤝',
        audioText: '친구',
        tips: 'Best playground buddy.',
        category: 'People'
      }
    ],
    sentences: [
      {
        id: 's-f-1',
        korean: '엄마가 사과를 줘요.',
        romanization: 'eom-ma-ga sa-gwa-reul jwo-yo',
        english: 'Mom gives an apple.',
        literalBreakdown: [
          { korean: '엄마', romanization: 'eom-ma', literal: 'Mom', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '사과', romanization: 'sa-gwa', literal: 'apple', partOfSpeech: 'object' },
          { korean: '를', romanization: 'reul', literal: '[Object tag]', partOfSpeech: 'particle' },
          { korean: '줘요', romanization: 'jwo-yo', literal: 'gives [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Mom is doing the action (Subject), the apple is what she gives (Object), and give comes at the very end!'
      },
      {
        id: 's-f-2',
        korean: '강아지가 귀여워요.',
        romanization: 'gang-a-ji-ga gwi-yeo-wo-yo',
        english: 'The puppy is cute.',
        literalBreakdown: [
          { korean: '강아지', romanization: 'gang-a-ji', literal: 'puppy', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '귀여워요', romanization: 'gwi-yeo-wo-yo', literal: 'is cute [polite]', partOfSpeech: 'adjective' }
        ],
        explanation: 'Korean adjectives act like descriptive verbs—no extra "is" needed!'
      }
    ],
    grammarCards: [
      {
        id: 'g-noun-simplicity',
        title: 'No "A", "An", or "The" Headache!',
        badge: 'Kid Superpower',
        kidSummary: 'Good news! Korean does NOT have annoying words like "the", "a", or "an". "사과" means an apple, the apple, or apples all at once!',
        ruleExplanation: 'Korean nouns do not require articles (a/an/the) or mandatory plural markers in everyday speech unless emphasizing exact counts.',
        dos: [
          { korean: '사과 좋아해요', romanization: 'sa-gwa jo-a-hae-yo', english: 'I like apples / I like the apple', why: 'Just say the noun cleanly!' }
        ],
        donts: [
          { korean: '더 사과', romanization: 'the sa-gwa', wrongEnglish: 'Trying to say "the apple"', explanation: 'Never try to translate "the" or "a" directly into Korean.' }
        ]
      }
    ],
    story: {
      id: 'st-family',
      title: 'A Sunday with Mom & Dad',
      koreanTitle: '엄마 아빠와 함께 (With Mom & Dad)',
      context: 'Little Min-jun is spending Sunday morning in the kitchen.',
      turns: [
        {
          speaker: 'Min-jun',
          speakerEmoji: '👦',
          korean: '엄마, 배고파요! 사과 있어요?',
          romanization: 'eom-ma, bae-go-pa-yo! sa-gwa iss-eo-yo?',
          english: 'Mom, I\'m hungry! Do we have apples?',
          literal: 'Mom, belly-hungry! Apple exists?',
          breakdown: [
            { korean: '엄마', romanization: 'eom-ma', literal: 'Mom', partOfSpeech: 'noun' },
            { korean: '배고파요', romanization: 'bae-go-pa-yo', literal: 'hungry', partOfSpeech: 'verb' },
            { korean: '사과', romanization: 'sa-gwa', literal: 'apple', partOfSpeech: 'noun' },
            { korean: '있어요', romanization: 'iss-eo-yo', literal: 'exists / have', partOfSpeech: 'verb' }
          ]
        },
        {
          speaker: 'Mom',
          speakerEmoji: '👩',
          korean: '응, 맛있는 빨간 사과 여기 있어!',
          romanization: 'eung, mas-iss-neun ppal-gan sa-gwa yeo-gi iss-eo!',
          english: 'Yes, here is a delicious red apple!',
          literal: 'Yeah, delicious red apple here exists!',
          breakdown: [
            { korean: '응', romanization: 'eung', literal: 'yes (casual)', partOfSpeech: 'other' },
            { korean: '맛있는', romanization: 'mas-iss-neun', literal: 'delicious', partOfSpeech: 'adjective' },
            { korean: '사과', romanization: 'sa-gwa', literal: 'apple', partOfSpeech: 'noun' },
            { korean: '여기', romanization: 'yeo-gi', literal: 'here', partOfSpeech: 'other' }
          ]
        },
        {
          speaker: 'Dad',
          speakerEmoji: '👨',
          korean: '강아지도 바나나를 봐요.',
          romanization: 'gang-a-ji-do ba-na-na-reul bwa-yo.',
          english: 'The puppy also looks at the banana.',
          literal: 'Puppy-also banana-[object] looks.',
          breakdown: [
            { korean: '강아지', romanization: 'gang-a-ji', literal: 'puppy', partOfSpeech: 'subject' },
            { korean: '도', romanization: 'do', literal: 'also / too', partOfSpeech: 'particle' },
            { korean: '바나나', romanization: 'ba-na-na', literal: 'banana', partOfSpeech: 'object' },
            { korean: '를', romanization: 'reul', literal: '[Object tag]', partOfSpeech: 'particle' },
            { korean: '봐요', romanization: 'bwa-yo', literal: 'looks / sees', partOfSpeech: 'verb' }
          ]
        }
      ]
    },
    exercises: [
      {
        id: 'ex-f-1',
        type: 'listen-select',
        sectionId: 'core-nouns-family-food',
        prompt: 'Listen to the audio and choose the animal word:',
        audioTarget: '고양이',
        targetKorean: '고양이',
        targetEnglish: 'Cat / Kitty',
        options: ['강아지', '고양이', '엄마', '사과'],
        correctAnswer: '고양이',
        explanation: '고양이 (go-yang-i) means cat!'
      },
      {
        id: 'ex-f-2',
        type: 'sentence-unscramble',
        sectionId: 'core-nouns-family-food',
        prompt: 'Build the sentence: "Mom gives an apple":',
        targetKorean: '엄마가 사과를 줘요.',
        targetEnglish: 'Mom gives an apple.',
        jumbledTokens: [
          { id: 'f3', text: '줘요.', partOfSpeech: 'verb' },
          { id: 'f1', text: '엄마가', partOfSpeech: 'subject' },
          { id: 'f2', text: '사과를', partOfSpeech: 'object' }
        ],
        correctTokenOrder: ['f1', 'f2', 'f3'],
        correctAnswer: '엄마가 사과를 줘요.',
        explanation: 'Korean SOV structure: Subject (엄마가) + Object (사과를) + Verb (줘요)!'
      },
      {
        id: 'ex-f-3',
        type: 'speaking-test',
        sectionId: 'core-nouns-family-food',
        prompt: 'Say the Korean word for "Puppy" (gang-a-ji):',
        targetKorean: '강아지',
        targetRomanization: 'gang-a-ji',
        targetEnglish: 'Puppy',
        explanation: 'Say "gahng-ah-jee" with energy!'
      }
    ]
  },

  'everyday-verbs': {
    id: 'everyday-verbs',
    stageId: 'stage-2',
    title: 'Everyday Actions (Eat, Sleep, Play, Go)',
    koreanTitle: '매일 하는 행동 (Everyday Verbs)',
    icon: 'Zap',
    estimatedMinutes: 12,
    fiveYearOldSummary: 'What do kids love doing most? Eating yummy snacks, running to the playground, sleeping cozy, and playing with toys!',
    detailedGuide: [
      'In Korean dictionaries, every verb ends with "-다" (da), like 먹다 (to eat), 자다 (to sleep), 가다 (to go).',
      'When we actually talk politely to friends and elders, "-다" turns into friendly "-아요" or "-어요"!',
      'Once you know these 6 core verbs, you can express 80% of what happens in daily life.'
    ],
    vocab: [
      {
        id: 'v-eat',
        korean: '먹어요',
        romanization: 'meog-eo-yo',
        english: 'Eats / Eating',
        literal: '먹다 (to eat) -> 먹어요',
        emoji: '🍽️',
        audioText: '먹어요',
        tips: 'Yummy food in tummy!',
        category: 'Action'
      },
      {
        id: 'v-drink',
        korean: '마셔요',
        romanization: 'ma-syeo-yo',
        english: 'Drinks / Drinking',
        literal: '마시다 (to drink) -> 마셔요',
        emoji: '🥤',
        audioText: '마셔요',
        tips: 'Gulp gulp cold juice or milk.',
        category: 'Action'
      },
      {
        id: 'v-sleep',
        korean: '자요',
        romanization: 'ja-yo',
        english: 'Sleeps / Sleeping',
        literal: '자다 (to sleep) -> 자요',
        emoji: '😴',
        audioText: '자요',
        tips: 'Cozy bedtime with teddy bear.',
        category: 'Action'
      },
      {
        id: 'v-go',
        korean: '가요',
        romanization: 'ga-yo',
        english: 'Goes / Going',
        literal: '가다 (to go) -> 가요',
        emoji: '🏃',
        audioText: '가요',
        tips: 'Going to the playground or park!',
        category: 'Action'
      },
      {
        id: 'v-see',
        korean: '봐요',
        romanization: 'bwa-yo',
        english: 'Looks / Watches / Sees',
        literal: '보다 (to see) -> 봐요',
        emoji: '👀',
        audioText: '봐요',
        tips: 'Watching fun cartoons.',
        category: 'Action'
      },
      {
        id: 'v-play',
        korean: '놀아요',
        romanization: 'nor-a-yo',
        english: 'Plays / Having fun',
        literal: '놀다 (to play) -> 놀아요',
        emoji: '🛝',
        audioText: '놀아요',
        tips: 'Playing outside on the swings!',
        category: 'Action'
      }
    ],
    sentences: [
      {
        id: 's-act-1',
        korean: '아이가 밥을 먹어요.',
        romanization: 'a-i-ga bab-eul meog-eo-yo',
        english: 'The child eats rice/food.',
        literalBreakdown: [
          { korean: '아이', romanization: 'a-i', literal: 'child', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '밥', romanization: 'bap', literal: 'rice / meal', partOfSpeech: 'object' },
          { korean: '을', romanization: 'eul', literal: '[Object tag]', partOfSpeech: 'particle' },
          { korean: '먹어요', romanization: 'meog-eo-yo', literal: 'eats [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'The verb "먹어요" always anchors the very end of the sentence.'
      },
      {
        id: 's-act-2',
        korean: '고양이가 자요.',
        romanization: 'go-yang-i-ga ja-yo',
        english: 'The cat is sleeping.',
        literalBreakdown: [
          { korean: '고양이', romanization: 'go-yang-i', literal: 'cat', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '자요', romanization: 'ja-yo', literal: 'sleeps [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Simple subject + verb sentence! No helper verb "is" needed.'
      }
    ],
    grammarCards: [
      {
        id: 'g-verb-end',
        title: 'Verbs Always Go LAST!',
        badge: 'Golden Rule #1',
        kidSummary: 'In English, the verb jumps in the middle. In Korean, the verb patiently waits at the very finish line of the sentence!',
        ruleExplanation: 'Korean is strictly a verb-final language. All tense (past, present, future), politeness, and questions attach to the verb at the very end.',
        dos: [
          { korean: '사과를 먹어요', romanization: 'sa-gwa-reul meog-eo-yo', english: 'Apple eat (Correct Korean order)', why: 'Action is at the end' }
        ],
        donts: [
          { korean: '먹어요 사과를', romanization: 'meog-eo-yo sa-gwa-reul', wrongEnglish: 'Eat apple (English order)', explanation: 'Never put the verb before the object in natural Korean!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-act-1',
        type: 'listen-select',
        sectionId: 'everyday-verbs',
        prompt: 'Listen and choose the verb meaning "To Sleep":',
        audioTarget: '자요',
        targetKorean: '자요',
        targetEnglish: 'Sleeps / Sleeping',
        options: ['먹어요', '자요', '가요', '봐요'],
        correctAnswer: '자요',
        explanation: '자요 (ja-yo) means sleeps or is sleeping!'
      },
      {
        id: 'ex-act-2',
        type: 'sentence-unscramble',
        sectionId: 'everyday-verbs',
        prompt: 'Put words in order: "The cat is sleeping":',
        targetKorean: '고양이가 자요.',
        targetEnglish: 'The cat is sleeping.',
        jumbledTokens: [
          { id: 'u2', text: '자요.', partOfSpeech: 'verb' },
          { id: 'u1', text: '고양이가', partOfSpeech: 'subject' }
        ],
        correctTokenOrder: ['u1', 'u2'],
        correctAnswer: '고양이가 자요.',
        explanation: 'Subject first: 고양이가 (The cat) + Verb last: 자요 (sleeps)!'
      },
      {
        id: 'ex-act-3',
        type: 'speaking-test',
        sectionId: 'everyday-verbs',
        prompt: 'Say "I am eating" (먹어요) into your mic:',
        targetKorean: '먹어요',
        targetRomanization: 'meog-eo-yo',
        targetEnglish: 'Eats / Eating',
        explanation: 'Say "meog-eo-yo" smoothly!'
      }
    ]
  },

  'colors-and-feelings': {
    id: 'colors-and-feelings',
    stageId: 'stage-2',
    title: 'Colors, Feelings & Happy Days',
    koreanTitle: '색깔과 감정 (Colors & Feelings)',
    icon: 'Palette',
    estimatedMinutes: 10,
    fiveYearOldSummary: 'Paint your world with bright colors and express when you feel super happy or sleepy!',
    detailedGuide: [
      'Colors in Korean are expressive and vibrant.',
      'Red is 빨간색 (ppal-gan-saek), Blue is 파란색 (pa-ran-saek), and Yellow is 노란색 (no-ran-saek).',
      'Notice that "-색" (saek) means "color"!'
    ],
    vocab: [
      {
        id: 'col-red',
        korean: '빨간색',
        romanization: 'ppal-gan-saek',
        english: 'Red color',
        emoji: '🔴',
        audioText: '빨간색',
        tips: 'Like ripe strawberries and apples.',
        category: 'Colors'
      },
      {
        id: 'col-blue',
        korean: '파란색',
        romanization: 'pa-ran-saek',
        english: 'Blue color',
        emoji: '🔵',
        audioText: '파란색',
        tips: 'Like the wide sunny sky.',
        category: 'Colors'
      },
      {
        id: 'col-yellow',
        korean: '노란색',
        romanization: 'no-ran-saek',
        english: 'Yellow color',
        emoji: '🟡',
        audioText: '노란색',
        tips: 'Like sweet bananas and baby chicks.',
        category: 'Colors'
      },
      {
        id: 'feel-happy',
        korean: '행복해요',
        romanization: 'haeng-bok-hae-yo',
        english: 'I am happy',
        emoji: '😄',
        audioText: '행복해요',
        tips: 'Smiling ear to ear with friends.',
        category: 'Feelings'
      },
      {
        id: 'feel-good',
        korean: '좋아요',
        romanization: 'jo-a-yo',
        english: 'Good / I like it!',
        emoji: '👍',
        audioText: '좋아요',
        tips: 'Thumps up! The most universal phrase in Korea.',
        category: 'Feelings'
      }
    ],
    sentences: [
      {
        id: 's-col-1',
        korean: '하늘이 파란색이에요.',
        romanization: 'ha-neul-i pa-ran-saek-i-e-yo',
        english: 'The sky is blue.',
        literalBreakdown: [
          { korean: '하늘', romanization: 'ha-neul', literal: 'sky', partOfSpeech: 'subject' },
          { korean: '이', romanization: 'i', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '파란색', romanization: 'pa-ran-saek', literal: 'blue color', partOfSpeech: 'noun' },
          { korean: '이에요', romanization: 'i-e-yo', literal: 'is / equals', partOfSpeech: 'verb' }
        ],
        explanation: '"-이에요" is the friendly verb that attaches to nouns to say "is X".'
      }
    ],
    grammarCards: [
      {
        id: 'g-ieyo-yeoyo',
        title: 'The Friendly "Is / Am": 이에요 vs. 예요',
        badge: 'Basement Rule',
        kidSummary: 'If your word has a basement consonant, it grabs "이에요" to ride smoothly. If no basement, it takes the quicker "예요"!',
        ruleExplanation: 'Both mean "to be" (am/is/are). Use 이에요 after words with batchim (e.g. 물이에요), and 예요 after vowels (e.g. 사과예요).',
        dos: [
          { korean: '물이에요', romanization: 'mul-i-e-yo', english: 'It is water', why: '물 has basement ㄹ -> needs 이' },
          { korean: '사과예요', romanization: 'sa-gwa-ye-yo', english: 'It is an apple', why: '과 ends in vowel -> takes 예요' }
        ],
        donts: [
          { korean: '물예요', romanization: 'mul-ye-yo', wrongEnglish: 'Awkward tongue stumble', explanation: 'Saying ㄹ and ㅖ together trips your tongue! That\'s why Korean adds the 이 bridge.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-col-1',
        type: 'listen-select',
        sectionId: 'colors-and-feelings',
        prompt: 'Listen and select the word for "Yellow":',
        audioTarget: '노란색',
        targetKorean: '노란색',
        targetEnglish: 'Yellow color',
        options: ['빨간색', '파란색', '노란색', '좋아요'],
        correctAnswer: '노란색',
        explanation: '노란색 (no-ran-saek) is the cheerful color yellow!'
      },
      {
        id: 'ex-col-2',
        type: 'speaking-test',
        sectionId: 'colors-and-feelings',
        prompt: 'Say "I like it / It is good!" (좋아요):',
        targetKorean: '좋아요',
        targetRomanization: 'jo-a-yo',
        targetEnglish: 'Good / I like it!',
        explanation: 'Say "jo-ah-yo" cheerfully!'
      }
    ]
  },

  'sentence-sov-structure': {
    id: 'sentence-sov-structure',
    stageId: 'stage-3',
    title: 'Sentence Architecture (The SOV Secret)',
    koreanTitle: '문장의 비밀: SOV 구조 (Sentence Architecture)',
    icon: 'Layers',
    estimatedMinutes: 14,
    fiveYearOldSummary: 'English says: [I] [Eat] [Apples]. Korean says: [I] [Apples] [Eat]! Picture it like a game of catch: you hold the ball, show the toy, and then throw the action!',
    detailedGuide: [
      'English is an SVO language: Subject -> Verb -> Object ("The boy kicks the ball").',
      'Korean is an SOV language: Subject -> Object -> Verb ("The boy ball kicks").',
      'Because the verb is always last, you can listen to all the context first before finding out what action took place!'
    ],
    vocab: [
      {
        id: 'sov-na',
        korean: '나',
        romanization: 'na',
        english: 'I / Me (casual / friendly)',
        audioText: '나',
        category: 'Pronoun'
      },
      {
        id: 'sov-neoneun',
        korean: '너',
        romanization: 'neo',
        english: 'You (casual / friends)',
        audioText: '너',
        category: 'Pronoun'
      },
      {
        id: 'sov-chaek',
        korean: '책',
        romanization: 'chaek',
        english: 'Book',
        emoji: '📖',
        audioText: '책',
        category: 'Object'
      },
      {
        id: 'sov-ilgeo',
        korean: '읽어요',
        romanization: 'il-geo-yo',
        english: 'Reads / Reading',
        emoji: '👓',
        audioText: '읽어요',
        category: 'Verb'
      }
    ],
    sentences: [
      {
        id: 's-sov-comp',
        korean: '나는 책을 읽어요.',
        romanization: 'na-neun chaek-eul il-geo-yo',
        english: 'I read a book.',
        literalBreakdown: [
          { korean: '나', romanization: 'na', literal: 'I', partOfSpeech: 'subject' },
          { korean: '는', romanization: 'neun', literal: '[Topic tag]', partOfSpeech: 'particle' },
          { korean: '책', romanization: 'chaek', literal: 'book', partOfSpeech: 'object' },
          { korean: '을', romanization: 'eul', literal: '[Object tag]', partOfSpeech: 'particle' },
          { korean: '읽어요', romanization: 'il-geo-yo', literal: 'reads [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Notice the clear color-coded sequence: [Blue Subject: 나는] -> [Green Object: 책을] -> [Orange Verb: 읽어요].'
      },
      {
        id: 's-sov-2',
        korean: '친구가 우유를 마셔요.',
        romanization: 'chin-gu-ga u-yu-reul ma-syeo-yo',
        english: 'A friend drinks milk.',
        literalBreakdown: [
          { korean: '친구', romanization: 'chin-gu', literal: 'friend', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '우유', romanization: 'u-yu', literal: 'milk', partOfSpeech: 'object' },
          { korean: '를', romanization: 'reul', literal: '[Object tag]', partOfSpeech: 'particle' },
          { korean: '마셔요', romanization: 'ma-syeo-yo', literal: 'drinks [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'English: Friend drinks milk. Korean: Friend milk drinks!'
      }
    ],
    grammarCards: [
      {
        id: 'g-sov-visual',
        title: 'The Great SOV Puzzle',
        badge: 'Architecture Key',
        kidSummary: 'Think of Korean sentences like baking a pizza: First decide who is chef (Subject), then prepare the toppings (Object), and last put it in the oven to bake (Verb)!',
        ruleExplanation: 'The Subject introduces who, the Object introduces what, and the Verb seals the entire sentence together at the end.',
        blocksFormula: [
          { text: '주어 (Subject)', color: 'bg-blue-100 text-blue-700 border-blue-400', label: 'Who?' },
          { text: '목적어 (Object)', color: 'bg-emerald-100 text-emerald-700 border-emerald-400', label: 'What?' },
          { text: '동사 (Verb)', color: 'bg-amber-100 text-amber-700 border-amber-400', label: 'Action!' }
        ],
        dos: [
          { korean: '민수가 사과를 먹어요.', romanization: 'min-su-ga sa-gwa-reul meog-eo-yo', english: 'Minsu apple eats.', why: 'Perfect SOV format' }
        ],
        donts: [
          { korean: '민수가 먹어요 사과를.', romanization: 'min-su-ga meog-eo-yo sa-gwa-reul', wrongEnglish: 'Minsu eats apple.', explanation: 'Placing the verb before the object breaks the Korean sentence flow.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-sov-1',
        type: 'sentence-unscramble',
        sectionId: 'sentence-sov-structure',
        prompt: 'Build "I read a book" in Korean SOV order:',
        targetKorean: '나는 책을 읽어요.',
        targetEnglish: 'I read a book.',
        jumbledTokens: [
          { id: 'v1', text: '읽어요.', partOfSpeech: 'verb' },
          { id: 's1', text: '나는', partOfSpeech: 'subject' },
          { id: 'o1', text: '책을', partOfSpeech: 'object' }
        ],
        correctTokenOrder: ['s1', 'o1', 'v1'],
        correctAnswer: '나는 책을 읽어요.',
        explanation: 'Subject (나는) -> Object (책을) -> Verb (읽어요)!'
      },
      {
        id: 'ex-sov-2',
        type: 'listen-select',
        sectionId: 'sentence-sov-structure',
        prompt: 'Listen and choose what the friend is doing:',
        audioTarget: '친구가 우유를 마셔요.',
        targetKorean: '친구가 우유를 마셔요.',
        targetEnglish: 'A friend drinks milk.',
        options: ['친구가 밥을 먹어요.', '친구가 우유를 마셔요.', '친구가 자요.', '친구가 책을 읽어요.'],
        correctAnswer: '친구가 우유를 마셔요.',
        explanation: '우유를 마셔요 = drinks milk!'
      }
    ]
  },

  'particles-topic-subject': {
    id: 'particles-topic-subject',
    stageId: 'stage-4',
    title: 'Topic & Subject Markers (은/는 vs. 이/가)',
    koreanTitle: '주제와 주어 조사: 은/는 vs. 이/가',
    icon: 'Tag',
    estimatedMinutes: 15,
    fiveYearOldSummary: 'Particles are like colorful sticky name-tags you slap onto words! They tell everyone in the room: "Hey! I am the main topic!" or "Look! It\'s ME who did it!"',
    detailedGuide: [
      'Particles (조사) do not exist in English, but they give Korean sentences incredible flexibility!',
      '은/는 (Topic Marker): "As for me..." or setting the background spotlight.',
      '이/가 (Subject Marker): "Who did it?" or pointing a laser pointer at the exact subject.',
      'Batchim rule applies: if the word ends with a basement consonant, use 은 or 이. If it ends in a vowel, use 는 or 가.'
    ],
    vocab: [
      {
        id: 'pt-neun',
        korean: '는 / 은',
        romanization: 'neun / eun',
        english: 'Topic marker ("As for...")',
        tips: '는 after vowels, 은 after basement consonants.',
        audioText: '는',
        category: 'Particle'
      },
      {
        id: 'pt-ga',
        korean: '가 / 이',
        romanization: 'ga / i',
        english: 'Subject marker ("Spotlight on who")',
        tips: '가 after vowels, 이 after basement consonants.',
        audioText: '가',
        category: 'Particle'
      },
      {
        id: 'pt-seonsaeng',
        korean: '선생님',
        romanization: 'seon-saeng-nim',
        english: 'Teacher',
        emoji: '👩‍🏫',
        audioText: '선생님',
        tips: 'Ends in basement ㅁ, so it takes 은 or 이!',
        category: 'People'
      }
    ],
    sentences: [
      {
        id: 's-pt-1',
        korean: '선생님은 친절해요.',
        romanization: 'seon-saeng-nim-eun chin-jeol-hae-yo',
        english: 'As for the teacher, she is kind.',
        literalBreakdown: [
          { korean: '선생님', romanization: 'seon-saeng-nim', literal: 'teacher', partOfSpeech: 'subject' },
          { korean: '은', romanization: 'eun', literal: '[Topic tag: as for]', partOfSpeech: 'particle' },
          { korean: '친절해요', romanization: 'chin-jeol-hae-yo', literal: 'is kind [polite]', partOfSpeech: 'verb' }
        ],
        explanation: '선생님 ends in basement ㅁ, so it comfortably attaches "은"!'
      },
      {
        id: 's-pt-2',
        korean: '누가 왔어요? 내가 왔어요!',
        romanization: 'nu-ga wass-eo-yo? nae-ga wass-eo-yo!',
        english: 'Who arrived? I did!',
        literalBreakdown: [
          { korean: '누가', romanization: 'nu-ga', literal: 'who-[subject]', partOfSpeech: 'subject' },
          { korean: '왔어요', romanization: 'wass-eo-yo', literal: 'arrived / came', partOfSpeech: 'verb' },
          { korean: '내가', romanization: 'nae-ga', literal: 'I-[subject]', partOfSpeech: 'subject' },
          { korean: '왔어요', romanization: 'wass-eo-yo', literal: 'arrived / came', partOfSpeech: 'verb' }
        ],
        explanation: 'When pointing out WHO did the action, use "가" (내가 = I am the one)!'
      }
    ],
    grammarCards: [
      {
        id: 'g-eun-neun-rule',
        title: 'Basement Check for 은/는 and 이/가',
        badge: 'Tag Matching Rule',
        kidSummary: 'Look at the last letter of the noun! Has a basement? Pick 은 or 이. No basement? Pick 는 or 가.',
        ruleExplanation: 'Vowel end -> 는 / 가 (smooth glide). Consonant end -> 은 / 이 (needs vowel bridge to prevent choking).',
        dos: [
          { korean: '나 + 는 = 나는', romanization: 'na-neun', english: 'As for me', why: '나 ends in vowel ㅏ' },
          { korean: '밥 + 은 = 밥은', romanization: 'bab-eun', english: 'As for rice', why: '밥 has basement ㅂ' },
          { korean: '친구 + 가 = 친구가', romanization: 'chin-gu-ga', english: 'Friend (subject)', why: '친구 ends in vowel ㅜ' },
          { korean: '물 + 이 = 물이', romanization: 'mul-i', english: 'Water (subject)', why: '물 has basement ㄹ' }
        ],
        donts: [
          { korean: '나은 or 밥는', romanization: '-', wrongEnglish: 'Mismatched particle', explanation: 'Never attach 는 to a basement or 은 to a bare vowel!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-pt-1',
        type: 'listen-select',
        sectionId: 'particles-topic-subject',
        prompt: 'Which particle attaches to "사과" (apple) to mark the topic?',
        audioTarget: '사과는',
        targetKorean: '사과는',
        targetEnglish: 'As for the apple...',
        options: ['사과는', '사과은', '사과이', '사과을'],
        correctAnswer: '사과는',
        explanation: '"사과" ends in vowel ㅘ, so it takes "-는"!'
      },
      {
        id: 'ex-pt-2',
        type: 'dictation',
        sectionId: 'particles-topic-subject',
        prompt: 'Type the phrase you hear: "The teacher" (with topic marker):',
        audioTarget: '선생님은',
        targetKorean: '선생님은',
        targetEnglish: 'As for the teacher...',
        correctAnswer: '선생님은',
        explanation: '선생님 + 은 = 선생님은.'
      }
    ]
  },

  'particles-object-location': {
    id: 'particles-object-location',
    stageId: 'stage-4',
    title: 'Object & Place Markers (을/를 & 에/에서)',
    koreanTitle: '목적어와 장소 조사: 을/를, 에/에서',
    icon: 'MapPin',
    estimatedMinutes: 14,
    fiveYearOldSummary: '을/를 marks what gets touched, bitten, or played with! 에/에서 tells where you are going or where the party is happening!',
    detailedGuide: [
      '을/를 is the Direct Object Marker. It answers: "What did you eat? What did you read?"',
      'If the object has a basement: 을 (밥을, 책을). If no basement: 를 (사과를, 우유를).',
      '에 is for static presence or destination: "going TO the park" (공원에 가요).',
      '에서 is where dynamic action takes place: "playing AT the park" (공원에서 놀아요).'
    ],
    vocab: [
      {
        id: 'pt-reul',
        korean: '를 / 을',
        romanization: 'reul / eul',
        english: 'Object marker ("Receives the action")',
        audioText: '를',
        category: 'Particle'
      },
      {
        id: 'pt-e',
        korean: '에',
        romanization: 'e',
        english: 'At / To (destination, static place)',
        audioText: '에',
        category: 'Particle'
      },
      {
        id: 'pt-eseo',
        korean: '에서',
        romanization: 'e-seo',
        english: 'At / In (place where action happens)',
        audioText: '에서',
        category: 'Particle'
      },
      {
        id: 'loc-gongwon',
        korean: '공원',
        romanization: 'gong-won',
        english: 'Park / Playground',
        emoji: '🏞️',
        audioText: '공원',
        category: 'Place'
      },
      {
        id: 'loc-jip',
        korean: '집',
        romanization: 'jip',
        english: 'Home / House',
        emoji: '🏠',
        audioText: '집',
        category: 'Place'
      }
    ],
    sentences: [
      {
        id: 's-loc-1',
        korean: '우리가 공원에서 놀아요.',
        romanization: 'u-ri-ga gong-won-e-seo nor-a-yo',
        english: 'We play at the park.',
        literalBreakdown: [
          { korean: '우리', romanization: 'u-ri', literal: 'we', partOfSpeech: 'subject' },
          { korean: '가', romanization: 'ga', literal: '[Subject tag]', partOfSpeech: 'particle' },
          { korean: '공원', romanization: 'gong-won', literal: 'park', partOfSpeech: 'noun' },
          { korean: '에서', romanization: 'e-seo', literal: 'at [active location]', partOfSpeech: 'particle' },
          { korean: '놀아요', romanization: 'nor-a-yo', literal: 'plays [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Playing is an active game, so we use "에서" instead of just "에"!'
      },
      {
        id: 's-loc-2',
        korean: '집에 가요.',
        romanization: 'jip-e ga-yo',
        english: 'I am going home.',
        literalBreakdown: [
          { korean: '집', romanization: 'jip', literal: 'home', partOfSpeech: 'noun' },
          { korean: '에', romanization: 'e', literal: 'to [destination]', partOfSpeech: 'particle' },
          { korean: '가요', romanization: 'ga-yo', literal: 'goes [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Destination towards home uses simple "에"!'
      }
    ],
    grammarCards: [
      {
        id: 'g-e-vs-eseo',
        title: 'Destination "에" vs. Active "에서"',
        badge: 'Location Detective',
        kidSummary: 'Going TO a place? Use "에". Doing karate, dancing, or eating AT a place? Use "에서"!',
        ruleExplanation: '에 marks where you are going or sitting (가다, 오다, 있다). 에서 marks dynamic physical actions (먹다, 놀다, 공부하다).',
        dos: [
          { korean: '학교에 가요.', romanization: 'hak-gyo-e ga-yo', english: 'I go to school.', why: 'Movement destination' },
          { korean: '학교에서 공부해요.', romanization: 'hak-gyo-e-seo gong-bu-hae-yo', english: 'I study at school.', why: 'Action taking place' }
        ],
        donts: [
          { korean: '공원에 놀아요', romanization: 'gong-won-e nor-a-yo', wrongEnglish: 'Unnatural phrasing', explanation: 'Since you are actively playing in the park, 에서 is the natural choice!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-obj-1',
        type: 'listen-select',
        sectionId: 'particles-object-location',
        prompt: 'Choose the correct particle for "drinks water" (물 + ? + 마셔요):',
        audioTarget: '물을 마셔요.',
        targetKorean: '물을',
        targetEnglish: 'Water (as an object)',
        options: ['물을', '물를', '물에', '물이'],
        correctAnswer: '물을',
        explanation: '물 has basement ㄹ, so it attaches 을: 물을 마셔요!'
      },
      {
        id: 'ex-obj-2',
        type: 'sentence-unscramble',
        sectionId: 'particles-object-location',
        prompt: 'Build "I am going home" (jip-e ga-yo):',
        targetKorean: '집에 가요.',
        targetEnglish: 'I am going home.',
        jumbledTokens: [
          { id: 'j2', text: '가요.', partOfSpeech: 'verb' },
          { id: 'j1', text: '집에', partOfSpeech: 'noun' }
        ],
        correctTokenOrder: ['j1', 'j2'],
        correctAnswer: '집에 가요.',
        explanation: '집에 (to home) + 가요 (goes)!'
      }
    ]
  },

  'polite-conjugation': {
    id: 'polite-conjugation',
    stageId: 'stage-4',
    title: 'Everyday Politeness (-아요 / -어요) & Banmal',
    koreanTitle: '친절한 말투: -아요 / -어요와 반말',
    icon: 'SmilePlus',
    estimatedMinutes: 15,
    fiveYearOldSummary: 'Adding "요" (yo) to the end of your sentence is like putting a polite smile on your face! It treats everyone with warmth and respect.',
    detailedGuide: [
      'Korean has politeness levels built right into the verb.',
      'Informal Polite (해요체, ending in -아요 / -어요): The friendly, standard gold-standard used with strangers, teachers, and shopkeepers.',
      'Casual (반말 / ban-mal): Used with close childhood friends or younger siblings (drop the "요"!).',
      'Vowel Harmony Rule: If the last vowel of the verb stem is bright (ㅏ or ㅗ), add -아요! For all other vowels (ㅓ, ㅜ, ㅣ, ㅡ), add -어요!'
    ],
    vocab: [
      {
        id: 'pol-annyeong',
        korean: '안녕하세요',
        romanization: 'an-nyeong-ha-se-yo',
        english: 'Hello! (Polite)',
        emoji: '👋',
        audioText: '안녕하세요',
        tips: 'Literally means "Are you at peace?"',
        category: 'Greeting'
      },
      {
        id: 'pol-gamsa',
        korean: '감사합니다',
        romanization: 'gam-sa-ham-ni-da',
        english: 'Thank you! (Polite & formal)',
        emoji: '🙏',
        audioText: '감사합니다',
        tips: 'Bowing slightly when saying this makes you an instant favorite!',
        category: 'Greeting'
      },
      {
        id: 'pol-gwaenchana',
        korean: '괜찮아요',
        romanization: 'gwaen-chan-a-yo',
        english: 'It\'s okay / No problem!',
        emoji: '👌',
        audioText: '괜찮아요',
        tips: 'Comforting and reassuring.',
        category: 'Expression'
      }
    ],
    sentences: [
      {
        id: 's-pol-1',
        korean: '선생님, 안녕하세요!',
        romanization: 'seon-saeng-nim, an-nyeong-ha-se-yo!',
        english: 'Teacher, hello!',
        literalBreakdown: [
          { korean: '선생님', romanization: 'seon-saeng-nim', literal: 'teacher', partOfSpeech: 'noun' },
          { korean: '안녕하세요', romanization: 'an-nyeong-ha-se-yo', literal: 'be in peace / hello [polite]', partOfSpeech: 'verb' }
        ],
        explanation: 'Always greet with friendly polite ending -요 when speaking to adults!'
      },
      {
        id: 's-pol-2',
        korean: '친구야, 같이 놀자!',
        romanization: 'chin-gu-ya, gat-i nol-ja!',
        english: 'Friend, let\'s play together! (Casual banmal)',
        literalBreakdown: [
          { korean: '친구야', romanization: 'chin-gu-ya', literal: 'hey friend', partOfSpeech: 'noun' },
          { korean: '같이', romanization: 'gat-i', literal: 'together', partOfSpeech: 'other' },
          { korean: '놀자', romanization: 'nol-ja', literal: 'let\'s play [casual banmal]', partOfSpeech: 'verb' }
        ],
        explanation: 'With same-age playground buddies, children use casual "반말" (banmal).'
      }
    ],
    grammarCards: [
      {
        id: 'g-ayo-eoyo-bright',
        title: 'Bright Sun (ㅏ/ㅗ) vs. Cool Breeze Vowels',
        badge: 'Vowel Harmony',
        kidSummary: 'Look at the root of the verb! If it has sunny bright vowels (ㅏ or ㅗ), invite sunny friend "-아요"! If it has dark cool vowels, invite "-어요"!',
        ruleExplanation: 'Verb stems ending with ㅏ or ㅗ take -아요 (e.g., 살다 -> 살아요, 보다 -> 봐요). All other stems take -어요 (e.g., 먹다 -> 먹어요, 읽다 -> 읽어요). Verbs with 하다 become 해요.',
        dos: [
          { korean: '가다 -> 가요', romanization: 'ga-da -> ga-yo', english: 'Go -> goes', why: 'ㅏ + 아 merges into 가요' },
          { korean: '먹다 -> 먹어요', romanization: 'meog-da -> meog-eo-yo', english: 'Eat -> eats', why: 'ㅓ is cool vowel -> takes 어요' },
          { korean: '하다 -> 해요', romanization: 'ha-da -> hae-yo', english: 'Do -> does', why: '하다 always transforms to 해요' }
        ],
        donts: [
          { korean: '먹아요', romanization: 'meog-a-yo', wrongEnglish: 'Vowel clash', explanation: 'Never mix cool ㅓ with sunny 아요!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-pol-1',
        type: 'listen-select',
        sectionId: 'polite-conjugation',
        prompt: 'Listen and select the polite greeting for "Hello":',
        audioTarget: '안녕하세요',
        targetKorean: '안녕하세요',
        targetEnglish: 'Hello! (Polite)',
        options: ['감사합니다', '안녕하세요', '괜찮아요', '잘가요'],
        correctAnswer: '안녕하세요',
        explanation: '안녕하세요 (an-nyeong-ha-se-yo) is the universal polite Korean greeting!'
      },
      {
        id: 'ex-pol-2',
        type: 'speaking-test',
        sectionId: 'polite-conjugation',
        prompt: 'Speak "Thank you" into your microphone (감사합니다):',
        targetKorean: '감사합니다',
        targetRomanization: 'gam-sa-ham-ni-da',
        targetEnglish: 'Thank you!',
        explanation: 'Say "gahm-sah-hahm-nee-dah" clearly!'
      }
    ]
  }
};
