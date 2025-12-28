"use client";
import { useTheme } from "next-themes";

export function DebugTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 rounded bg-black/60 px-3 py-2 text-xs text-white">
      <span>theme: {theme}</span>
      <span>resolved: {resolvedTheme}</span>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("orange")}>orange</button>
      <button onClick={() => setTheme("purple")}>purple</button>
    </div>
  );
}
