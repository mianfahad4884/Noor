
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, History as HistoryIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFirestore, useUser, useMemoFirebase, useCollection } from '@/firebase';
import { collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const DHIKRS = [
  { name: "Subhan Allah", target: 33 },
  { name: "Alhamdulillah", target: 33 },
  { name: "Allahu Akbar", target: 33 },
  { name: "Astaghfirullah", target: 100 },
];

export default function TasbeehPage() {
  const { firestore } = useFirestore() || {};
  const { user } = useUser();
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState(DHIKRS[0]);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());

  const sessionsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'dhikrSessions');
  }, [firestore, user]);

  const { data: sessions } = useCollection(sessionsQuery);

  const handleTap = useCallback(() => {
    if (count === 0) setSessionStartTime(new Date());
    setCount(prev => {
      const next = prev + 1;
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate(20);
      }
      return next;
    });
  }, [count]);

  const saveSession = useCallback(() => {
    if (count > 0 && firestore && user) {
      const sessionData = {
        userId: user.uid,
        dhikrPhrase: selectedDhikr.name,
        targetCount: target,
        actualCount: count,
        sessionDate: new Date().toISOString().split('T')[0],
        startTime: sessionStartTime.toISOString(),
        endTime: new Date().toISOString(),
        isCompleted: count >= target,
        createdAt: serverTimestamp(),
      };
      
      const colRef = collection(firestore, 'users', user.uid, 'dhikrSessions');
      addDocumentNonBlocking(colRef, sessionData);
    }
  }, [count, firestore, user, selectedDhikr, target, sessionStartTime]);

  const reset = useCallback(() => {
    saveSession();
    setCount(0);
  }, [saveSession]);

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
              saveSession();
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
        
        <div className="absolute inset-0 rounded-full bg-accent/5 group-active:bg-accent/20 transition-colors" />
      </div>

      <div className="flex gap-4 w-full max-w-[300px]">
        <Button variant="outline" className="flex-1 rounded-2xl h-14" onClick={reset}>
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset & Save
        </Button>
      </div>

      {sessions && sessions.length > 0 && (
        <div className="w-full space-y-3 pb-24">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
            <HistoryIcon className="w-4 h-4 mr-2" />
            Recent Sessions
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {sessions.slice(0, 10).map((s, i) => (
              <div key={s.id} className="aspect-square rounded-xl bg-card border flex items-center justify-center text-xs font-bold text-primary">
                {s.actualCount}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
