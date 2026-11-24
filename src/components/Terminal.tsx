"use client";

import { useEffect, useRef, useState } from "react";
import { terminal, person, headings } from "@/data/content";
import SectionHeader from "./SectionHeader";

type Entry = { id: number; cmd?: string; lines: string[]; error?: boolean };

const builtins = ["help", "whoami", "skills", "projects", "contact", "cv", "clear"];
const suggestions = ["whoami", "skills", "projects", "contact", "help"];

/** Turns emails / bare URLs in output into links. */
function Linkify({ text }: { text: string }) {
  const parts = text.split(/(\S+@\S+\.\S+|(?:github\.com|linkedin\.com)\/\S+)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (/^\S+@\S+\.\S+$/.test(p))
          return <a key={i} href={`mailto:${p}`} className="text-accent underline-offset-4 hover:underline">{p}</a>;
        if (/^(github\.com|linkedin\.com)\//.test(p))
          return <a key={i} href={`https://${p}`} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">{p}</a>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, lines: terminal.welcome }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const key = name?.toLowerCase() ?? "";
    if (cmd) setHistory((h) => [cmd, ...h].slice(0, 50));
    setHIndex(-1);

    if (key === "clear") {
      setEntries([]);
      return;
    }

    let lines: string[];
    let error = false;
    if (!cmd) lines = [];
    else if (terminal.commands[key]) lines = terminal.commands[key];
    else if (key === "cv") {
      lines = ["Downloading cv.pdf …"];
      const a = document.createElement("a");
      a.href = person.cv;
      a.download = "Fady_Alber_CV.pdf";
      a.click();
    } else if (key === "ls") lines = ["about/  projects/  skills/  contact/  cv.pdf"];
    else if (key === "echo") lines = [args.join(" ")];
    else if (key === "sudo") lines = ["Nice try. Hire me first and we'll talk permissions."];
    else if (key === "hire") lines = [`Great choice. Email ${person.email}`];
    else {
      lines = [`command not found: ${name}. Try \`help\`.`];
      error = true;
    }
    setEntries((e) => [...e, { id: idRef.current++, cmd, lines, error }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIndex + 1, history.length - 1);
      if (n >= 0) {
        setHIndex(n);
        setValue(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hIndex - 1;
      setHIndex(Math.max(n, -1));
      setValue(n >= 0 ? history[n] : "");
    } else if (e.key === "Tab" && value) {
      const match = builtins.find((b) => b.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <section id="terminal" aria-labelledby="terminal-title" className="mx-auto max-w-site px-5 py-28 sm:px-8 lg:px-12 lg:py-40">
      <SectionHeader id="terminal-title" title={headings.terminal.title} intro={headings.terminal.intro} />
      <div className="mt-14 lg:mt-20">
        <div className="overflow-hidden rounded-xl border border-line bg-coal transition-[border-color] duration-150 focus-within:border-accent/60 shadow-[0_40px_100px_-60px_rgba(255,163,26,0.18)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
            <span className="ml-auto font-mono text-xs text-muted">fady@portfolio: ~</span>
          </div>
          {/* Clicking anywhere in the log focuses the input (the input itself stays keyboard-reachable). */}
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            data-lenis-prevent
            className="h-[420px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed sm:p-7 sm:text-sm"
          >
            <div role="log" aria-live="polite" aria-label="Terminal output">
              {entries.map((en) => (
                <div key={en.id} className="mb-3">
                  {en.cmd !== undefined && (
                    <p>
                      <span className="text-accent">{terminal.prompt}</span> <span>{en.cmd}</span>
                    </p>
                  )}
                  {en.lines.map((l, i) => (
                    <p key={i} className={`whitespace-pre-wrap ${en.error ? "text-[#ff7a6b]" : "text-paper/80"}`}>
                      <Linkify text={l} />
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <label htmlFor="term-input" className="shrink-0 text-accent">
                {terminal.prompt}
                <span className="sr-only"> Enter a command</span>
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                className="min-w-0 flex-1 bg-transparent text-paper caret-accent outline-none placeholder:text-muted/50 focus-visible:outline-none"
                placeholder="type a command…"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
            <span className="mr-1 self-center text-sm text-muted">Try</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => run(s)}
                className="rounded-full border border-line px-3 py-1 font-mono text-xs text-paper/80 transition-[color,border-color,transform] duration-150 hover:border-accent hover:text-accent active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
