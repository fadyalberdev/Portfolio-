"use client";

import { MotionConfig } from "framer-motion";
import Cursor from "./Cursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {children}
    </MotionConfig>
  );
}
