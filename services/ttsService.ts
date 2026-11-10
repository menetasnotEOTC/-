import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

const API_KEY = process.env.API_KEY || '';

export type DeaconVoice = 'Fenrir' | 'Charon' | 'Zephyr' | 'Kore';

export interface DeaconVoiceOption {
  id: DeaconVoice;
  label: Record<Language, string>;
  description: Record<Language, string>;
  gender: 'male' | 'female';
}

export const DEACON_VOICES: DeaconVoiceOption[] = [
  {
    id: 'Fenrir',
    label: {
      en: 'Deacon Fenrir (Reverent & Deep)',
      am: 'ዲያቆን ፌንሪር (ግርማዊና ጥልቅ)',
      om: 'Diyaaqon Fenrir (Gadi fagoo)',
      ti: 'ዲያቆን ፌንሪር (ግርማዊን ዓሚቕን)',
      so: 'Sheekh Fenrir (Qoto dheer)'
    },
    description: {
      en: 'Solemn, reverent liturgical tone',
      am: 'የተከበረ፣ መንፈሳዊና የተረጋጋ ድምፅ',
      om: 'Sagalee kabajamaa fi qabbanaa’aa',
      ti: 'ዝኸበረን መንፈሳውን ድምጺ',
      so: 'Cod degan oo qadarin leh'
    },
    gender: 'male'
  },
  {
    id: 'Charon',
    label: {
      en: 'Deacon Charon (Scholarly & Calm)',
      am: 'ዲያቆን ቻሮን (ሊቃውንታዊና የረጋ)',
      om: 'Diyaaqon Charon (Hayyummaa)',
      ti: 'ዲያቆን ቻሮን (ሊቃውንታውን ዝረጋግአን)',
      so: 'Sheekh Charon (Aqoonyahan)'
    },
    description: {
      en: 'Measured, contemplative scholar tone',
      am: 'ምሁራዊ፣ አርቆ አሳቢና ጥልቅ',
      om: 'Sagalee hayyootaa fi qorannoo',
      ti: 'ምሁራውን ኣስተንትኖኣውን',
      so: 'Cod deggan oo waxbarasho'
    },
    gender: 'male'
  },
  {
    id: 'Zephyr',
    label: {
      en: 'Deacon Zephyr (Gentle & Warm)',
      am: 'ዲያቆን ዜፊር (ለስላሳና አጽናኝ)',
      om: 'Diyaaqon Zephyr (Lallafaa)',
      ti: 'ዲያቆን ዜፊር (ልኡምን ዘጸናንዕን)',
      so: 'Deacon Zephyr (Dhaqaaq fudud)'
    },
    description: {
      en: 'Warm, compassionate pastoral voice',
      am: 'አጽናኝና አባትነት ያለው ድምፅ',
      om: 'Sagalee jaalalaa fi gammachuu',
      ti: 'ኣጸናናዕን ርሕሩሕን ድምጺ',
      so: 'Cod naxariis leh'
    },
    gender: 'male'
  },
  {
    id: 'Kore',
    label: {
      en: 'Sister Kore (Clear & Melodic)',
      am: 'እህት ኮሬ (ጥርት ያለና ዜማዊ)',
      om: 'Obboleetii Kore (Qulqulluu)',
      ti: 'ሓብቲ ኮሬ (ንጹርን ዜማውን)',
      so: 'Walaasha Kore (Cad)'
    },
    description: {
      en: 'Clear, luminous liturgical reading voice',
      am: 'ጥርት ያለ የማንበቢያ ድምፅ',
      om: 'Sagalee qulqulluu fi sirbaa',
      ti: 'ንጹር ናይ ንባብ ድምጺ',
      so: 'Cod akhris cad'
    },
    gender: 'female'
  }
];

/**
 * Strips markdown symbols, asterisks, brackets, and URLs so the TTS engine speaks cleanly.
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';

  return text
    // Replace markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Replace bold/italic asterisks while preserving text
    .replace(/\*{1,3}(.*?)\*{1,3}/g, '$1')
    // Replace markdown links [title](url) -> title
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Replace bullet points
    .replace(/^[-*•]\s+/gm, '')
    // Clean remaining stray markdown characters
    .replace(/[`_~>]/g, '')
    // Normalize multiple spaces and newlines
    .replace(/\n\s*\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parses assistant message content to separate the main body and the bolded source book/reference.
 */
export function extractContentAndCitation(content: string): {
  body: string;
  citation: string | null;
  hasBoldCitation: boolean;
} {
  if (!content) return { body: '', citation: null, hasBoldCitation: false };

  // Look for bold citation line at the end, e.g. **Source: ...** or **ምንጭ፡ ...** or **Madda: ...**
  const citationRegex = /(?:(?:\r?\n)+|\s+)((\*\*(?:Source|ምንጭ|ምንጪ|Madda|Xigasho|ዋቢ|References?):?[^*]+\*\*|\*\*[^*]*(?:81|Canon|Haymanote|Fetha|Kibre|Henok|Enoch|Jubilees|Synaxarium|Sinksar|Diggua|Gospel|Mathew|Mark|Luke|John|Paul|Peter|Athanasius|Cyril|Yared|Deggwa|መጽሐፍ|ወንጌል|ሃይማኖተ|ፍትሐ|ክብረ|ድርሳን|ገድል)[^*]+\*\*))$/i;

  const match = content.match(citationRegex);
  if (match && match[1]) {
    const citation = match[1].trim();
    const body = content.substring(0, match.index).trim();
    return {
      body,
      citation,
      hasBoldCitation: true
    };
  }

  // Check if the last paragraph or line is entirely wrapped in **...**
  const lines = content.trim().split(/\r?\n+/);
  const lastLine = lines[lines.length - 1]?.trim();
  if (lastLine && lastLine.startsWith('**') && lastLine.endsWith('**') && lastLine.length > 5 && lines.length > 1) {
    const body = lines.slice(0, -1).join('\n\n').trim();
    return {
      body,
      citation: lastLine,
      hasBoldCitation: true
    };
  }

  return {
    body: content,
    citation: null,
    hasBoldCitation: false
  };
}

/**
 * Returns BCP-47 language tag for Web Speech API synthesis
 */
export function getLanguageSpeechLocale(lang: Language): string {
  switch (lang) {
    case 'am':
      return 'am-ET';
    case 'om':
      return 'om-ET';
    case 'ti':
      return 'ti-ET';
    case 'so':
      return 'so-SO';
    case 'en':
    default:
      return 'en-US';
  }
}

/**
 * Generates high-fidelity AI audio using Gemini 3.8 Flash Lite TTS
 */
export async function generateGeminiSpeech(
  text: string,
  voiceName: DeaconVoice = 'Fenrir',
  lang: Language = 'en'
): Promise<string> {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const cleaned = cleanTextForSpeech(text);
  
  // Truncate to reasonable length if excessively long to prevent token timeouts
  const speechText = cleaned.length > 1500 ? cleaned.slice(0, 1500) + '...' : cleaned;

  const langNames: Record<Language, string> = {
    en: 'English',
    am: 'Amharic',
    om: 'Afaan Oromoo',
    ti: 'Tigrigna',
    so: 'Somali'
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-lite-tts',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: speechText,
            speechMetadata: {
              style: `Reverent, calm, scholarly Deacon of the Ethiopian Orthodox Tewahedo Church speaking in ${langNames[lang]}. Clear liturgical cadence, humble and deliberate.`
            }
          }
        ]
      }
    ] as any,
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName
          }
        }
      }
    }
  });

  const base64Data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Data) {
    throw new Error('No audio data received from Gemini TTS');
  }

  return `data:audio/wav;base64,${base64Data}`;
}

/**
 * Browser Web Speech API fallback player
 */
export class BrowserSpeechManager {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;

  public speak(
    text: string,
    lang: Language,
    rate: number = 1.0,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onError?.(new Error('Speech synthesis not supported in this browser.'));
      return false;
    }

    this.stop();

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) return false;

    const utterance = new SpeechSynthesisUtterance(cleaned);
    this.utterance = utterance;

    const locale = getLanguageSpeechLocale(lang);
    utterance.lang = locale;
    utterance.rate = Math.max(0.7, Math.min(1.5, rate));
    utterance.pitch = 0.95; // Slightly lower pitch for a reverent tone

    // Try finding an appropriate voice in the browser list
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang === locale || v.lang.startsWith(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.utterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.utterance = null;
      onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  }

  public pause(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.utterance = null;
    }
  }

  public getSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const browserSpeech = new BrowserSpeechManager();
