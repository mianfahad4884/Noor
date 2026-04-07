
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Loader2, Info, Moon, Sun, Sunrise, Sunset, MoonStar } from 'lucide-react';
import { getPrayerTimes } from '@/lib/islamic-data';
import { cn } from '@/lib/utils';

export default function PrayerTimesPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timings, setTimings] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        const today = new Date().toISOString().split('T')[0];
        const data = await getPrayerTimes(latitude, longitude, today);
        setTimings(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  }, []);

  if (!mounted) return null;

  const PRAYERS = [
    { name: 'Fajr', key: 'Fajr', icon: Sunrise, color: 'text-blue-500' },
    { name: 'Sunrise', key: 'Sunrise', icon: Sun, color: 'text-orange-500' },
    { name: 'Dhuhr', key: 'Dhuhr', icon: Sun, color: 'text-amber-500' },
    { name: 'Asr', key: 'Asr', icon: Sun, color: 'text-orange-600' },
    { name: 'Maghrib', key: 'Maghrib', icon: Sunset, color: 'text-rose-500' },
    { name: 'Isha', key: 'Isha', icon: Moon, color: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-6 pt-12 px-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Prayer Times</h1>
        <p className="text-muted-foreground">Accurate timings and prohibited periods.</p>
      </div>

      <Card className="rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden shadow-xl">
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                {location ? "Current Location" : "Determining Location..."}
              </span>
            </div>
            <Badge variant="secondary" className="bg-white/10 text-white border-none">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </Badge>
          </div>

          <div className="pt-2">
            <h2 className="text-5xl font-headline font-bold">Dhuhr</h2>
            <p className="text-xl opacity-70 mt-1">12:34 PM</p>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-accent w-2/3" />
            </div>
            <span className="text-[10px] font-bold uppercase opacity-60">2h 15m left</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-30">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest">Calculating Sky Positions...</p>
          </div>
        ) : (
          PRAYERS.map((prayer) => (
            <Card key={prayer.name} className="rounded-3xl border-border/30 bg-card overflow-hidden group">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-2xl bg-muted/50", prayer.color)}>
                    <prayer.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-headline">{prayer.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {prayer.name === 'Fajr' ? 'Starts Dawn' : 'Scheduled'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{timings?.timings[prayer.key]}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-2 flex items-center gap-2">
          <MoonStar className="w-3 h-3 text-primary" />
          Fasting Schedule
        </h3>
        <Card className="rounded-[2rem] border-primary/20 bg-primary/5 p-6">
          <div className="flex justify-between items-center">
             <div className="space-y-1">
               <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Sahur (Ends)</p>
               <p className="text-xl font-headline font-bold">{timings?.timings.Imsak || '--:--'}</p>
             </div>
             <div className="w-px h-8 bg-primary/20" />
             <div className="space-y-1 text-right">
               <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Iftar (Starts)</p>
               <p className="text-xl font-headline font-bold">{timings?.timings.Maghrib || '--:--'}</p>
             </div>
          </div>
        </Card>
      </div>

      <div className="flex items-start gap-3 p-5 bg-muted/30 rounded-[2rem] border border-border/50">
        <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Prayer times are calculated using the <b>Muslim World League</b> method. Prohibited times (Zawal) occur shortly before Dhuhr.
        </p>
      </div>
    </div>
  );
}
