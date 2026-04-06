
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Settings2, History as HistoryIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const DHIKRS = [
  { name: "Subhan Allah", target: 33 },
  { name: "Alhamdulillah", target: 33 },
  { name: "Allahu Akbar", target: 33 },
  { name: "Astaghfirullah", target: 100 },
];

export default function TasbeehPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState(DHIKRS[0]);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tasbeeh-history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleTap = useCallback(() => {
    setCount(prev => {
      const next = prev + 1;
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate(20);
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    if (count > 0) {
      const newHistory = [count, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('tasbeeh-history', JSON.stringify(newHistory));
    }
    setCount(0);
  }, [count, history]);

  const progress = (count / target) * 100;
  const strokeDasharray = 2 * Math.PI * 135;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * Math.min(progress, 100)) / 100;

  return (
    <div className="flex flex-col items-center pt-12 px-6 h-full space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-headline font-bold">Tasbeeh</h1>
        <p className="text-muted-foreground">Keep your heart busy with remembrance</p>
      </div>

      <div className="flex gap-2 overflow-x-auto w-full no-scrollbar pb-2">
        {DHIKRS.map((d) => (
          <Button
            key={d.name}
            variant={selectedDhikr.name === d.name ? "default" : "outline"}
            className="rounded-full h-10 px-6 whitespace-nowrap"
            onClick={() => {
              setSelectedDhikr(d);
              setTarget(d.target);
              setCount(0);
            }}
          >
            {d.name}
          </Button>
        ))}
      </div>

      <div 
        className="relative w-[300px] h-[300px] flex items-center justify-center cursor-pointer group select-none active:scale-95 transition-transform"
        onClick={handleTap}
      >
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="150"
            cy="150"
            r="135"
            className="stroke-muted fill-none"
            strokeWidth="12"
          />
          <circle
            cx="150"
            cy="150"
            r="135"
            className="stroke-accent fill-none transition-all duration-300 ease-out"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              strokeDasharray,
              strokeDashoffset,
            }}
          />
        </svg>

        {/* Counter Center */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-7xl font-headline font-bold text-primary">{count}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-2">
            Goal: {target}
          </span>
          <div className={cn(
            "mt-4 opacity-0 transition-opacity",
            count >= target && "opacity-100"
          )}>
            <Badge className="bg-accent text-accent-foreground animate-bounce">Completed!</Badge>
          </div>
        </div>
        
        {/* Decorative Tap Indicator */}
        <div className="absolute inset-0 rounded-full bg-accent/5 group-active:bg-accent/20 transition-colors" />
      </div>

      <div className="flex gap-4 w-full max-w-[300px]">
        <Button variant="outline" className="flex-1 rounded-2xl h-14" onClick={reset}>
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
        <Button variant="outline" size="icon" className="rounded-2xl h-14 w-14">
          <HistoryIcon className="w-5 h-5" />
        </Button>
      </div>

      {/* History Preview */}
      {history.length > 0 && (
        <div className="w-full space-y-3">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
            <HistoryIcon className="w-4 h-4 mr-2" />
            Recent Sessions
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {history.map((h, i) => (
              <div key={i} className="aspect-square rounded-xl bg-card border flex items-center justify-center text-xs font-bold text-muted-foreground">
                {h}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
