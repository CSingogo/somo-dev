import { useCallback, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  return "system";
}

function readResolvedTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Same shape as next-themes' useTheme. Client-only: the head script in
// BaseLayout.astro has already applied the class before this runs.
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState(readResolvedTheme);

  const setTheme = useCallback((next: Theme) => {
    const resolved =
      next === "system"
        ? matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : next;
    document.documentElement.classList.toggle("dark", resolved === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setThemeState(next);
    setResolvedTheme(resolved);
  }, []);

  return { theme, resolvedTheme, setTheme };
}
