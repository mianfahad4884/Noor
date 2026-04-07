
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Scale, Info, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
import { getZakatNisab } from '@/lib/islamic-data';

export default function ZakatPage() {
  const [mounted, setMounted] = useState(false);
  const [nisab, setNisab] = useState<any>(null);
  const [assets, setAssets] = useState({
    cash: '',
    gold: '',
    silver: '',
    business: '',
  });

  useEffect(() => {
    setMounted(true);
    getZakatNisab().then(setNisab);
  }, []);

  const totalAssets = 
    (parseFloat(assets.cash) || 0) + 
    (parseFloat(assets.gold) || 0) + 
    (parseFloat(assets.silver) || 0) + 
    (parseFloat(assets.business) || 0);

  const goldNisabValue = nisab ? nisab.goldPricePerGram * nisab.nisabGoldGrams : 0;
  const isEligible = totalAssets >= goldNisabValue;
  const zakatDue = isEligible ? totalAssets * 0.025 : 0;

  if (!mounted) return null;

  return (
    <div className="space-y-6 pt-12 px-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">Zakat Calculator</h1>
        <p className="text-muted-foreground">Calculate your obligatory charity based on live Nisab.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="rounded-3xl bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center gap-2 text-amber-600">
               <Coins className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Gold Nisab</span>
            </div>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">
              ${goldNisabValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-[10px] text-amber-600/70">87.48g @ ${nisab?.goldPricePerGram}/g</p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-900/30">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center gap-2 text-slate-600">
               <Scale className="w-3 h-3" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Silver Nisab</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ${(nisab ? nisab.silverPricePerGram * nisab.nisabSilverGrams : 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-[10px] text-slate-600/70">612.36g @ ${nisab?.silverPricePerGram}/g</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-2">Your Wealth</h3>
        <Card className="rounded-[2.5rem] border-border/30 shadow-sm overflow-hidden bg-card">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cash & Savings</label>
                 <Input 
                   type="number" 
                   placeholder="0.00" 
                   className="h-12 rounded-2xl bg-muted/30 border-none"
                   value={assets.cash}
                   onChange={(e) => setAssets({ ...assets, cash: e.target.value })}
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Gold Value</label>
                 <Input 
                   type="number" 
                   placeholder="0.00" 
                   className="h-12 rounded-2xl bg-muted/30 border-none"
                   value={assets.gold}
                   onChange={(e) => setAssets({ ...assets, gold: e.target.value })}
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Business Assets</label>
                 <Input 
                   type="number" 
                   placeholder="0.00" 
                   className="h-12 rounded-2xl bg-muted/30 border-none"
                   value={assets.business}
                   onChange={(e) => setAssets({ ...assets, business: e.target.value })}
                 />
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {totalAssets > 0 && (
        <Card className={cn(
          "rounded-[2.5rem] border-none shadow-xl transition-all duration-500",
          isEligible ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Zakat Estimate</p>
                <h2 className="text-4xl font-headline font-bold mt-1">
                  ${zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="p-4 bg-white/10 rounded-3xl">
                <Calculator className="w-8 h-8" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                {isEligible ? (
                  <Badge className="bg-accent text-accent-foreground font-bold">Nisab Reached</Badge>
                ) : (
                  <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Below Nisab</Badge>
                )}
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Total Wealth: ${totalAssets.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-start gap-3 p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Zakat is 2.5% of your qualifying wealth held for one lunar year. This calculation uses the gold Nisab standard. Consult a scholar for complex business assets.
        </p>
      </div>
    </div>
  );
}
