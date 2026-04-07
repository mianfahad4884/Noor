
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, Book, History, Info } from 'lucide-react';
// We'll import the tool type only and use a dynamic approach to avoid bundling server code
import type { AiIslamicTextExplainerToolOutput } from '@/ai/flows/ai-islamic-text-explainer-tool';

export default function ExplainerPage() {
  const [text, setText] = useState('');
  const [textType, setTextType] = useState<'Quranic Verse' | 'Hadith'>('Quranic Verse');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiIslamicTextExplainerToolOutput | null>(null);

  async function handleExplain() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      // In a static/mobile environment, we'd typically call an external API
      // Since we want the build to succeed, we'll provide a placeholder or try to load the tool dynamically if available
      let output: AiIslamicTextExplainerToolOutput;
      
      if (process.env.NODE_ENV === 'development') {
        const { aiIslamicTextExplainerTool } = await import('@/ai/flows/ai-islamic-text-explainer-tool');
        output = await aiIslamicTextExplainerTool({ text, textType, reference });
      } else {
        // Fallback for the static APK build - in a real app, this would be a fetch() to a backend
        output = {
          explanation: "AI insights require an active internet connection and a hosted backend. This feature is currently in 'Static Mode' for the APK build.",
          insights: "Please ensure you have configured your Firebase backend to host the Genkit flows.",
          historicalBackground: "Once hosted, this AI tool will provide deep contextual and historical insights for your queries."
        };
      }
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 pt-12 px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-headline font-bold">AI Explainer</h1>
        <p className="text-muted-foreground">Get deep spiritual insights and historical context for any Islamic text.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Type</label>
             <Select value={textType} onValueChange={(v: any) => setTextType(v)}>
                <SelectTrigger className="rounded-2xl h-12 bg-card">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quranic Verse">Quranic Verse</SelectItem>
                  <SelectItem value="Hadith">Hadith</SelectItem>
                </SelectContent>
             </Select>
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Ref (Optional)</label>
             <input 
               type="text"
               placeholder="e.g. 2:255"
               className="flex h-12 w-full rounded-2xl border border-input bg-card px-3 py-2 text-sm"
               value={reference}
               onChange={(e) => setReference(e.target.value)}
             />
           </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Input Text</label>
          <Textarea 
            placeholder="Paste Quranic verse or Hadith text here..."
            className="min-h-[120px] rounded-[2rem] p-6 bg-card resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <Button 
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20"
          onClick={handleExplain}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 mr-2" />
          )}
          Generate Insight
        </Button>
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
          <Card className="rounded-[2rem] border-accent/20 bg-accent/5 overflow-hidden border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-headline text-accent">
                <Book className="w-5 h-5 mr-2" />
                Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{result.explanation}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-primary/20 bg-primary/5 overflow-hidden border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-headline text-primary">
                <Sparkles className="w-5 h-5 mr-2" />
                Spiritual Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{result.insights}</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-muted/50 bg-card overflow-hidden border">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-headline text-muted-foreground">
                <History className="w-5 h-5 mr-2" />
                Historical Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground/90">{result.historicalBackground}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {!result && !loading && (
        <div className="flex flex-col items-center justify-center pt-12 text-center space-y-4 opacity-40">
           <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
             <Info className="w-10 h-10" />
           </div>
           <p className="text-sm max-w-[200px]">Your insights will appear here after analysis.</p>
        </div>
      )}
    </div>
  );
}
