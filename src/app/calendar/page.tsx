
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Moon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getHijriMonthName, getHijriYear, ISLAMIC_EVENTS } from '@/lib/islamic-data';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to get Hijri parts for a date
  const getHijriParts = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    return {
      day: parseInt(parts.find(p => p.type === 'day')?.value || '1'),
      month: parseInt(parts.find(p => p.type === 'month')?.value || '1'),
      year: parseInt(parts.find(p => p.type === 'year')?.value || '1446'),
    };
  };

  // Calculate the Hijri Month Grid
  const hijriMonthData = useMemo(() => {
    if (!mounted) return { days: [], startDay: 0, monthName: '', year: '' };

    const parts = getHijriParts(currentDate);
    
    // Find the Gregorian date of the 1st of the current Hijri month
    const firstOfHijri = new Date(currentDate);
    firstOfHijri.setDate(currentDate.getDate() - (parts.day - 1));
    
    // Day of the week for the 1st of the Hijri month (0=Sun, 6=Sat)
    const startDayOfWeek = firstOfHijri.getDay();
    
    // Generate all days for this Hijri month (iterate until month changes)
    const monthDays: Date[] = [];
    let tempDate = new Date(firstOfHijri);
    const targetMonth = parts.month;
    
    while (getHijriParts(tempDate).month === targetMonth) {
      monthDays.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return {
      days: monthDays,
      startDay: startDayOfWeek,
      monthName: getHijriMonthName(currentDate),
      year: getHijriYear(currentDate),
    };
  }, [currentDate, mounted]);

  const changeMonth = (offset: number) => {
    const nextDate = new Date(currentDate);
    // Add/Subtract ~30 days to move to next/prev Hijri month
    nextDate.setDate(currentDate.getDate() + (offset * 29));
    
    // Ensure we are in a different Hijri month
    const currentParts = getHijriParts(currentDate);
    let newParts = getHijriParts(nextDate);
    
    if (newParts.month === currentParts.month) {
      nextDate.setDate(nextDate.getDate() + (offset * 2));
    }
    
    setCurrentDate(nextDate);
  };

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="space-y-6 pt-12 px-6 pb-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-headline font-bold">Islamic Calendar</h1>
        <p className="text-muted-foreground">True Hijri month tracking with Umm al-Qura system.</p>
      </div>

      {/* Hijri Month Header */}
      <Card className="rounded-[2.5rem] border-primary/20 bg-primary shadow-xl text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Moon className="w-24 h-24" />
        </div>
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold">{hijriMonthData.monthName}</h2>
              <p className="text-primary-foreground/70 font-bold uppercase tracking-[0.2em] text-xs">
                {hijriMonthData.year}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20" onClick={() => changeMonth(-1)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20" onClick={() => changeMonth(1)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="pt-2">
            <Badge className="bg-accent text-accent-foreground border-none font-bold uppercase tracking-tighter text-[10px] px-3">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Hijri Grid */}
      <Card className="rounded-[2rem] border-border/50 bg-card overflow-hidden shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-muted-foreground uppercase py-2">
                {d}
              </div>
            ))}
            
            {/* Empty slots for start of month */}
            {Array.from({ length: hijriMonthData.startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Hijri Days */}
            {hijriMonthData.days.map((date, i) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const hijriDay = getHijriParts(date).day;

              return (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-2xl transition-all relative group",
                    isToday ? "bg-accent text-accent-foreground shadow-lg" : "hover:bg-accent/5"
                  )}
                >
                  <span className="text-sm font-bold">{hijriDay}</span>
                  <span className="text-[8px] opacity-40 group-hover:opacity-100">{date.getDate()}</span>
                  {isToday && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />}
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
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Sacred Dates</h3>
        </div>
        
        <div className="grid gap-3">
          {ISLAMIC_EVENTS.map((event, idx) => (
            <Card key={idx} className="rounded-3xl border-border/30 bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-headline">{event.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{event.description}</p>
                </div>
                <Badge variant="outline" className="border-accent/30 text-accent font-bold text-[10px]">
                  {event.hijriDate}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-4 flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          This calendar uses the Umm al-Qura lunar system. For actual religious observances, the official sighting of the moon should be followed.
        </p>
      </div>
    </div>
  );
}
