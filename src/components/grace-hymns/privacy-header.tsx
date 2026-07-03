import Link from "next/link";
import { GraceHymnsThemeToggle } from "@/components/grace-hymns/theme-toggle";

export function PrivacyHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gh-outline-variant/10 bg-gh-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-6 md:px-10">
        <Link
          href="/grace-hymns/home"
          className="font-[family-name:var(--font-work-sans)] text-lg font-bold lowercase tracking-tight text-gh-on-background md:text-xl"
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
