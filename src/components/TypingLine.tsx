"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function TypingLine({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    let delay = deleting ? 35 : 75;
    if (!deleting && text === word) delay = 1700;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, reduce]);

  return (
    <p className="font-mono text-base text-paper sm:text-lg">
      <span className="text-accent" aria-hidden="true">
        &gt;{" "}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {reduce ? words[0] : text}
        <span className="caret h-[1.1em] translate-y-[0.2em] text-accent" />
      </span>
    </p>
  );
}
