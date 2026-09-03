"use client";

import { useEffect, useState } from "react";
import { askTutor } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, BookOpen, Check, ChevronRight, CircleHelp, Clock3, Flame, Languages, Lightbulb, Menu, MessageCircle, Mic2, RotateCcw, Send, Sparkles, SpellCheck, Target, Trophy, X } from "lucide-react";

type Station = "home" | "translate" | "correct" | "vocabulary" | "conversation" | "quiz" | "grammar";
type TutorMode = "translate" | "correct" | "vocabulary" | "conversation" | "quiz";

const stations: Array<{ id: Station; label: string; hindi: string; icon: typeof Languages }> = [
  { id: "home", label: "Overview", hindi: "सारांश", icon: Sparkles },
  { id: "translate", label: "Translate & learn", hindi: "अनुवाद", icon: Languages },
  { id: "correct", label: "Correct my English", hindi: "सुधारें", icon: SpellCheck },
  { id: "vocabulary", label: "Build vocabulary", hindi: "शब्दावली", icon: BookOpen },
  { id: "conversation", label: "Conversation", hindi: "बातचीत", icon: MessageCircle },
  { id: "quiz", label: "Quick quiz", hindi: "क्विज़", icon: CircleHelp },
];

const lessons: Array<{ title: string; hindi: string; meta: string; icon: typeof Languages; tone: string; station: Station }> = [
  { title: "Translate & learn", hindi: "अनुवाद से सीखें", meta: "Start with a Hindi sentence", icon: Languages, tone: "cobalt", station: "translate" },
  { title: "Correct my English", hindi: "अपना English सुधारें", meta: "Make one sentence natural", icon: SpellCheck, tone: "rose", station: "correct" },
  { title: "Build vocabulary", hindi: "नए शब्द सीखें", meta: "One useful word today", icon: BookOpen, tone: "cream", station: "vocabulary" },
  { title: "Conversation practice", hindi: "बातचीत का अभ्यास", meta: "Reply in simple English", icon: MessageCircle, tone: "ink", station: "conversation" },
];

const defaultResult = "### Try a station\nChoose a practice card to begin. Your tutor will explain each answer in simple English and Hindi.";

export default function Home() {
  const [station, setStation] = useState<Station>("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(defaultResult);
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(3);
  const [completed, setCompleted] = useState(4);

  useEffect(() => {
    const saved = window.localStorage.getItem("english-tutor-progress");
    if (!saved) return;
    const parsed = JSON.parse(saved) as { streak?: number; completed?: number };
    setStreak(parsed.streak ?? 3);
    setCompleted(parsed.completed ?? 4);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("english-tutor-progress", JSON.stringify({ streak, completed }));
  }, [streak, completed]);

  const runTutor = async (mode: TutorMode, value = input) => {
    setLoading(true);
    const answer = await askTutor(mode, value || (mode === "vocabulary" ? "Important" : "I am go to market yesterday."));
    setResult(answer);
    setCompleted((current) => Math.min(12, current + 1));
    setStreak((current) => Math.max(current, 4));
    setLoading(false);
  };

  const selectStation = (next: Station) => {
    setStation(next);
    setMobileNav(false);
    if (next === "home") setResult(defaultResult);
    if (next === "vocabulary") void runTutor("vocabulary", "Important");
    if (next === "quiz") void runTutor("quiz", "Choose a correct sentence");
  };

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="cue-line" aria-hidden="true" />
      <div className="flex min-h-dvh">
        <aside className={`station-rail ${mobileNav ? "station-rail-open" : ""}`}>
          <div className="rail-brand"><div className="brand-mark" aria-hidden="true"><span /><span /><span /></div><div className="min-w-0"><p className="eyebrow text-white/65">STAGE 01 / LEARN</p><p className="brand-name truncate">English Tutor</p></div><button className="rail-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18} /></button></div>
          <div className="rail-intro"><p className="eyebrow text-white/50">TODAY’S ROUTE</p><p className="rail-copy">Small steps.<br /><strong>More confidence.</strong></p></div>
          <nav className="station-list" aria-label="Learning stations">{stations.map((item, index) => { const Icon = item.icon; const active = station === item.id; return <button key={item.id} className={`station-link ${active ? "station-link-active" : ""}`} onClick={() => selectStation(item.id)}><span className="station-number">0{index + 1}</span><Icon size={16} strokeWidth={1.7} /><span className="station-text min-w-0"><span className="truncate">{item.label}</span><small>{item.hindi}</small></span>{active && <span className="station-pip" />}</button>; })}</nav>
          <div className="rail-footer"><div className="level-chip"><span className="level-dot" /> Level 2 · Beginner</div><p className="rail-footer-note">Keep going — your ear is learning the rhythm.</p></div>
        </aside>
        {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20} /></button><div className="topbar-breadcrumb"><span>LEARN</span><ChevronRight size={13} /><strong>{stations.find((item) => item.id === station)?.label ?? "Overview"}</strong></div><div className="topbar-actions"><div className="streak"><Flame size={15} /><span>{streak} day streak</span></div><div className="avatar">A</div></div></header>
          <div className="horizon-strip"><span>PHASE / {station === "home" ? "FIRST LIGHT" : "PRACTICE CUE"}</span><span className="horizon-track"><i /><i /><i /><i /></span><span>09:40</span></div>
          <div className="content-grid"><div className="primary-column">{station === "home" ? <><section className="welcome-panel"><div><p className="eyebrow text-primary">GOOD MORNING / सुप्रभात</p><h1>Let’s bring your English<br /><em>into the light.</em></h1><p className="welcome-sub">A little practice today makes tomorrow’s words easier.</p></div><div className="cue-badge"><span>YOUR CUE</span><strong>10 min</strong><small>daily goal</small></div></section><section className="daily-card"><div className="daily-card-top"><div><p className="eyebrow text-primary">DAILY LESSON / 01</p><h2>Talk about your morning</h2></div><Badge className="day-badge">IN PROGRESS</Badge></div><div className="lesson-progress"><span style={{ width: `${Math.min(100, completed * 8.33)}%` }} /></div><div className="daily-card-bottom"><div className="lesson-meta"><span><Clock3 size={15} /> 10–15 minutes</span><span><Target size={15} /> 6 activities</span></div><Button className="primary-button" onClick={() => selectStation("translate")}>Continue lesson <ArrowUpRight size={16} /></Button></div></section><div className="section-heading"><div><p className="eyebrow">LEARNING STATIONS</p><h2>Choose your next step</h2></div><span className="section-count">04 / 06</span></div><section className="station-cards">{lessons.map((lesson) => { const Icon = lesson.icon; return <button key={lesson.title} className={`lesson-card lesson-card-${lesson.tone}`} onClick={() => selectStation(lesson.station)}><div className="lesson-card-icon"><Icon size={20} /></div><span className="lesson-card-copy"><strong>{lesson.title}</strong><small>{lesson.hindi}</small><em>{lesson.meta}</em></span><ArrowUpRight size={16} className="lesson-arrow" /></button>; })}</section></> : <PracticePanel station={station} input={input} result={result} loading={loading} setInput={setInput} setResult={setResult} runTutor={runTutor} />}</div><aside className="progress-column"><section className="progress-panel"><div className="section-heading compact"><div><p className="eyebrow">YOUR PROGRESS</p><h2>Keep the light on.</h2></div><Trophy size={19} className="text-primary" /></div><div className="level-progress"><div className="level-progress-header"><span>Level 2 · Beginner</span><strong>{completed}/12</strong></div><Progress value={(completed / 12) * 100} /><p>8 more practice moments to reach <b>Elementary</b>.</p></div><div className="weekly-grid"><span className="active">M</span><span className="active">T</span><span className="active">W</span><span className="today">T</span><span>F</span><span>S</span><span>S</span></div><div className="stats-row"><div><strong>18</strong><span>words learned</span></div><div><strong>7</strong><span>sentences fixed</span></div></div></section><section className="tip-panel"><Lightbulb size={18} /><div><p className="eyebrow">TUTOR’S NOTE</p><p>“Yesterday” is a <strong>past-time signal</strong>. When you see it, look for a past-tense verb.</p></div></section><section className="up-next"><div className="up-next-label"><span className="cue-dot" /> UP NEXT</div><h3>Say it out loud</h3><p>Practice one sentence from today’s lesson with your voice.</p><Button variant="outline" className="outline-button" onClick={() => selectStation("conversation")}>Open speaking cue <Mic2 size={15} /></Button></section></aside></div>
        </section>
      </div>
    </main>
  );
}

function PracticePanel({ station, input, result, loading, setInput, setResult, runTutor }: { station: Station; input: string; result: string; loading: boolean; setInput: (value: string) => void; setResult: (value: string) => void; runTutor: (mode: TutorMode, value?: string) => void }) {
  const config: Record<Station, { eyebrow: string; title: string; hint: string; mode: TutorMode; button: string }> = {
    home: { eyebrow: "OVERVIEW", title: "Let’s practice.", hint: "", mode: "correct", button: "Start" },
    translate: { eyebrow: "STATION 02 / TRANSLATE", title: "Start in Hindi. Learn in English.", hint: "मैं रोज़ सुबह जल्दी उठता हूँ।", mode: "translate", button: "Translate & explain" },
    correct: { eyebrow: "STATION 03 / CORRECT", title: "Make one sentence more natural.", hint: "I am go to market yesterday.", mode: "correct", button: "Correct my English" },
    vocabulary: { eyebrow: "STATION 04 / VOCABULARY", title: "One useful word at a time.", hint: "important", mode: "vocabulary", button: "Teach me this word" },
    conversation: { eyebrow: "STATION 05 / CONVERSATION", title: "Say hello. Keep the conversation going.", hint: "Hello! My name is Anaya.", mode: "conversation", button: "Reply with my tutor" },
    quiz: { eyebrow: "STATION 06 / QUICK QUIZ", title: "A small question. A clear reason.", hint: "Choose the correct sentence.", mode: "quiz", button: "Show me a quiz" },
    grammar: { eyebrow: "STATION 07 / GRAMMAR", title: "See the pattern behind the sentence.", hint: "He go to school.", mode: "correct", button: "Explain the pattern" },
  };
  const current = config[station];
  const lines = result.split("\n");
  return <section className="practice-view"><div className="practice-heading"><div><p className="eyebrow text-primary">{current.eyebrow}</p><h1>{current.title}</h1><p>Write naturally — the tutor will guide you without judging mistakes.</p></div><div className="phase-marker"><span>PHASE</span><strong>02</strong><small>DEVELOP</small></div></div><div className="practice-workspace"><div className="input-panel"><div className="panel-label"><span>YOUR SENTENCE</span><span>EN / HI</span></div><Textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={current.hint} className="practice-input" /><div className="input-footer"><span>Try: “{current.hint}”</span><Button className="primary-button" onClick={() => runTutor(current.mode)} disabled={loading}>{loading ? "Thinking…" : current.button} <Send size={15} /></Button></div></div><div className="result-panel"><div className="panel-label"><span>TUTOR RESPONSE</span><span className="response-live"><i /> READY</span></div><div className="result-copy">{lines.map((line, index) => line.startsWith("###") ? <h3 key={index}>{line.replace("### ", "")}</h3> : line.startsWith("**") ? <p key={index} className="result-strong">{line.replaceAll("**", "")}</p> : line.startsWith("-") ? <p key={index} className="result-bullet">{line}</p> : <p key={index}>{line || "\u00a0"}</p>)}</div><div className="result-actions"><Button variant="outline" className="outline-button" onClick={() => setResult(defaultResult)}><RotateCcw size={15} /> Reset</Button><span><Check size={14} /> Every answer includes a reason</span></div></div></div><div className="practice-footnote"><Sparkles size={15} /><span>Tip: Don’t translate every word. Notice the whole sentence first.</span></div></section>;
}
