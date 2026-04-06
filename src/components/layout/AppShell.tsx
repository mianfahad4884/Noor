
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Hash, BookOpen, Compass, User, Book, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Quran', icon: Book, href: '/quran' },
    { label: 'Hadith', icon: ScrollText, href: '/hadith' },
    { label: 'Duas', icon: BookOpen, href: '/duas' },
    { label: 'Tasbeeh', icon: Hash, href: '/tasbeeh' },
    { label: 'Qibla', icon: Compass, href: '/qibla' },
    { label: 'More', icon: User, href: '/profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative shadow-2xl bg-background overflow-hidden border-x">
      <main className="flex-1 pb-32 overflow-y-auto overflow-x-hidden islamic-pattern">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-3 pb-4 pt-2 pointer-events-none">
        <div className="bg-card/90 backdrop-blur-lg border border-border/50 rounded-[2rem] shadow-2xl flex items-center justify-between p-1.5 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 rounded-2xl transition-all duration-300 relative group flex-1 min-w-0",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent/10"
                )}
              >
                <Icon className={cn("w-4.5 h-4.5", isActive ? "scale-110" : "scale-100 group-hover:scale-110")} />
                <span className="text-[9px] mt-1 font-bold uppercase tracking-tighter truncate w-full text-center">{item.label}</span>
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 bg-accent rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
