
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Moon, Calendar as CalendarIcon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getHijriMonthName, getHijriYear, ISLAMIC_EVENTS } from '@/lib/islamic-data';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeMonth = (offset: number) => {
    const nextDate = new Date(currentDate);
    nextDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(nextDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const hijriMonth = getHijriMonthName(currentDate);
  const hijriYear = getHijriYear(currentDate);

  return (
    <div className="space-y-6 pt-12 px-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Islamic Calendar</h1>
        <p className="text-muted-foreground">Stay connected with the Hijri dates and sacred events.</p>
      </div>

      {/* Hijri Month Header */}
      <Card className="rounded-[2rem] border-primary/20 bg-primary shadow-xl text-primary-foreground overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Moon className="w-24 h-24" />
        </div>
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-headline font-bold">{hijriMonth}</h2>
              <p className="text-primary-foreground/70 font-bold uppercase tracking-[0.2em] text-xs">
                {hijriYear} Hijri
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
          
          <div className="pt-4 flex items-center gap-2">
            <Badge className="bg-accent text-accent-foreground border-none font-bold uppercase tracking-tighter text-[10px] px-3">
              Gregorian: {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="rounded-[2rem] border-border/50 bg-card overflow-hidden shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-muted-foreground uppercase py-2">
                {d}
              </div>
            ))}
            {days.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} className="aspect-square" />;
              
              const isToday = date.toDateString() === new Date().toDateString();
              const hjDate = new Intl.DateTimeFormat('en-u-ca-islamic-uma', { day: 'numeric' }).format(date);

              return (
                <div 
                  key={i} 
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-2xl transition-all relative group",
                    isToday ? "bg-accent text-accent-foreground shadow-lg" : "hover:bg-accent/5"
                  )}
                >
                  <span className="text-xs font-bold">{hjDate}</span>
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
          Dates are calculated using the Umm al-Qura calendar. Actual sighting of the crescent moon may vary the date by +/- 1 day for major festivals.
        </p>
      </div>
    </div>
  );
}
