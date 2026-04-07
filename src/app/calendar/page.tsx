
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Moon, Info, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getHijriMonthName, getHijriYear, ISLAMIC_EVENTS } from '@/lib/islamic-data';

export default function CalendarPage() {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to get Hijri parts for a date using the Umm al-Qura system
  const getHijriParts = (date: Date) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
      const parts = formatter.formatToParts(date);
      return {
        day: parseInt(parts.find(p => p.type === 'day')?.value || '1'),
        month: parseInt(parts.find(p => p.type === 'month')?.value || '1'),
        year: parseInt(parts.find(p => p.type === 'year')?.value || '1447'),
      };
    } catch (e) {
      return { day: 1, month: 1, year: 1447 };
    }
  };

  // Calculate the Hijri Month Grid
  const hijriMonthData = useMemo(() => {
    if (!mounted) return { days: [], startDay: 0, monthName: '', monthNameArabic: '', year: '', hijriMonth: 1 };

    // 1. Find the 1st of the current Hijri month
    let startOfHijri = new Date(referenceDate);
    startOfHijri.setHours(12, 0, 0, 0); // Noon to avoid boundary issues
    
    let parts = getHijriParts(startOfHijri);
    
    // Back up to the 1st
    const targetMonth = parts.month;
    const targetYear = parts.year;
    
    // Safety break to prevent infinite loops
    let iterations = 0;
    while (getHijriParts(startOfHijri).day > 1 && iterations < 35) {
      startOfHijri.setDate(startOfHijri.getDate() - 1);
      iterations++;
    }

    const startDayOfWeek = startOfHijri.getDay();
    
    // 2. Generate all days for this specific Hijri month
    const monthDays: Date[] = [];
    let tempDate = new Date(startOfHijri);
    
    iterations = 0;
    while (getHijriParts(tempDate).month === targetMonth && iterations < 32) {
      monthDays.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
      iterations++;
    }

    return {
      days: monthDays,
      startDay: startDayOfWeek,
      monthName: getHijriMonthName(startOfHijri, 'en'),
      monthNameArabic: getHijriMonthName(startOfHijri, 'ar'),
      year: getHijriYear(startOfHijri),
      hijriMonth: targetMonth
    };
  }, [referenceDate, mounted]);

  const changeHijriMonth = (offset: number) => {
    // To change Hijri month, we add/subtract ~30 days and let the useMemo "snap" to the start
    const nextDate = new Date(referenceDate);
    nextDate.setDate(referenceDate.getDate() + (offset * 30));
    setReferenceDate(nextDate);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="space-y-6 pt-12 px-6 pb-32">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-headline font-bold">Islamic Calendar</h1>
        <p className="text-muted-foreground">True Lunar Hijri tracking (Umm al-Qura)</p>
      </div>

      {/* Hijri Month Header */}
      <Card className="rounded-[2.5rem] border-primary/20 bg-primary shadow-xl text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Moon className="w-24 h-24" />
        </div>
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-primary-foreground/70 font-arabic text-2xl">{hijriMonthData.monthNameArabic}</p>
              <h2 className="text-3xl font-headline font-bold">{hijriMonthData.monthName}</h2>
              <p className="text-primary-foreground/70 font-bold uppercase tracking-[0.2em] text-xs">
                {hijriMonthData.year}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 h-10 w-10" onClick={() => changeHijriMonth(-1)}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 h-10 w-10" onClick={() => changeHijriMonth(1)}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase"
                onClick={() => setReferenceDate(new Date())}
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Today
              </Button>
            </div>
          </div>
          
          <div className="pt-2 flex items-center gap-2">
            <Badge className="bg-accent text-accent-foreground border-none font-bold uppercase tracking-tighter text-[10px] px-3">
              {hijriMonthData.days[0]?.toLocaleString('default', { month: 'long', year: 'numeric' })} - {hijriMonthData.days[hijriMonthData.days.length-1]?.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Hijri Grid */}
      <Card className="rounded-[2.5rem] border-border/50 bg-card overflow-hidden shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-muted-foreground uppercase py-2">
                {d.charAt(0)}
              </div>
            ))}
            
            {/* Empty slots for start of Hijri month */}
            {Array.from({ length: hijriMonthData.startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Hijri Days */}
            {hijriMonthData.days.map((date, i) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const hParts = getHijriParts(date);
              const isFriday = date.getDay() === 5;

              return (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-2xl transition-all relative group",
                    isToday ? "bg-primary text-primary-foreground shadow-lg scale-110 z-10" : "hover:bg-accent/10",
                    isFriday && !isToday && "text-accent border border-accent/20"
                  )}
                >
                  <span className="text-sm font-bold">{hParts.day}</span>
                  <span className="text-[8px] opacity-40 group-hover:opacity-100">{date.getDate()}</span>
                  {isToday && <div className="absolute bottom-2 w-1 h-1 bg-accent rounded-full" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Significant Events */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Star className="w-4 h-4 text-accent fill-accent" />
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Sacred Observances</h3>
        </div>
        
        <div className="grid gap-3">
          {ISLAMIC_EVENTS.map((event, idx) => (
            <Card key={idx} className="rounded-3xl border-border/30 bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-headline">{event.name}</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-accent/30 text-accent font-bold text-[10px] bg-accent/5">
                    {event.hijriDate}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          This is a <b>true Hijri calendar</b>. Unlike a Gregorian calendar with Islamic labels, this grid renders the lunar month cycles (29-30 days) and transitions directly between Hijri months.
        </p>
      </div>
    </div>
  );
}
