
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ChevronLeft, 
  Loader2, 
  Languages, 
  BookOpen, 
  Info, 
  Book, 
  Play, 
  Pause, 
  Volume2, 
  Type,
  Music,
  ArrowRight
} from 'lucide-react';
import { 
  getSurahList, 
  getSurahDetail, 
  getAyahAudio,
  QURAN_EDITIONS, 
  QURAN_TAFSEERS, 
  QURAN_RECITERS 
} from '@/lib/islamic-data';
import { cn } from '@/lib/utils';

export default function QuranPage() {
  const [mounted, setMounted] = useState(false);
  const [surahs, setSurahs] = useState<any[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<any[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [surahContent, setSurahContent] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [edition, setEdition] = useState('en.sahih');
  const [tafseerEdition, setTafseerEdition] = useState('en.ibnkathir');
  const [reciter, setReciter] = useState('ar.alafasy');
  const [viewMode, setViewMode] = useState<'translation' | 'tafseer'>('translation');
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    getSurahList().then(data => {
      setSurahs(data || []);
      setFilteredSurahs(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredSurahs(
      surahs.filter(s => 
        s.englishName.toLowerCase().includes(search.toLowerCase()) ||
        s.name.includes(search) ||
        s.number.toString().includes(search)
      )
    );
  }, [search, surahs]);

  useEffect(() => {
    if (selectedSurah) {
      loadSurah(selectedSurah.number, edition, viewMode === 'tafseer' ? tafseerEdition : null);
    }
  }, [edition, tafseerEdition, viewMode, selectedSurah]);

  async function loadSurah(number: number, currentEdition: string, currentTafseer: string | null) {
    setContentLoading(true);
    const data = await getSurahDetail(number, currentEdition, currentTafseer);
    setSurahContent(data);
    setContentLoading(false);
  }

  async function handlePlayAyah(ayahNumber: number) {
    if (playingAyah === ayahNumber) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      return;
    }

    setPlayingAyah(ayahNumber);
    const url = await getAyahAudio(ayahNumber, reciter);
    if (url) {
      setAudioUrl(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    }
  }

  function handleSurahClick(surah: any) {
    setSelectedSurah(surah);
    loadSurah(surah.number, edition, viewMode === 'tafseer' ? tafseerEdition : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen pb-20">
      <audio 
        ref={audioRef} 
        onEnded={() => setPlayingAyah(null)} 
        onPause={() => setPlayingAyah(null)} 
      />

      {!selectedSurah ? (
        <div className="space-y-6 pt-12 px-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold text-primary">Noble Quran</h1>
            <p className="text-muted-foreground">Uthmani script with premium Recitations & Tafseer.</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input 
              placeholder="Search Surah by name or number..."
              className="pl-10 h-14 rounded-[1.5rem] bg-card border-border/50 focus:border-accent transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-4">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="h-24 bg-muted/40 animate-pulse rounded-3xl" />
              ))
            ) : (
              filteredSurahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => handleSurahClick(surah)}
                  className="flex items-center gap-6 p-6 rounded-[2rem] bg-card border border-border/30 hover:border-accent/50 hover:shadow-lg transition-all group text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform group-hover:scale-110">
                    <Book className="w-16 h-16" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-bold shrink-0 border border-primary/10">
                    {surah.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-headline font-bold group-hover:text-primary transition-colors">{surah.englishName}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{surah.englishNameTranslation}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-arabic text-2xl text-primary font-bold">{surah.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">{surah.numberOfAyahs} Ayahs</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex items-center gap-4">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full hover:bg-accent/10"
              onClick={() => {
                setSelectedSurah(null);
                setSurahContent(null);
                setPlayingAyah(null);
                audioRef.current?.pause();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h2 className="text-xl font-headline font-bold text-primary">{selectedSurah.englishName}</h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>{selectedSurah.revelationType}</span>
                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>{selectedSurah.numberOfAyahs} Ayahs</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={reciter} onValueChange={setReciter}>
                <SelectTrigger className="w-fit border-none shadow-none bg-transparent h-fit p-1 hover:text-accent">
                   <Music className="w-5 h-5" />
                </SelectTrigger>
                <SelectContent align="end">
                  {QURAN_RECITERS.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={edition} onValueChange={setEdition}>
                <SelectTrigger className="w-fit border-none shadow-none bg-transparent h-fit p-1 hover:text-accent">
                  <Languages className="w-5 h-5" />
                </SelectTrigger>
                <SelectContent align="end">
                  {QURAN_EDITIONS.map(ed => (
                    <SelectItem key={ed.id} value={ed.id}>
                      <span className="mr-2">{ed.flag}</span> {ed.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-6 space-y-8 pb-32">
            <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
              <TabsList className="grid w-full grid-cols-2 rounded-2xl h-14 bg-muted/30 p-1.5 mb-8">
                <TabsTrigger value="translation" className="rounded-xl font-bold uppercase tracking-widest text-xs">Translation</TabsTrigger>
                <TabsTrigger value="tafseer" className="rounded-xl font-bold uppercase tracking-widest text-xs">Tafseer</TabsTrigger>
              </TabsList>

              {viewMode === 'tafseer' && (
                <div className="mb-8 space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-2">Commentary Source</label>
                  <Select value={tafseerEdition} onValueChange={setTafseerEdition}>
                    <SelectTrigger className="h-14 rounded-2xl bg-card border-border/50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <SelectValue placeholder="Select Tafseer" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {QURAN_TAFSEERS.map(t => (
                        <SelectItem key={t.id} value={t.id}>
                          <span className="font-bold text-accent mr-2">[{t.lang}]</span> {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {contentLoading || !surahContent ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Streaming Divine Script...</p>
                </div>
              ) : (
                <div className="space-y-16">
                  {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                     <div className="text-center py-12 border-b border-dashed border-border/50">
                        <p className="text-4xl font-arabic text-primary leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                     </div>
                  )}
                  
                  {surahContent[0].ayahs.map((ayah: any, index: number) => {
                    const secondaryAyah = surahContent[viewMode === 'translation' ? 1 : 2]?.ayahs[index];
                    const isPlaying = playingAyah === ayah.number;
                    
                    return (
                      <div key={ayah.number} className="space-y-8 animate-in fade-in duration-700">
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                               <Badge variant="outline" className="rounded-xl h-9 min-w-9 flex items-center justify-center border-primary/20 text-xs font-bold text-primary bg-primary/5">
                                 {ayah.numberInSurah}
                               </Badge>
                               <Button 
                                 size="icon" 
                                 variant="ghost" 
                                 className={cn(
                                   "rounded-xl h-9 w-9 transition-all",
                                   isPlaying ? "bg-accent text-accent-foreground" : "bg-muted/50 text-muted-foreground hover:text-accent"
                                 )}
                                 onClick={() => handlePlayAyah(ayah.number)}
                               >
                                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                               </Button>
                             </div>
                             <div className="flex items-center gap-2">
                               <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-primary"><Volume2 className="w-4 h-4" /></Button>
                               <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-primary"><Type className="w-4 h-4" /></Button>
                             </div>
                          </div>
                          
                          <div className="relative">
                            <p 
                              className={cn(
                                "text-right text-4xl font-arabic leading-[5.5rem] text-primary tracking-wide transition-all",
                                isPlaying && "text-accent drop-shadow-sm"
                              )}
                              dir="rtl"
                            >
                              {ayah.text}
                            </p>
                          </div>
                        </div>
                        
                        <Card className="rounded-[2.5rem] border-none bg-accent/5 dark:bg-accent/10 p-8 shadow-sm transition-colors hover:bg-accent/10">
                          <div className="flex items-center gap-2 mb-4 opacity-50">
                             {viewMode === 'tafseer' ? <Info className="w-4 h-4 text-accent" /> : <BookOpen className="w-4 h-4 text-primary" />}
                             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                               {viewMode === 'tafseer' ? `Tafseer ${QURAN_TAFSEERS.find(t => t.id === tafseerEdition)?.author}` : 'Meaning'}
                             </span>
                          </div>
                          <p className={cn(
                            "text-base text-foreground/90 leading-relaxed font-medium",
                            viewMode === 'translation' && "italic"
                          )}>
                            {secondaryAyah?.text || "Commentary loading..."}
                          </p>
                          
                          <div className="mt-6 pt-6 border-t border-accent/10 flex items-center justify-between group cursor-pointer">
                             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">View word analysis</span>
                             <ArrowRight className="w-3 h-3 text-accent transition-transform group-hover:translate-x-1" />
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              )}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
