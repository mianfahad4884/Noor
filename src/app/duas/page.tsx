
"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, ChevronRight, Moon, Sun, Plane, Utensils, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const DUAS = [
  { id: 1, category: "Morning", title: "Morning Adhkar", arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا", translation: "O Allah, by You we enter the morning and by You we enter the evening." },
  { id: 2, category: "Evening", title: "Evening Adhkar", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ", translation: "We have reached the evening and at this very time unto Allah belongs all sovereignty." },
  { id: 3, category: "Travel", title: "Dua for Travel", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا", translation: "Glory is to Him Who has provided this for us." },
  { id: 4, category: "Food", title: "Before Eating", arabic: "بِسْمِ اللَّهِ", translation: "In the name of Allah." },
  { id: 5, category: "Protection", title: "Ayatul Kursi", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence." },
];

const CATEGORIES = [
  { name: "Morning", icon: Sun, color: "bg-orange-100 text-orange-600" },
  { name: "Evening", icon: Moon, color: "bg-blue-100 text-blue-600" },
  { name: "Travel", icon: Plane, color: "bg-green-100 text-green-600" },
  { name: "Protection", icon: ShieldCheck, color: "bg-red-100 text-red-600" },
  { name: "Daily Life", icon: Utensils, color: "bg-amber-100 text-amber-600" },
];

export default function DuasPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredDuas = DUAS.filter(d => 
    (activeCategory ? d.category === activeCategory : true) &&
    (d.title.toLowerCase().includes(search.toLowerCase()) || d.translation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pt-12 px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Dua Library</h1>
        <p className="text-muted-foreground">Find solace in supplications from Quran and Sunnah.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search for a dua..."
          className="pl-10 h-14 rounded-2xl bg-card border-border/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-3xl transition-all border shrink-0 min-w-[100px]",
              activeCategory === cat.name ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border/50"
            )}
          >
            <div className={cn("p-3 rounded-2xl", activeCategory === cat.name ? "bg-white/20" : cat.color)}>
              <cat.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 pb-12">
        {filteredDuas.map((dua) => (
          <Card key={dua.id} className="rounded-[2rem] border-border/30 hover:shadow-md transition-all group overflow-hidden bg-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-none font-bold uppercase tracking-tighter text-[10px]">
                  {dua.category}
                </Badge>
                <Heart className="w-4 h-4 text-muted-foreground group-hover:text-red-500 cursor-pointer transition-colors" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-headline font-bold">{dua.title}</h3>
                <p className="text-right text-xl font-arabic leading-loose text-primary">{dua.arabic}</p>
                <p className="text-sm text-muted-foreground italic leading-relaxed">"{dua.translation}"</p>
              </div>
              <div className="pt-2 flex justify-end">
                <button className="text-xs font-bold text-accent uppercase tracking-widest flex items-center hover:translate-x-1 transition-transform">
                  View Full Detail <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredDuas.length === 0 && (
          <div className="text-center py-12 opacity-40">
            <Search className="w-12 h-12 mx-auto mb-4" />
            <p>No duas found for your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
