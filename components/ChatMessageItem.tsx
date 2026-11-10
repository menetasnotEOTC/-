import React, { useState } from 'react';
import { ChatMessage, Language } from '../types';
import { extractContentAndCitation, DeaconVoice } from '../services/ttsService';
import { 
  Volume2, 
  Square, 
  Pause, 
  Play, 
  BookOpen, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Loader2
} from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  index: number;
  lang: Language;
  s: any;
  isPlaying: boolean;
  isPaused: boolean;
  isLoadingAudio: boolean;
  activeVoice: DeaconVoice;
  speechSpeed: number;
  onPlay: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onChangeSpeed: (speed: number) => void;
  onTranslate: (index: number, content: string) => void;
  isTranslating: boolean;
}

// Helper to render text with bold markdown (**bold**) parsed into <strong> tags
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Split text by lines to preserve paragraph breaks cleanly
  const paragraphs = text.split(/\r?\n/);

  return (
    <div className="space-y-2">
      {paragraphs.map((para, pIdx) => {
        if (!para.trim()) {
          return <div key={pIdx} className="h-2" />;
        }

        // Split paragraph by **bold** markers
        const parts = para.split(/(\*\*[^*]+\*\*)/g);

        return (
          <p key={pIdx} className="leading-relaxed text-stone-800">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                const inner = part.slice(2, -2);
                return (
                  <strong key={i} className="font-bold text-stone-950 bg-amber-50/80 px-1 py-0.5 rounded border border-amber-200/50">
                    {inner}
                  </strong>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
};

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  index,
  lang,
  s,
  isPlaying,
  isPaused,
  isLoadingAudio,
  activeVoice,
  speechSpeed,
  onPlay,
  onPause,
  onResume,
  onStop,
  onTranslate,
  isTranslating,
  onChangeSpeed
}) => {
  const isUser = message.role === 'user';
  const { body, citation, hasBoldCitation } = extractContentAndCitation(message.content);

  const cleanCitation = citation ? citation.replace(/^\*\*|\*\*$/g, '').trim() : null;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
      <div
        className={`max-w-[92%] sm:max-w-[85%] rounded-2xl transition-all ${
          isUser
            ? 'bg-[#7B1113] text-white p-4 rounded-br-none shadow-md'
            : 'bg-stone-50 border border-stone-200/90 rounded-bl-none shadow-sm p-4 sm:p-5'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-white font-medium">
            {message.content}
          </p>
        ) : (
          <div className="space-y-4">
            {/* Top Deacon Header & Audio Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-200/80 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#006837] animate-pulse" />
                <span className="font-bold tracking-wider text-[#7B1113] uppercase text-[11px]">
                  Digital Deacon
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                  <ShieldCheck size={11} className="text-[#006837]" />
                  <span>Canon 81 Verified</span>
                </span>
              </div>

              {/* Text-to-Speech Controls */}
              <div className="flex items-center space-x-1.5 bg-white px-2 py-1 rounded-xl border border-stone-200 shadow-2xs">
                {isLoadingAudio ? (
                  <div className="flex items-center space-x-1.5 px-2 py-1 text-xs text-[#7B1113] font-semibold animate-pulse">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-[11px]">{s.generatingAudio}</span>
                  </div>
                ) : isPlaying ? (
                  <div className="flex items-center space-x-1">
                    {/* Animated sound wave bars */}
                    <div className="flex items-end space-x-0.5 h-4 px-1.5">
                      <span className="w-0.5 bg-[#7B1113] h-2.5 animate-pulse rounded-full" />
                      <span className="w-0.5 bg-[#006837] h-4 animate-pulse rounded-full" style={{ animationDelay: '100ms' }} />
                      <span className="w-0.5 bg-[#E5B200] h-3 animate-pulse rounded-full" style={{ animationDelay: '200ms' }} />
                      <span className="w-0.5 bg-[#7B1113] h-3.5 animate-pulse rounded-full" style={{ animationDelay: '150ms' }} />
                    </div>

                    {isPaused ? (
                      <button
                        onClick={onResume}
                        className="p-1 text-stone-700 hover:text-[#7B1113] transition-colors rounded hover:bg-stone-100"
                        title="Resume Speech"
                        aria-label="Resume Speech"
                      >
                        <Play size={15} className="fill-stone-700" />
                      </button>
                    ) : (
                      <button
                        onClick={onPause}
                        className="p-1 text-stone-700 hover:text-[#7B1113] transition-colors rounded hover:bg-stone-100"
                        title="Pause Speech"
                        aria-label="Pause Speech"
                      >
                        <Pause size={15} className="fill-stone-700" />
                      </button>
                    )}

                    <button
                      onClick={onStop}
                      className="p-1 text-stone-700 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                      title={s.stop}
                      aria-label={s.stop}
                    >
                      <Square size={13} className="fill-red-600 text-red-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onPlay(index)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#7B1113] text-white hover:bg-[#5e0d0f] rounded-lg font-bold text-[11px] shadow-xs transition-all active:scale-95"
                    title={s.listen}
                  >
                    <Volume2 size={14} />
                    <span>{s.listen}</span>
                  </button>
                )}

                {/* Speed toggle */}
                <div className="flex items-center text-[10px] font-bold text-stone-500 pl-1 border-l border-stone-200">
                  {[0.8, 1.0, 1.2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => onChangeSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        speechSpeed === speed
                          ? 'bg-[#E5B200] text-stone-900 font-black'
                          : 'hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Theological Body Content */}
            <div className="text-[15px] text-stone-800">
              <FormattedText text={body} />
            </div>

            {/* User Request Requirement: Always put a source book or reference after the answer, make them bold and on a new line */}
            {cleanCitation && (
              <div className="mt-4 pt-3 border-t-2 border-[#E5B200]/40">
                <div className="bg-amber-50/90 border-l-4 border-[#7B1113] p-3 sm:p-3.5 rounded-r-xl shadow-xs">
                  <div className="flex items-start space-x-2.5">
                    <div className="p-1.5 bg-[#7B1113] text-white rounded-lg shrink-0 mt-0.5 shadow-2xs">
                      <BookOpen size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#7B1113]">
                          {s.sourceLabel}
                        </span>
                        <span className="text-[9px] bg-[#006837]/15 text-[#006837] px-1.5 py-0.2 rounded font-bold">
                          Authentic EOTC Reference
                        </span>
                      </div>
                      <p className="font-extrabold text-stone-950 text-sm sm:text-base tracking-tight leading-snug">
                        {cleanCitation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Translation and Grounding References */}
            <div className="pt-2 flex flex-col space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                {message.isTranslated && (
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-[#7B1113] bg-[#E5B200]/20 px-2 py-0.5 rounded-md border border-[#E5B200]/40">
                    <Globe size={11} />
                    <span>{s.machineTranslated.toUpperCase()}</span>
                  </div>
                )}
                
                <button
                  onClick={() => onTranslate(index, message.content)}
                  disabled={isTranslating}
                  className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:text-[#7B1113] transition-colors ml-auto"
                >
                  <Globe size={11} />
                  <span>{isTranslating ? 'Translating...' : 'Translate to current language'}</span>
                </button>
              </div>

              {/* Web Grounding Links (if present) */}
              {message.sources && message.sources.length > 0 && (
                <div className="pt-2 border-t border-stone-200/60">
                  <p className="text-[10px] uppercase tracking-wider font-bold mb-1.5 text-stone-400">
                    {lang === 'en' ? 'Verified Citations & Grounding' : 'የተረጋገጡ ምንጮች'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {message.sources.map((src, si) => (
                      <a
                        key={si}
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 bg-white hover:bg-amber-50 px-2 py-1 rounded text-xs border border-stone-200 text-stone-700 hover:text-[#7B1113] transition-colors shadow-2xs"
                      >
                        <span className="truncate max-w-[200px]">{src.title}</span>
                        <ExternalLink size={10} className="shrink-0 opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
