import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export type SiteNavActive = "index" | "about" | "ask-ai";

type SiteHeaderProps = {
  active?: SiteNavActive;
  leading?: ReactNode;
};

function navClass(isActive: boolean) {
  return isActive
    ? "text-(--foreground)"
    : "text-(--text-muted) hover:text-(--foreground)";
}

const links = [
  { id: "index" as const, href: "/", label: "Work" },
  { id: "about" as const, href: "/about", label: "About" },
  { id: "ask-ai" as const, href: "/ask-ai", label: "JSON" },
];

export function SiteHeader({ active, leading }: SiteHeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-4 bg-bg px-4 py-3 md:hidden">
        {leading}
        <Link className="font-medium text-lg tracking-tight" href="/">
          aylesim
        </Link>
        <nav aria-label="Primary" className="flex gap-3 text-sm">
          {links.map((link) => (
            <Link
              aria-current={active === link.id ? "page" : undefined}
              className={navClass(active === link.id)}
              href={link.href}
              key={link.id}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <header className="fixed inset-y-0 left-0 z-30 hidden w-16 flex-col items-center bg-(--spine) py-5 md:flex">
        <Link
          className="mt-1 font-medium text-[1.05rem] tracking-tight"
          href="/"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          aylesim
        </Link>
        <nav
          aria-label="Primary"
          className="mt-10 flex flex-col items-center gap-8 text-sm"
        >
          {links.map((link) => (
            <Link
              aria-current={active === link.id ? "page" : undefined}
              className={navClass(active === link.id)}
              href={link.href}
              key={link.id}
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div
          className="mt-auto mb-8"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
