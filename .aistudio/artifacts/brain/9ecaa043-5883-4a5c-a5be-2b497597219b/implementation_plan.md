# Digital Deacon Text-to-Speech & Sacred Source Citations

Implement a high-fidelity text-to-speech (TTS) voice playback system for the Digital Deacon's apologetics responses in all supported languages (Amharic, English, Afaan Oromoo, Tigrigna, and Somali), combined with strict formatting for sacred source books and canonical references displayed in bold on a new line after every answer.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Requirements from User Directives**:
> 1. **Citations Rule**: The Digital Deacon must always cite a sacred source book, patristic text, scripture, or church canon on a new line immediately after the response, formatted in bold (e.g., **ምንጭ: ሃይማኖተ አበው** / **Source: Fetha Nagast (The Law of the Kings)**).
> 2. **Multi-Language Audio**: Voice audio will support all application languages. We will employ a hybrid audio architecture combining Gemini AI Text-to-Speech (`gemini-3.8-flash-lite-tts`) with browser Web Speech synthesis fallback, guaranteeing audio playback even on restricted network conditions or offline-cached sessions.
> 3. **Audio UX**: Each deacon message will feature an interactive audio bar (Play / Pause / Stop, playback time/scrubber, and animated liturgical audio wave pulses) alongside an optional auto-read toggle in the chat controls.

---

## 1. Overview & Core Concept

- **What It Does**: Allows users across Ethiopia and the diaspora to listen to the Digital Deacon recite apologetics explanations, liturgical traditions, and patristic defenses aloud with sacred reverent pacing, accompanied by authoritative canonical citations prominently styled at the foot of each message.
- **Target Audience**: Orthodox believers, catechumens, scholars, and youth seeking theological clarity through both visual reading and auditory learning in their mother tongue.
- **Key Value**: Bridges oral tradition and digital scholarship, allowing users who prefer listening (or are listening during contemplation, travel, or reading assistance) to engage with church teachings accompanied by unambiguous book references.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Asking & Receiving Wisdom**:
   - User types an apologetics question (e.g. asking about Miaphysite Christology, St. Yared's hymns, or fasting rules).
   - The Digital Deacon generates the theological answer, ending with a distinct, bolded source citation block on a new line.
2. **Auditory Engagement (TTS Playback)**:
   - Each assistant bubble displays an elegant gold-accented audio control pill (`Listen to Deacon` / `አድምጥ`).
   - Clicking triggers generation and playback of the reverent voice. The button morphs into a playing state with an animated waveform visualizer, pause/stop buttons, and duration indicator.
   - If the user switches language or clicks another message to play, any active audio gracefully pauses or stops.
3. **Citation Highlighting**:
   - The ending reference line is automatically detected and rendered with an illuminated parchment badge and bold typography (`font-serif font-bold text-stone-900 border-l-2 border-[#E5B200]`).

### Visual Identity & Curatorial Styling

- **Curatorial Tone**: Archival and liturgical reverence matching our Cormorant Garamond and Noto Sans Ethiopic typographic pairing.
- **Color Accents**:
  - Primary Church Red: `#7B1113`
  - Sacred Gold: `#E5B200`
  - Deep Liturgical Green: `#006837`
  - Archival Warm Card: `#FBF9F5` / `bg-stone-50` with hairline borders (`border-stone-200`)
- **Micro-Interactions**:
  - Pulse-glowing speaker icon while audio is preparing.
  - 4-bar dynamic audio frequency wave animation while speech is actively playing.
  - One-click copy for the answer and bold citation.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Hybrid TTS Architecture (Gemini AI TTS + Web Speech API)**
  - *Chosen Approach*: Use Gemini's dedicated `gemini-3.8-flash-lite-tts` model with prebuilt reverent voice configurations (`Fenrir` / `Kore` / `Puck`) converted directly to playable WAV audio, with seamless client-side `window.speechSynthesis` fallback for instant offline speech.
  - *Why*: Provides the highest audio fidelity and vocal warmth for sacred recitation, while never failing silently if network latency or token caps occur.
  - *Alternatives Considered*: Browser-only TTS lacks authentic native pronunciation for Ethiopic languages on non-mobile OS devices; cloud-only TTS could fail on intermittent mobile connections.

- **Decision 2: Strict Citation Injection & Parsing**
  - *Chosen Approach*: Update the Digital Deacon's system instruction with mandatory source citation rules (specifying 81-book canon, Haymanote Abew, Fetha Nagast, Synaxarium, Didascalia, and Patristic writings). Combine this with client-side regex parsing that identifies the terminal bold citation line (`/\*\*(?:Source|ምንጭ|Madda|ምስክር|Xigasho)[\s\S]*?\*\*/i`) to render it as a distinct theological citation card.
  - *Why*: Fulfills the explicit user mandate ("always put a source book or reference after the answer make them bold and in new line after the answer") while guaranteeing both visually appealing formatting and clean TTS narration (preventing the TTS from awkwardly reading out markdown asterisks).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        USER CHAT INTERACTION                           │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ User asks question
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       GEMINI DIGITAL DEACON                            │
│  • System Instruction: Enforces EOTC theology + Mandated bold source   │
│  • Output format: Answer body + "\n\n**Source: [Book / Canon]**"       │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         CHAT MESSAGE PARSER                            │
│  • Extracts theological prose for TTS narration (strips asterisks)     │
│  • Isolates terminal bold reference for visual citation card           │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                   ┌─────────────────┴─────────────────┐
                   ▼                                   ▼
┌─────────────────────────────────────┐ ┌────────────────────────────────┐
│         UI MESSAGE BUBBLE           │ │       TTS AUDIO SERVICE        │
│ • Reverent body text                │ │ • gemini-3.8-flash-lite-tts    │
│ • Illuminated citation card         │ │ • Web Speech API fallback      │
│ • Interactive Audio Player pill     │ │ • AudioContext / HTML5 Audio   │
│ • Animated waveform indicator       │ │ • Play / Pause / Stop states   │
└─────────────────────────────────────┘ └────────────────────────────────┘
```

### Component & State Plan

1. **`services/ttsService.ts`**:
   - `generateSpeechAudio(text: string, lang: Language)`: Calls Gemini 3.8 TTS unary endpoint for rich WAV audio blob.
   - `speakWithWebSpeech(text: string, lang: Language)`: Fallback engine using browser speech synthesis mapped to target locales (`am-ET`, `ti-ET`, `om-ET`, `so-SO`, `en-US`).
   - `cleanTextForSpeech(text: string)`: Strips markdown asterisks, bracketed links, and formatting noise for natural narration.
2. **`services/geminiService.ts`**:
   - Enhances system prompt to strictly enforce bold canonical source citations on a dedicated new line at the conclusion of every response.
3. **`App.tsx` & Message Bubble UI**:
   - Tracks `activeAudioMessageId`, `isPlaying`, `audioProgress`, and `isAudioLoading`.
   - Adds audio button with Play/Pause/Stop and wave visualizer directly beneath the assistant text.
   - Formats the final bold citation block into a distinguished gold-bordered theological reference panel.
