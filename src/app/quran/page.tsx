
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronLeft, Loader2, Languages, BookOpen, Info, Book } from 'lucide-react';
import { getSurahList, getSurahDetail, QURAN_EDITIONS, QURAN_TAFSEERS } from '@/lib/islamic-data';
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
  const [viewMode, setViewMode] = useState<'translation' | 'tafseer'>('translation');

  useEffect(() => {
    setMounted(true);
    getSurahList().then(data => {
      setSurahs(data);
      setFilteredSurahs(data);
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
  }, [edition, tafseerEdition, viewMode]);

  async function loadSurah(number: number, currentEdition: string, currentTafseer: string | null) {
    setContentLoading(true);
    const data = await getSurahDetail(number, currentEdition, currentTafseer);
    setSurahContent(data);
    setContentLoading(false);
  }

  function handleSurahClick(surah: any) {
    setSelectedSurah(surah);
    loadSurah(surah.number, edition, viewMode === 'tafseer' ? tafseerEdition : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen pb-20">
      {!selectedSurah ? (
        <div className="space-y-6 pt-12 px-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">The Noble Quran</h1>
            <p className="text-muted-foreground">Read and explore divine wisdom with Tafseer.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or number..."
              className="pl-10 h-14 rounded-2xl bg-card border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-muted animate-pulse rounded-3xl" />
              ))
            ) : (
              filteredSurahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => handleSurahClick(surah)}
                  className="flex items-center gap-4 p-4 rounded-3xl bg-card border border-border/50 hover:border-accent transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {surah.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{surah.englishName}</h3>
                    <p className="text-xs text-muted-foreground truncate">{surah.englishNameTranslation}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-arabic text-primary font-bold">{surah.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{surah.numberOfAyahs} Ayahs</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b px-6 py-4 flex items-center gap-4">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full"
              onClick={() => {
                setSelectedSurah(null);
                setSurahContent(null);
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg font-headline font-bold">{selectedSurah.englishName}</h2>
              <p className="text-xs text-muted-foreground">{selectedSurah.revelationType} • {selectedSurah.numberOfAyahs} Ayahs</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={edition} onValueChange={setEdition}>
                <SelectTrigger className="w-fit border-none shadow-none bg-transparent h-fit p-0 hover:text-accent">
                  <Languages className="w-5 h-5" />
                </SelectTrigger>
                <SelectContent>
                  {QURAN_EDITIONS.map(ed => (
                    <SelectItem key={ed.id} value={ed.id}>
                      <span className="mr-2">{ed.flag}</span> {ed.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-6 space-y-6 pb-12">
            <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
              <TabsList className="grid w-full grid-cols-2 rounded-2xl h-12 bg-muted/50 p-1">
                <TabsTrigger value="translation" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Translation</TabsTrigger>
                <TabsTrigger value="tafseer" className="rounded-xl font-bold uppercase tracking-widest text-[10px]">Tafseer</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                {viewMode === 'tafseer' && (
                  <div className="mb-6 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Select Tafseer Language / Author</label>
                    <Select value={tafseerEdition} onValueChange={setTafseerEdition}>
                      <SelectTrigger className="h-12 rounded-xl bg-card border-accent/20">
                        <div className="flex items-center gap-2">
                          <Book className="w-4 h-4 text-accent" />
                          <SelectValue placeholder="Select Tafseer" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {QURAN_TAFSEERS.map(t => (
                          <SelectItem key={t.id} value={t.id}>
                            <span className="font-bold text-accent">[{t.lang}]</span> {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {contentLoading || !surahContent ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                    <p className="text-sm text-muted-foreground">Loading divine words...</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                       <div className="text-center py-8">
                          <p className="text-3xl font-arabic text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                       </div>
                    )}
                    
                    {surahContent[0].ayahs.map((ayah: any, index: number) => {
                      const secondaryAyah = surahContent[viewMode === 'translation' ? 1 : 2]?.ayahs[index];
                      return (
                        <div key={ayah.number} className="space-y-6 group animate-in fade-in duration-500">
                          <div className="flex items-start justify-between gap-4">
                            <Badge variant="outline" className="rounded-lg h-7 border-border/50 text-[10px] font-bold text-muted-foreground bg-card">
                              {ayah.numberInSurah}
                            </Badge>
                            <div className="flex-1">
                               <p className="text-right text-3xl font-arabic leading-[4.5rem] text-primary tracking-wide">
                                {ayah.text}
                              </p>
                            </div>
                          </div>
                          
                          <Card className="rounded-[2rem] border-none bg-accent/5 dark:bg-accent/10 p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                               {viewMode === 'tafseer' ? <Info className="w-4 h-4 text-accent" /> : <BookOpen className="w-4 h-4 text-primary" />}
                               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                 {viewMode === 'tafseer' ? `Tafseer ${QURAN_TAFSEERS.find(t => t.id === tafseerEdition)?.author}` : 'Translation'}
                               </span>
                            </div>
                            <p className={cn(
                              "text-sm text-foreground/90 leading-relaxed italic",
                              viewMode === 'tafseer' && "font-medium not-italic"
                            )}>
                              {secondaryAyah?.text || "Tafseer loading..."}
                            </p>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
