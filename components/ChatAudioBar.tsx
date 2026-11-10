import React from 'react';
import { Language } from '../types';
import { DeaconVoice, DEACON_VOICES } from '../services/ttsService';
import { Volume2, VolumeX, Mic, MicOff, Settings2, Sparkles, Check } from 'lucide-react';

interface ChatAudioBarProps {
  lang: Language;
  s: any;
  activeVoice: DeaconVoice;
  onSelectVoice: (voice: DeaconVoice) => void;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export const ChatAudioBar: React.FC<ChatAudioBarProps> = ({
  lang,
  s,
  activeVoice,
  onSelectVoice,
  autoSpeak,
  onToggleAutoSpeak,
  isSpeaking,
  onStopSpeaking
}) => {
  return (
    <div className="bg-stone-100/90 border-b border-stone-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
      {/* Voice Persona Selector */}
      <div className="flex items-center space-x-2">
        <span className="font-bold text-stone-600 flex items-center gap-1.5">
          <Volume2 size={14} className="text-[#7B1113]" />
          <span>{s.voice}:</span>
        </span>
        <select
          value={activeVoice}
          onChange={(e) => onSelectVoice(e.target.value as DeaconVoice)}
          className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#7B1113] shadow-2xs"
        >
          {DEACON_VOICES.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label[lang] || v.label.en}
            </option>
          ))}
        </select>
      </div>

      {/* Auto-Speak Toggle & Global Audio Status */}
      <div className="flex items-center space-x-2">
        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="flex items-center space-x-1 px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-lg border border-red-300 transition-colors"
            title={s.stop}
          >
            <VolumeX size={13} />
            <span>{s.stop}</span>
          </button>
        )}

        <button
          onClick={onToggleAutoSpeak}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-bold border transition-all ${
            autoSpeak
              ? 'bg-[#006837] text-white border-[#006837] shadow-xs'
              : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
          }`}
          title={s.autoSpeak}
        >
          <Sparkles size={12} className={autoSpeak ? 'text-[#E5B200]' : 'text-stone-400'} />
          <span>{s.autoSpeak}</span>
          {autoSpeak && <Check size={12} />}
        </button>
      </div>
    </div>
  );
};
