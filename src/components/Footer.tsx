import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const socialLinks = [
  {
    key: "instagram",
    href: "https://www.instagram.com/codet.kuwait/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
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
    <footer className="relative border-t border-white/[0.06]" style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,168,132,0.2), transparent)" }} />
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: "#e9edef" }}>
              CODET
            </Link>
            <p className="text-sm leading-relaxed text-foreground/40">
              {t("location")}
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ key, href, icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/40 transition-all hover:bg-white/[0.06] hover:text-[#00a884]"
                  aria-label={key}
                >
                  {icon}
                </a>
              ))}
              <a
                href="https://wa.me/96566565517"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/40 transition-all hover:bg-white/[0.06] hover:text-[#25D366]"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/30">
              {t("navigationTitle")}
            </h3>
            <ul className="space-y-3 sm:space-y-2">
              {navLinks.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="inline-block py-1 text-sm text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/30">
              {tNav("contact")}
            </h3>
            <ul className="space-y-2 text-sm text-foreground/50">
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
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/30">
              {t("legalTitle")}
            </h3>
            <ul className="space-y-3 sm:space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="inline-block py-1 text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-block py-1 text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/[0.06] pt-6">
          <p className="text-center text-xs text-foreground/30">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
