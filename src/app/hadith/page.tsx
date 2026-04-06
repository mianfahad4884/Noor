
"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Quote, Bookmark, Share2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HADITHS, Hadith } from '@/lib/islamic-data';

export default function HadithPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = Array.from(new Set(HADITHS.map(h => h.category)));

  const filteredHadiths = HADITHS.filter(h => 
    (activeCategory ? h.category === activeCategory : true) &&
    (h.text.toLowerCase().includes(search.toLowerCase()) || 
     h.narrator.toLowerCase().includes(search.toLowerCase()) ||
     h.source.toLowerCase().includes(search.toLowerCase()))
  );

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="space-y-6 pt-12 px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Hadith Library</h1>
        <p className="text-muted-foreground">Words and actions of Prophet Muhammad (ﷺ).</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search hadith, narrator, or book..."
          className="pl-10 h-14 rounded-2xl bg-card border-border/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0",
            activeCategory === null ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border/50"
          )}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0",
              activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border/50"
            )}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-6 pb-12">
        {filteredHadiths.map((hadith) => (
          <Card key={hadith.id} className="rounded-[2rem] border-border/30 overflow-hidden bg-card">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-none font-bold text-[10px]">
                    {hadith.source}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "font-bold text-[10px]",
                      hadith.grade === 'Sahih' ? "border-green-500/30 text-green-600 bg-green-50" : 
                      hadith.grade === 'Hasan' ? "border-yellow-500/30 text-yellow-600 bg-yellow-50" : 
                      "border-red-500/30 text-red-600 bg-red-50"
                    )}
                  >
                    {hadith.grade}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Bookmark className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-accent transition-colors" />
                  <Share2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-accent transition-colors" />
                </div>
              </div>

              <div className="space-y-4">
                {hadith.arabic && (
                  <p className="text-right text-2xl font-arabic leading-loose text-primary">
                    {hadith.arabic}
                  </p>
                )}
                <div className="relative">
                  <Quote className="absolute -left-2 -top-2 w-8 h-8 text-accent/10 -z-10" />
                  <p className="text-base leading-relaxed text-foreground italic">
                    "{hadith.text}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Narrated by</span>
                  <span className="text-sm font-bold text-foreground">{hadith.narrator}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Reference</span>
                  <p className="text-xs font-mono font-bold text-accent">{hadith.reference}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredHadiths.length === 0 && (
          <div className="text-center py-20 space-y-4 opacity-40">
            <Info className="w-12 h-12 mx-auto" />
            <p>No hadiths found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
