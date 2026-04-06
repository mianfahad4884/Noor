
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Moon, Book, Languages, Shield, LogOut, ChevronRight, Star, ExternalLink, Settings2 } from 'lucide-react';
import { useFirestore, useUser, useDoc } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth } from '@/firebase';

export default function ProfilePage() {
  const { firestore } = useFirestore() || {};
  const { auth } = useAuth() || {};
  const { user, isUserLoading } = useUser();
  
  const userProfileRef = React.useMemo(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'profile', user.uid);
  }, [firestore, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  const handleToggle = (field: string, value: boolean) => {
    if (!userProfileRef) return;
    updateDocumentNonBlocking(userProfileRef, {
      [field]: value,
      updatedAt: serverTimestamp(),
    });
  };

  const handleSignIn = () => {
    if (auth) initiateAnonymousSignIn(auth);
  };

  if (isUserLoading) return <div className="p-12 text-center">Loading User...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 px-12 text-center">
        <h1 className="text-3xl font-headline font-bold">Veridia Profile</h1>
        <p className="text-muted-foreground">Sign in to save your progress, bookmarks, and settings.</p>
        <Button onClick={handleSignIn} className="w-full h-14 rounded-2xl bg-primary">
          Continue as Guest
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-12 px-6 space-y-8 pb-32">
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
            <AvatarImage src={`https://picsum.photos/seed/${user.uid}/200`} />
            <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-headline">
              {profile?.name ? profile.name.split(' ').map((n: string) => n[0]).join('') : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold">{profile?.name || 'Guest User'}</h2>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{profile?.streakCounter || 0} Day Streak</span>
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
                <Switch 
                  checked={profile?.darkModeEnabled || false} 
                  onCheckedChange={(val) => handleToggle('darkModeEnabled', val)} 
                />
              </div>
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-600">
                    <Languages className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Language</span>
                </div>
                <span className="text-xs text-muted-foreground">{profile?.languagePreference === 'en' ? 'English' : 'Arabic'}</span>
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
                <Switch 
                  checked={profile?.fajrNotificationEnabled || false} 
                  onCheckedChange={(val) => handleToggle('fajrNotificationEnabled', val)}
                />
              </div>
              <div className="flex items-center justify-between p-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-50 dark:bg-pink-900/30 rounded-xl text-pink-600">
                    <Book className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Daily Ayah</span>
                </div>
                <Switch 
                  checked={profile?.morningAdhkarReminderEnabled || false}
                  onCheckedChange={(val) => handleToggle('morningAdhkarReminderEnabled', val)}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
