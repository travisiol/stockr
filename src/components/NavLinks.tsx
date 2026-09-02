"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

const links = [
  { id: "payout", index: "01", label: "Payout" },
  { id: "mechanism", index: "02", label: "Mechanism" },
  { id: "no-bridge", index: "03", label: "No bridge" },
  { id: "terminal", index: "04", label: "Terminal" },
  { id: "math", index: "05", label: "Math" },
  { id: "verify", index: "07", label: "Verify" },
  { id: "questions", index: "08", label: "Questions" },
];

export function NavLinks() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Highlights whichever section crosses a line at 45% of the viewport.
  //
  // Three approaches were tried. A plain IntersectionObserver hands you every
  // entry that changed at once, and "the first intersecting one" is
  // arbitrary. Collapsing the observer's root to a band at the line fixes
  // the semantics but never fires — a zero-height root intersects nothing.
  // A rAF-throttled scroll listener measures correctly but requestAnimationFrame
  // does not run while the page is not being rendered, and neither does
  // intersection delivery, so both froze in a hidden tab.
  //
  // So: a scroll listener, throttled with a timer rather than a frame, that
  // measures rects and answers the actual question — which section is under
  // that line. ~12 updates a second at most, seven getBoundingClientRect
  // calls each, and it keeps working wherever the page is.
  //
  // setActive only ever runs inside the timer callback, never synchronously
  // in the effect body, which the React Compiler lint rules reject.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      timer = undefined;
      const line = window.innerHeight * 0.45;
      // The last section that has started above the line, rather than the one
      // straddling it: not every section is in this list (the payout preview
      // is not), and requiring a straddle leaves the highlight blank while
      // the reader sits in one of the gaps.
      let current: string | null = null;
      for (const link of links) {
        const element = document.getElementById(link.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top > line) break;
        current = link.id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (timer === undefined) timer = setTimeout(update, 80);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (timer !== undefined) clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <>
      <ul className="hidden flex-1 items-center gap-5 lg:flex">
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={isActive ? "true" : undefined}
                className={clsx(
                  "group flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] transition",
                  isActive ? "text-fg" : "text-fg-dim hover:text-fg",
                )}
              >
                <span
                  className={clsx(
                    "transition",
                    isActive
                      ? "text-phos"
                      : "text-fg-faint group-hover:text-phos",
                  )}
                >
                  {link.index}
                </span>
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="nav-menu"
        className="ml-auto rounded-[3px] border border-rule px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-fg-dim transition hover:border-rule-2 hover:text-fg lg:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id="nav-menu"
          className="absolute inset-x-0 top-14 border-b border-rule bg-void/95 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-[1180px] flex-col px-4 py-2 sm:px-6">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-rule py-3 text-[11px] uppercase tracking-[0.16em] text-fg-dim last:border-b-0"
                >
                  <span className="text-phos">{link.index}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
