"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once, client-side. Unregistered plugins silently no-op.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 0.8 });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const MOTION_REDUCE = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
