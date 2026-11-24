"use client";

import Cursor from "./Cursor";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {children}
    </>
  );
}
