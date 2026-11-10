
import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage, Scholar } from './types';
import { UI_STRINGS, SCHOLARS, BOOKS, ACTIVE_SCHOLARS } from './constants';
import { sendMessageToGemini, translateText } from './services/geminiService';
import { getEOTCCalendarGreeting, FeastInfo, MAJOR_EVENTS_2026 } from './services/calendarService';
import { generateGeminiSpeech, browserSpeech, DeaconVoice } from './services/ttsService';
import { ChatMessageItem } from './components/ChatMessageItem';
import { ChatAudioBar } from './components/ChatAudioBar';
import { 
  Book, 
  Users, 
  UserCheck,
  MessageSquare, 
  Languages, 
  Send, 
  RotateCcw, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cross,
  Mic,
  MicOff,
  Globe,
  Calendar,
  Volume2
} from 'lucide-react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const [error, setError] = useState(false);
  const logoUrl = "https://storage.googleapis.com/app-studio-v2-public-assets-bucket/f7hfhqatzazg5meadyno6o/167258413631/logo_1744284735314.png";

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-[#E5B200] rounded-xl p-1 shadow-md border border-white/20 ${className}`}>
        <Cross className="text-[#7B1113]" size="80%" />
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt="RTD Logo" 
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'scholars' | 'activeScholars' | 'books' | 'calendar'>('chat');
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);
  const [isTranslating, setIsTranslating] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [calendarGreeting, setCalendarGreeting] = useState<FeastInfo | null>(null);

  // Audio / TTS State
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isAudioPaused, setIsAudioPaused] = useState<boolean>(false);
  const [audioLoadingIndex, setAudioLoadingIndex] = useState<number | null>(null);
  const [activeVoice, setActiveVoice] = useState<DeaconVoice>('Fenrir');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const s = UI_STRINGS[lang];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const greeting = getEOTCCalendarGreeting(new Date());
    setCalendarGreeting(greeting);
  }, []);

  const handleStopAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    browserSpeech.stop();
    setPlayingIndex(null);
    setIsAudioPaused(false);
  };

  const handlePauseAudio = () => {
    if (audioElementRef.current && !audioElementRef.current.paused) {
      audioElementRef.current.pause();
      setIsAudioPaused(true);
    } else if (browserSpeech.getSpeaking()) {
      browserSpeech.pause();
      setIsAudioPaused(true);
    }
  };

  const handleResumeAudio = () => {
    if (audioElementRef.current && audioElementRef.current.paused) {
      audioElementRef.current.play();
      setIsAudioPaused(false);
    } else {
      browserSpeech.resume();
      setIsAudioPaused(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setSpeechSpeed(speed);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = speed;
    }
  };

  const playBrowserTTS = (text: string, index: number) => {
    setPlayingIndex(index);
    setIsAudioPaused(false);

    const success = browserSpeech.speak(
      text,
      lang,
      speechSpeed,
      () => {
        setPlayingIndex(index);
        setIsAudioPaused(false);
      },
      () => {
        setPlayingIndex(null);
        setIsAudioPaused(false);
      },
      (err) => {
        console.error('Browser speech error', err);
        setPlayingIndex(null);
        setIsAudioPaused(false);
      }
    );

    if (!success) {
      setPlayingIndex(null);
    }
  };

  const handlePlayAudio = async (index: number) => {
    const targetMsg = messages[index];
    if (!targetMsg || targetMsg.role !== 'assistant') return;

    handleStopAudio();
    setPlayingIndex(index);
    setIsAudioPaused(false);

    // If we already cached the generated audioUrl for this message, play immediately!
    if (targetMsg.audioUrl) {
      const audio = new Audio(targetMsg.audioUrl);
      audio.playbackRate = speechSpeed;
      audioElementRef.current = audio;

      audio.onended = () => {
        setPlayingIndex(null);
        setIsAudioPaused(false);
      };
      audio.onerror = () => {
        playBrowserTTS(targetMsg.content, index);
      };

      try {
        await audio.play();
      } catch (err) {
        console.warn('Audio playback error, falling back to speech synthesis', err);
        playBrowserTTS(targetMsg.content, index);
      }
      return;
    }

    // Otherwise, generate audio with Gemini TTS
    setAudioLoadingIndex(index);
    try {
      const audioDataUrl = await generateGeminiSpeech(targetMsg.content, activeVoice, lang);
      
      // Cache audio URL in messages state
      setMessages(prev => prev.map((m, i) => i === index ? { ...m, audioUrl: audioDataUrl } : m));

      const audio = new Audio(audioDataUrl);
      audio.playbackRate = speechSpeed;
      audioElementRef.current = audio;

      audio.onended = () => {
        setPlayingIndex(null);
        setIsAudioPaused(false);
      };
      audio.onerror = () => {
        playBrowserTTS(targetMsg.content, index);
      };

      await audio.play();
    } catch (err) {
      console.warn('Gemini TTS generation unavailable, falling back to browser speech synthesis:', err);
      playBrowserTTS(targetMsg.content, index);
    } finally {
      setAudioLoadingIndex(null);
    }
  };

  useEffect(() => {
    return () => {
      handleStopAudio();
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const result = await sendMessageToGemini(input, history, lang);
      
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: result.text,
        timestamp: new Date(),
        sources: result.sources
      };
      
      setMessages(prev => {
        const next = [...prev, assistantMsg];
        const newAssistantIndex = next.length - 1;
        if (autoSpeak) {
          setTimeout(() => {
            handlePlayAudio(newAssistantIndex);
          }, 350);
        }
        return next;
      });
    } catch (error) {
      const errorMsg: ChatMessage = {
        role: 'assistant',
        content: lang === 'en' ? "Error communicating with the sacred wisdom hub. Please try again." : 
                 lang === 'am' ? "ከመረጃ ማዕከሉ ጋር መገናኘት አልተቻለም። እባክዎ እንደገና ይሞክሩ።" :
                 "Error / Rakkoo / ጸገም / Khalad / Error",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLang = () => {
    handleStopAudio();
    const langs: Language[] = ['en', 'am', 'om', 'ti', 'so'];
    const currentIndex = langs.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  const handleTranslateMessage = async (index: number, content: string) => {
    if (isTranslating !== null) return;
    setIsTranslating(index);
    try {
      const translated = await translateText(content, lang);
      setMessages(prev => prev.map((m, i) => i === index ? { ...m, content: translated, isTranslated: true, audioUrl: undefined } : m));
    } catch (error) {
      console.error("Translation failed", error);
    } finally {
      setIsTranslating(null);
    }
  };

  const toggleLive = () => {
    setIsLive(!isLive);
    if (!isLive) {
      const welcomeMsg: ChatMessage = {
        role: 'assistant',
        content: lang === 'en' ? "Voice conversation mode activated. I am listening..." : "የድምፅ ውይይት ተጀምሯል። እያዳመጥኩ ነው...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMsg]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#7B1113] text-white shadow-xl border-b-4 border-[#E5B200]">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 md:h-20 md:w-20 relative flex-shrink-0 flex items-center justify-center">
              <Logo className="h-full w-full object-contain drop-shadow-lg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-black tracking-tight leading-tight uppercase">{s.title}</h1>
              <p className="text-[10px] md:text-xs text-stone-200 opacity-80 italic font-medium">{s.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={toggleLang}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all border border-white/20"
          >
            <Languages size={18} />
            <span className="font-semibold">{s.switchLang}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full flex flex-col md:flex-row p-4 gap-6">
        
        {/* Sidebar / Navigation */}
        <aside className="w-full md:w-64 space-y-2 shrink-0">
          <nav className="flex flex-row md:flex-col gap-2">
            {[
              { id: 'chat', label: s.chat, icon: <MessageSquare size={20} /> },
              { id: 'scholars', label: s.scholars, icon: <Users size={20} /> },
              { id: 'activeScholars', label: s.activeScholars, icon: <UserCheck size={20} /> },
              { id: 'books', label: s.books, icon: <Book size={20} /> },
              { id: 'calendar', label: s.calendar, icon: <Calendar size={20} /> },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex-1 md:flex-none flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  activeTab === item.id 
                    ? 'bg-[#7B1113] text-white shadow-md' 
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="hidden md:block p-4 mt-6 bg-[#006837]/10 border border-[#006837]/20 rounded-xl">
             <div className="flex items-center space-x-2 text-[#006837] font-bold mb-2">
                <Cross size={18} />
                <span>Digital Deacon</span>
             </div>
             <p className="text-xs text-stone-600 italic">
               {s.missionStatement}
             </p>
          </div>
        </aside>

        {/* Content Container */}
        <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden relative">
          
          {/* Chat Audio Bar (Shown in chat tab) */}
          {activeTab === 'chat' && (
            <ChatAudioBar
              lang={lang}
              s={s}
              activeVoice={activeVoice}
              onSelectVoice={setActiveVoice}
              autoSpeak={autoSpeak}
              onToggleAutoSpeak={() => setAutoSpeak(prev => !prev)}
              isSpeaking={playingIndex !== null}
              onStopSpeaking={handleStopAudio}
            />
          )}

          {/* Tabs Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            
            {activeTab === 'chat' && (
              <div className="space-y-6">
                {calendarGreeting && (
                  <div className={`p-4 rounded-2xl border-2 flex items-center space-x-4 animate-in slide-in-from-top duration-500 ${
                    calendarGreeting.type === 'feast' 
                      ? 'bg-[#006837]/10 border-[#006837]/30 text-[#006837]' 
                      : 'bg-[#7B1113]/10 border-[#7B1113]/30 text-[#7B1113]'
                  }`}>
                    <div className={`p-3 rounded-full ${calendarGreeting.type === 'feast' ? 'bg-[#006837] text-white' : 'bg-[#7B1113] text-white'}`}>
                      <Cross size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-widest opacity-70">
                        {calendarGreeting.name[lang]}
                      </h4>
                      <p className="text-lg font-bold leading-tight">
                        {calendarGreeting.greeting[lang]}
                      </p>
                    </div>
                  </div>
                )}

                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center text-stone-400 space-y-6">
                    <div className="p-8 bg-white rounded-full border-2 border-dashed border-stone-200 shadow-inner flex items-center justify-center">
                      <Logo className="h-24 w-24 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#7B1113] uppercase tracking-tight">
                        {lang === 'en' ? "Welcome to the Apologetics Hub" : lang === 'am' ? "እንኳን ወደ አፖሎጂቲክስ ማዕከል በደህና መጡ" : s.title}
                      </h3>
                      <p className="max-w-xs mx-auto text-sm mt-1">
                        {lang === 'en' ? "Ask about saints, history, or theological dogmas." : lang === 'am' ? "ስለ ቅዱሳን፣ ታሪክ ወይም የሃይማኖት ትምህርቶች ይጠይቁ።" : s.chatPlaceholder}
                      </p>
                    </div>
                  </div>
                )}
                
                {messages.map((m, idx) => (
                  <ChatMessageItem
                    key={idx}
                    message={m}
                    index={idx}
                    lang={lang}
                    s={s}
                    isPlaying={playingIndex === idx}
                    isPaused={isAudioPaused && playingIndex === idx}
                    isLoadingAudio={audioLoadingIndex === idx}
                    activeVoice={activeVoice}
                    speechSpeed={speechSpeed}
                    onPlay={handlePlayAudio}
                    onPause={handlePauseAudio}
                    onResume={handleResumeAudio}
                    onStop={handleStopAudio}
                    onChangeSpeed={handleSpeedChange}
                    onTranslate={handleTranslateMessage}
                    isTranslating={isTranslating === idx}
                  />
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-stone-100 p-4 rounded-2xl rounded-bl-none animate-pulse flex items-center space-x-3">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-xs text-stone-500 font-medium ml-2">{s.aiThinking}</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {activeTab === 'scholars' && (
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#7B1113]/10 rounded-lg text-[#7B1113]">
                    <Users size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-stone-800">{s.scholars}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SCHOLARS.map((scholar, idx) => (
                  <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="h-48 overflow-hidden relative">
                      <img src={scholar.image} alt={scholar.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[#E5B200] text-xs font-bold uppercase">{scholar.era}</span>
                        <h4 className="text-white font-bold text-lg">{scholar.name[lang]}</h4>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-stone-600 text-sm leading-relaxed italic">
                        {scholar.description[lang]}
                      </p>
                      <button 
                        onClick={() => setSelectedScholar(scholar)}
                        className="mt-4 flex items-center space-x-1 text-[#7B1113] font-bold text-xs uppercase tracking-widest hover:translate-x-1 transition-transform"
                      >
                        <span>{s.learnMore}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {activeTab === 'activeScholars' && (
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#7B1113]/10 rounded-lg text-[#7B1113]">
                    <UserCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-stone-800">{s.activeScholars}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ACTIVE_SCHOLARS.map((scholar, idx) => (
                  <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="h-48 overflow-hidden relative">
                      <img src={scholar.image} alt={scholar.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[#E5B200] text-xs font-bold uppercase">{scholar.era}</span>
                        <h4 className="text-white font-bold text-lg">{scholar.name[lang]}</h4>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-stone-600 text-sm leading-relaxed italic">
                        {scholar.description[lang]}
                      </p>
                      <button 
                        onClick={() => setSelectedScholar(scholar)}
                        className="mt-4 flex items-center space-x-1 text-[#7B1113] font-bold text-xs uppercase tracking-widest hover:translate-x-1 transition-transform"
                      >
                        <span>{s.learnMore}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#7B1113]/10 rounded-lg text-[#7B1113]">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-stone-800">{s.calendar}</h3>
                </div>
                
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                  <h4 className="font-bold text-stone-800 mb-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#7B1113] rounded-full" />
                    <span>{s.majorObservances}</span>
                  </h4>
                  <div className="space-y-4">
                    {MAJOR_EVENTS_2026.map((event, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-100 shadow-sm">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg font-bold text-xs ${
                            event.type === 'feast' ? 'bg-[#006837]/10 text-[#006837]' : 'bg-[#7B1113]/10 text-[#7B1113]'
                          }`}>
                            <span>{event.date.split(' ')[0]}</span>
                            <span className="text-lg">{event.date.split(' ')[1]}</span>
                          </div>
                          <div>
                            <p className="font-bold text-stone-800">{event.name[lang]}</p>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">{event.type === 'feast' ? s.feast : s.fast}</p>
                          </div>
                        </div>
                        {new Date().getMonth() === new Date(event.date + ' 2026').getMonth() && 
                         new Date().getDate() === new Date(event.date + ' 2026').getDate() && (
                          <span className="px-2 py-1 bg-[#E5B200] text-[#7B1113] text-[10px] font-black rounded-full animate-pulse">TODAY</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#7B1113] text-white rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cross size={120} />
                  </div>
                  <h4 className="text-xl font-black mb-2">{s.spiritualGuidance}</h4>
                  <p className="text-stone-100 text-sm leading-relaxed opacity-90">
                    {s.spiritualGuidanceDesc}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'books' && (
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#7B1113]/10 rounded-lg text-[#7B1113]">
                    <Book size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-stone-800">{s.books}</h3>
                </div>
                <div className="space-y-4">
                  {BOOKS.map((book, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-5 bg-stone-50 border border-stone-200 rounded-2xl hover:bg-white hover:border-[#E5B200] transition-all cursor-default group">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-stone-100 group-hover:scale-110 transition-transform">
                      <Book className="text-[#7B1113]" />
                    </div>
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <h4 className="font-bold text-lg text-stone-800">{book.title[lang]}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-stone-200 rounded text-stone-600 font-bold uppercase tracking-tighter">{book.category}</span>
                      </div>
                      <p className="text-stone-600 text-sm mt-1">
                        {book.summary[lang]}
                      </p>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Input (Only visible in chat tab) */}
          {activeTab === 'chat' && (
            <div className="p-4 border-t border-stone-200 bg-white">
              <div className="max-w-3xl mx-auto flex items-center space-x-3">
                <button 
                  onClick={() => {
                    handleStopAudio();
                    setMessages([]);
                  }}
                  className="p-2.5 text-stone-400 hover:text-red-500 transition-colors"
                  title={s.resetChat}
                >
                  <RotateCcw size={20} />
                </button>
                <button 
                  onClick={toggleLive}
                  className={`p-2.5 rounded-full transition-all ${isLive ? 'bg-red-500 text-white animate-pulse' : 'text-stone-400 hover:text-[#7B1113]'}`}
                  title="Voice Conversation"
                >
                  {isLive ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={s.chatPlaceholder}
                    disabled={isLoading}
                    className="w-full px-5 py-3 pr-12 rounded-xl border-2 border-stone-100 focus:border-[#7B1113] focus:ring-0 transition-all outline-none bg-stone-50 text-stone-800 disabled:opacity-50"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1.5 p-2 bg-[#7B1113] text-white rounded-lg hover:bg-[#5a0c0e] disabled:opacity-50 disabled:bg-stone-300 transition-all shadow-md"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Scholar Detail Modal */}
      {selectedScholar && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-64">
              <img src={selectedScholar.image} alt={selectedScholar.name[lang]} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedScholar(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <RotateCcw size={20} className="rotate-45" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="text-[#7B1113] font-bold uppercase tracking-widest text-xs">{selectedScholar.era}</span>
                <h2 className="text-3xl font-black text-stone-900 mt-1">{selectedScholar.name[lang]}</h2>
              </div>
            </div>
            <div className="p-8 pt-4">
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-600 text-lg leading-relaxed">
                  {selectedScholar.description[lang]}
                </p>
                <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                  <h5 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">Church Tradition</h5>
                  <p className="text-sm text-stone-500 italic">
                    {lang === 'en' ? 
                      "This scholar is a pillar of the Orthodox faith, whose teachings continue to guide the Church today." : 
                      "ይህ ሊቅ የኦርቶዶክስ እምነት ምሰሶ ሲሆኑ፣ ትምህርታቸው ዛሬም ቤተክርስቲያንን እየመራ ይገኛል።"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedScholar(null)}
                className="mt-8 w-full py-4 bg-[#7B1113] text-white font-bold rounded-xl hover:bg-[#5d0d0f] transition-colors shadow-lg shadow-[#7B1113]/20"
              >
                {lang === 'en' ? 'Close' : 'ዝጋ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <footer className="py-8 border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Logo className="h-12 w-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
          <p className="text-stone-400 text-xs">
            © {new Date().getFullYear()} {s.title}. {s.copyright}
          </p>
          <div className="flex justify-center space-x-6 mt-3 text-xs font-semibold text-stone-500">
             <a href="#" className="hover:text-[#7B1113]">{s.privacyPolicy}</a>
             <a href="#" className="hover:text-[#7B1113]">{s.termsOfService}</a>
             <a href="#" className="hover:text-[#7B1113]">{s.contactScholar}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
