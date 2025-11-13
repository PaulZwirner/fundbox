import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  {
    href: "https://twitter.com",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "https://www.linkedin.com",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com",
    icon: Github,
    label: "GitHub",
  },
];

const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 text-sm text-foreground/70">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-border/50 bg-card/80 px-6 py-8 text-center backdrop-blur-xl md:flex-row md:text-left">
        <span>&copy; {new Date().getFullYear()} Fundbox. All rights reserved.</span>
        <div className="flex items-center gap-8">
          <Link className="transition hover:text-foreground" href="#">Privacy</Link>
          <Link className="transition hover:text-foreground" href="#">Terms</Link>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="rounded-full border border-border/60 bg-card/60 p-2 transition hover:border-primary/40 hover:text-primary hover:shadow-primary/25"
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
