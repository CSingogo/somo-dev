import Link from "next/link";
import { Sparkles } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="border-t border-gh-outline-variant py-20">
      <div className="mx-auto max-w-[1200px] px-6 md:px-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles
                className="h-5 w-5 fill-gh-primary text-gh-primary"
                strokeWidth={1.5}
              />
              <span className="font-serif text-lg font-bold tracking-tight">
                Grace Hymns
              </span>
            </div>
            <p className="max-w-xs text-xs font-light leading-relaxed text-gh-secondary">
              A refined digital companion for worship, built with precision and
              reverence. © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gh-on-background">
              Product
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/grace-hymns/privacy-policy"
                  className="text-xs text-gh-secondary transition-colors hover:text-gh-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gh-on-background">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:singogosingogo@gmail.com"
                  className="text-xs text-gh-secondary transition-colors hover:text-gh-primary"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
