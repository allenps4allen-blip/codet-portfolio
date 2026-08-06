import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const socialLinks = [
  { key: "instagram", href: "https://www.instagram.com/codet.kuwait/" },
] as const;

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              CODET
            </Link>
            <p className="text-sm leading-relaxed text-foreground/60">
              {t("location")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
              {t("navigationTitle")}
            </h3>
            <ul className="space-y-3 sm:space-y-2">
              {navLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="inline-block py-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
              {tNav("contact")}
            </h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {t("email")}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t("phone")}`}
                  className="transition-colors hover:text-foreground"
                  dir="ltr"
                >
                  {t("phone")}
                </a>
              </li>
              <li>{t("location")}</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
              {t("legalTitle")}
            </h3>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="inline-block py-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-block py-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50 pt-2">
              {t("socialTitle")}
            </h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              {socialLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {t(`social.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-foreground/50">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
