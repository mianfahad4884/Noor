
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Moon, Book, Languages, Shield, LogOut, ChevronRight, Star, ExternalLink } from 'lucide-react';

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="pt-12 px-6 space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-bold">Profile</h1>
        <Button size="icon" variant="ghost" className="rounded-full bg-card shadow-sm border">
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      {/* User Card */}
      <Card className="rounded-[2.5rem] bg-gradient-to-br from-[#1B4332] to-[#2D5A47] border-none text-white shadow-xl overflow-hidden relative group">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <CardContent className="p-8 relative z-10 flex items-center gap-6">
          <Avatar className="h-20 w-20 border-4 border-white/20 rounded-[2rem]">
            <AvatarImage src="https://picsum.photos/seed/user/200" />
            <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-headline">AM</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold">Abdullah Malik</h2>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">7 Day Streak</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-2">Appearance</h3>
          <Card className="rounded-[2rem] border-border/50 overflow-hidden shadow-sm bg-card">
            <div className="divide-y">
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
                    <Moon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Dark Mode</span>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-600">
                    <Languages className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Arabic Options</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-2">Notifications</h3>
          <Card className="rounded-[2rem] border-border/50 overflow-hidden shadow-sm bg-card">
            <div className="divide-y">
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-600">
                    <Bell className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Prayer Alerts</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-50 dark:bg-pink-900/30 rounded-xl text-pink-600">
                    <Book className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Daily Ayah</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-2">App Info</h3>
          <Card className="rounded-[2rem] border-border/50 overflow-hidden shadow-sm bg-card">
            <div className="divide-y">
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 dark:bg-slate-900/30 rounded-xl text-slate-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Privacy Policy</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-5 px-6 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 group transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600 group-hover:bg-red-100">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-red-600">Clear All Data</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">Veridia Guide v1.0.4</p>
      </div>
    </div>
  );
}

function Settings2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7h-9" />
      <path d="M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  );
}
