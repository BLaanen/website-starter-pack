import Link from "next/link";
import {
  GithubLogo,
  XLogo,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/ssr";
import { Container } from "@/components/primitives";
import { Separator } from "@/components/ui/separator";

const socialIconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  twitter: XLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  youtube: YoutubeLogo,
};

interface FooterProps {
  siteName: string;
  siteDescription?: string | null;
  navigation?:
    | Array<{ text: string; url: string; isExternal?: boolean | null }>
    | null;
  socialLinks?: Array<{ platform: string; url: string }> | null;
  footerText?: string | null;
}

export default function Footer({
  siteName,
  siteDescription,
  navigation,
  socialLinks,
  footerText,
}: FooterProps) {
  const hasNavigation = navigation && navigation.length > 0;
  const hasSocialLinks = socialLinks && socialLinks.length > 0;

  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {/* Column 1: Site Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold">{siteName}</h3>
            {siteDescription && (
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                {siteDescription}
              </p>
            )}
          </div>

          {/* Column 2: Navigation */}
          {hasNavigation && (
            <div>
              <h4 className="font-heading text-sm font-semibold">
                Navigation
              </h4>
              <nav className="mt-3 flex flex-col gap-2">
                {navigation.map((item) =>
                  item.isExternal ? (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link
                      key={item.url}
                      href={item.url}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.text}
                    </Link>
                  )
                )}
              </nav>
            </div>
          )}

          {/* Column 3: Connect */}
          {hasSocialLinks && (
            <div>
              <h4 className="font-heading text-sm font-semibold">Connect</h4>
              <div className="mt-3 flex flex-row gap-3">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.platform];
                  if (!Icon) return null;

                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={link.platform}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            {footerText ||
              `\u00A9 ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
          </p>
          <p>Built with Next.js &amp; Sanity</p>
        </div>
      </Container>
    </footer>
  );
}
