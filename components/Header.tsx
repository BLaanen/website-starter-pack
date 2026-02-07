"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { List } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

interface HeaderProps {
  siteName: string;
  navigation: Array<{ text: string; url: string; isExternal?: boolean }>;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header({ siteName, navigation }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasNavigation = navigation.length > 0;

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Site name / logo */}
          <Link
            href="/"
            className="font-heading text-lg font-bold"
          >
            {siteName}
          </Link>

          {/* Desktop navigation */}
          {hasNavigation && (
            <nav className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => {
                const active = isActive(pathname, item.url);

                if (item.isExternal) {
                  return (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors",
                        "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.text}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.text}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Mobile navigation */}
          {hasNavigation && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <List size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>{siteName}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {navigation.map((item) => {
                    const active = isActive(pathname, item.url);

                    if (item.isExternal) {
                      return (
                        <a
                          key={item.url}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "rounded-md px-3 py-3 text-base transition-colors",
                            "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {item.text}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.url}
                        href={item.url}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-3 text-base transition-colors",
                          active
                            ? "font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.text}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </Container>
    </header>
  );
}
