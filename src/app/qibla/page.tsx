
"use client";

import React, { useState, useEffect } from 'react';
import { Compass, Navigation, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function QiblaPage() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOrientation = (event: any) => {
      let alpha = event.alpha;
      if (event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading;
      }
      if (alpha !== null) {
        setHeading(alpha);
        setIsCalibrated(true);
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(pos);
        // Approximate Qibla calc: Kaaba is at lat 21.4225, lng 39.8262
        const lat1 = pos.coords.latitude * Math.PI / 180;
        const lon1 = pos.coords.longitude * Math.PI / 180;
        const lat2 = 21.4225 * Math.PI / 180;
        const lon2 = 39.8262 * Math.PI / 180;
        
        const y = Math.sin(lon2 - lon1);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
        const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
        setQiblaDirection(brng);
      },
      (err) => console.error(err)
    );

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const relativeQibla = (qiblaDirection - heading + 360) % 360;

  return (
    <div className="flex flex-col items-center pt-12 px-6 space-y-8 h-full">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-headline font-bold">Qibla Finder</h1>
        <p className="text-muted-foreground">Locate the Kaaba from anywhere</p>
      </div>

      <div className="relative w-[300px] h-[300px]">
        {/* Geometric Compass Background */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/20 flex items-center justify-center islamic-pattern opacity-20" />
        
        {/* Compass Outer Ring */}
        <svg className="absolute inset-0 w-full h-full transform transition-transform duration-300" style={{ transform: `rotate(${-heading}deg)` }}>
          <circle cx="150" cy="150" r="148" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
          {[...Array(36)].map((_, i) => (
            <line
              key={i}
              x1="150"
              y1="10"
              x2="150"
              y2={i % 9 === 0 ? "25" : "18"}
              stroke="currentColor"
              strokeWidth={i % 9 === 0 ? "2" : "1"}
              className="text-muted-foreground"
              transform={`rotate(${i * 10}, 150, 150)`}
            />
          ))}
          <text x="150" y="45" textAnchor="middle" className="text-xs font-bold fill-accent">N</text>
          <text x="255" y="155" textAnchor="middle" className="text-xs font-bold fill-muted-foreground">E</text>
          <text x="150" y="265" textAnchor="middle" className="text-xs font-bold fill-muted-foreground">S</text>
          <text x="45" y="155" textAnchor="middle" className="text-xs font-bold fill-muted-foreground">W</text>
        </svg>

        {/* Qibla Indicator */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{ transform: `rotate(${relativeQibla}deg)` }}
        >
          <div className="absolute top-8 flex flex-col items-center">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 animate-pulse">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                 <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
               </svg>
            </div>
            <div className="h-24 w-1 bg-gradient-to-b from-accent to-transparent mt-2 rounded-full" />
          </div>
        </div>

        {/* Center Point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md" />
      </div>

      <div className="w-full space-y-4">
        <div className="bg-card rounded-3xl p-6 border border-border/50 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold">Location</span>
            </div>
            <Badge variant="outline" className="rounded-full bg-accent/10 border-none text-accent">
              {location ? 'Active' : 'Detecting...'}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex-1 space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Bearing</p>
              <p className="text-lg font-bold">{Math.round(heading)}°</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex-1 space-y-1">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Qibla</p>
              <p className="text-lg font-bold">{Math.round(qiblaDirection)}°</p>
            </div>
          </div>
        </div>

        {!isCalibrated && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-900/30">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              Compass not detected or calibrated. On mobile, please move your phone in a figure-8 pattern. On desktop, this will show a static orientation.
            </p>
          </div>
        )}
      </div>

      <Button variant="outline" className="w-full h-14 rounded-2xl border-border/50 bg-card hover:bg-accent/10 transition-colors">
        <Navigation className="w-5 h-5 mr-2 text-accent" />
        Recalibrate Sensors
      </Button>
    </div>
  );
}
