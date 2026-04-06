
"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Quote, Bookmark, Share2, Info, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HADITHS } from '@/lib/islamic-data';

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
     h.source.toLowerCase().includes(search.toLowerCase()) ||
     h.category.toLowerCase().includes(search.toLowerCase()))
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

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
        <Input 
          placeholder="Search by keyword, narrator, or grade..."
          className="pl-10 h-14 rounded-2xl bg-card border-border/50 focus:ring-accent/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
          <Filter className="w-3 h-3" />
          Quick Categories
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-bold transition-all border shrink-0 uppercase tracking-wider",
              activeCategory === null ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-card text-muted-foreground border-border/50 hover:bg-accent/10"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold transition-all border shrink-0 uppercase tracking-wider",
                activeCategory === cat ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-card text-muted-foreground border-border/50 hover:bg-accent/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 pb-24">
        {filteredHadiths.map((hadith) => (
          <Card key={hadith.id} className="rounded-[2.5rem] border-border/30 overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow group">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-none font-bold text-[10px] uppercase tracking-tighter">
                    {hadith.source}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "font-bold text-[10px] uppercase tracking-tighter px-3",
                      hadith.grade === 'Sahih' ? "border-emerald-500/30 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10" : 
                      hadith.grade === 'Hasan' ? "border-amber-500/30 text-amber-600 bg-amber-50 dark:bg-amber-900/10" : 
                      "border-rose-500/30 text-rose-600 bg-rose-50 dark:bg-rose-900/10"
                    )}
                  >
                    {hadith.grade}
                  </Badge>
                </div>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Bookmark className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-accent transition-colors" />
                  <Share2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-accent transition-colors" />
                </div>
              </div>

              <div className="space-y-6">
                {hadith.arabic && (
                  <p className="text-right text-3xl font-arabic leading-[4.5rem] text-primary group-hover:text-accent transition-colors">
                    {hadith.arabic}
                  </p>
                )}
                <div className="relative">
                  <Quote className="absolute -left-4 -top-4 w-10 h-10 text-accent/10 -z-10 group-hover:text-accent/20 transition-colors" />
                  <p className="text-lg leading-relaxed text-foreground font-medium border-l-4 border-accent/20 pl-6 py-1">
                    "{hadith.text}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/30 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Narrated by</span>
                  <span className="text-sm font-bold text-foreground">{hadith.narrator}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reference</span>
                  <p className="text-xs font-mono font-bold text-accent">{hadith.reference}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredHadiths.length === 0 && (
          <div className="text-center py-24 space-y-4 opacity-40">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10" />
            </div>
            <p className="font-bold">No results found for "{search}"</p>
            <p className="text-xs">Try searching by narrator name or category like 'Faith'.</p>
          </div>
        )}
      </div>
    </div>
  );
}
