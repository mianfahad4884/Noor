
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getHijriDate, getDailyAyah, getRandomHadith, Hadith } from '@/lib/islamic-data';
import { Share2, Clock, MapPin, Sparkles, Hash, BookOpen, Book, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [hijriDate, setHijriDate] = useState('');
  const [ayah, setAyah] = useState<any>(null);
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    setHijriDate(getHijriDate());
    setHadith(getRandomHadith());
    getDailyAyah().then(data => {
      setAyah(data);
      setLoading(false);
    });
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="space-y-6 px-6 pt-10">
      {/* Hero Greeting */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[#2D5A47] p-8 text-primary-foreground shadow-xl group">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg width="120" height="120" viewBox="0 0 60 60" fill="currentColor">
              <path d="M30 0l5.225 15.343L50.485 9.515l-5.828 15.26L60 30l-15.343 5.225 5.828 15.26-15.26-5.828L30 60l-5.225-15.343-15.26 5.828 5.828-15.26L0 30l15.343-5.225-5.828-15.26 15.26 5.828z" />
           </svg>
        </div>
        
        <div className="relative z-10 space-y-4">
          <div>
            <p className="text-primary-foreground/80 font-medium">Assalamu Alaikum</p>
            <h1 className="text-3xl font-headline font-bold">Veridia Guide</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-none backdrop-blur-md px-4 py-1">
              {hijriDate}
            </Badge>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-center justify-between border border-white/10 group-hover:bg-white/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-xl text-accent-foreground">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-white/70">Next Prayer</p>
                <p className="text-lg font-bold">Dhuhr · 12:34 PM</p>
              </div>
            </div>
            <p className="text-sm font-medium text-accent">in 2h 15m</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {[
          { icon: Book, label: 'Quran', href: '/quran' },
          { icon: ScrollText, label: 'Hadith', href: '/hadith' },
          { icon: Sparkles, label: 'AI Tools', href: '/explainer' },
          { icon: BookOpen, label: 'Duas', href: '/duas' },
          { icon: Hash, label: 'Tasbeeh', href: '/tasbeeh' },
          { icon: MapPin, label: 'Qibla', href: '/qibla' }
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <Button variant="outline" className="h-12 rounded-full px-6 bg-card border-border/50 hover:bg-accent/10 hover:border-accent group">
              <action.icon className={cn("w-4 h-4 mr-2 text-accent group-hover:scale-110 transition-transform", action.label === 'AI Tools' && "text-primary animate-pulse")} />
              <span className="font-semibold">{action.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Daily Ayah */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-headline font-bold">Daily Ayah</h2>
          <Link href="/quran" className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">Read More</Link>
        </div>
        <Card className="rounded-[2rem] border-border/50 shadow-sm overflow-hidden bg-white dark:bg-card">
          <CardContent className="p-8 space-y-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-muted rounded-xl" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            ) : (
              <>
                <p className="text-right text-2xl font-arabic leading-loose text-primary tracking-wide">
                  {ayah?.[0]?.text}
                </p>
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  "{ayah?.[1]?.text}"
                </p>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="rounded-full border-accent/20 text-accent font-semibold px-4">
                    {ayah?.[0]?.surah?.englishName} {ayah?.[0]?.numberInSurah}
                  </Badge>
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-accent/10 text-accent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Daily Hadith */}
      <section className="space-y-3 pb-8">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-headline font-bold">Wisdom for Today</h2>
          <Link href="/hadith" className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">View All</Link>
        </div>
        <Card className="rounded-[2rem] border-border/50 shadow-sm bg-[#F0F4F2] dark:bg-[#152B1E] border-none">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
               <Badge 
                variant="outline" 
                className={cn(
                  "font-bold text-[10px] bg-white/50",
                  hadith?.grade === 'Sahih' ? "border-green-500/30 text-green-600" : "border-accent/30 text-accent"
                )}
              >
                {hadith?.grade} Authentication
              </Badge>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{hadith?.source}</span>
            </div>
            
            <p className="text-base leading-relaxed text-foreground font-medium italic">
              "{hadith?.text}"
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">Narrator</span>
                <span className="text-xs font-bold">{hadith?.narrator}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground uppercase">Ref</span>
                <p className="text-xs font-mono text-accent">{hadith?.reference}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
