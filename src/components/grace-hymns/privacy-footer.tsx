import Link from "next/link";

export function PrivacyFooter() {
  return (
    <footer className="border-t border-gh-outline-variant/20 bg-gh-surface-container-low">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 md:px-10">
        <div>
          <div className="mb-4">
            <span className="font-[family-name:var(--font-work-sans)] text-sm font-bold lowercase tracking-tight text-gh-on-background">
              grace hymns
              <span
                aria-hidden
                className="ml-0.5 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-gh-primary-container"
              />
            </span>
          </div>
          <p className="max-w-sm text-sm text-gh-on-surface-variant">
            © {new Date().getFullYear()} Grace Hymns. Built for devotion and
            technical precision. Dedicated to preserving the legacy of sacred
            music through modern technology.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
          <Link
            href="/grace-hymns/privacy-policy"
            className="text-xs text-gh-on-surface-variant opacity-80 transition-all hover:text-gh-primary hover:opacity-100 hover:underline"
          >
            Privacy Policy
          </Link>
          <a
            href="mailto:singogosingogo@gmail.com"
            className="text-xs text-gh-on-surface-variant opacity-80 transition-all hover:text-gh-primary hover:opacity-100 hover:underline"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
