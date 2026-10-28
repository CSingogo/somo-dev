import { Moon, Sun } from "lucide-react";
import {
  ThemeToggler as ThemeTogglerPrimitive,
  type ThemeSelection,
} from "@/components/animate-ui/primitives/effects/theme-toggler";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/use-theme";

function getNextTheme(current: ThemeSelection): ThemeSelection {
  return current === "light" ? "dark" : "light";
}

const toggleButtonClass =
  "flex size-9 items-center justify-center rounded-full border border-gh-outline-variant/60 transition-colors hover:bg-gh-surface-container-low dark:border-neutral-800 dark:hover:bg-neutral-900";

export default function GraceHymnsThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeTogglerPrimitive
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction="ltr"
    >
      {({ effective, resolved, toggleTheme }) => {
        const display = effective === "system" ? resolved : effective;
        return (
          <button
            type="button"
            aria-label="Toggle theme"
            className={cn(toggleButtonClass, className)}
            onClick={() => toggleTheme(getNextTheme(effective))}
          >
            {display === "dark" ? (
              <Moon
                className="h-4 w-4 text-gh-on-background"
                strokeWidth={1.5}
              />
            ) : (
              <Sun
                className="h-4 w-4 text-gh-on-background"
                strokeWidth={1.5}
              />
            )}
          </button>
        );
      }}
    </ThemeTogglerPrimitive>
  );
}
