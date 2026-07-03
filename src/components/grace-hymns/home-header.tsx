import Link from "next/link";
import { GraceHymnsThemeToggle } from "@/components/grace-hymns/theme-toggle";

export function HomeHeader() {
  return (
    <header className="shrink-0 border-b border-gh-outline-variant bg-gh-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-6 md:px-12 md:py-5 lg:px-20">
        <Link
          href="/grace-hymns/home"
          className="font-[family-name:var(--font-work-sans)] text-lg font-bold lowercase tracking-tight text-gh-on-background"
        >
          grace hymns
          <span
            aria-hidden
            className="ml-0.5 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-gh-primary-container"
          />
        </Link>
        <GraceHymnsThemeToggle />
      </nav>
    </header>
  );
}
