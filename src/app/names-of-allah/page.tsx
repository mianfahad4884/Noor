
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, Info, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { getAsmaUlHusna } from '@/lib/islamic-data';

export default function AsmaUlHusnaPage() {
  const [mounted, setMounted] = useState(false);
  const [names, setNames] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    getAsmaUlHusna().then(data => {
      setNames(data || []);
      setLoading(false);
    });
  }, []);

  const filteredNames = names.filter(n => 
    n.name.toLowerCase().includes(search.toLowerCase()) ||
    n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
    n.en.meaning.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="space-y-6 pt-12 px-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Asma ul Husna</h1>
        <p className="text-muted-foreground">The 99 Beautiful Names of Allah with meanings.</p>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
        <Input 
          placeholder="Search by meaning or transliteration..."
          className="pl-10 h-14 rounded-2xl bg-card border-border/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-30">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-xs font-bold uppercase tracking-widest">Illuminating Names...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredNames.map((n, idx) => (
            <Card key={idx} className="rounded-[2rem] border-border/30 hover:shadow-md transition-all group overflow-hidden bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="rounded-xl border-primary/20 text-primary font-bold">
                    {n.number}
                  </Badge>
                  <Sparkles className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                   <p className="text-4xl font-arabic text-primary group-hover:text-accent transition-colors">{n.name}</p>
                   <div className="space-y-1">
                     <h3 className="text-lg font-headline font-bold">{n.transliteration}</h3>
                     <p className="text-sm text-muted-foreground italic">"{n.en.meaning}"</p>
                   </div>
                </div>
                <div className="mt-6 pt-4 border-t border-border/30 flex items-center gap-2 text-[10px] text-muted-foreground">
                   <BookOpen className="w-3 h-3" />
                   <span className="uppercase font-bold tracking-widest">Reflect on this attribute</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredNames.length === 0 && (
        <div className="text-center py-20 opacity-30">
          <Search className="w-12 h-12 mx-auto mb-4" />
          <p>No attributes match your search.</p>
        </div>
      )}
    </div>
  );
}
