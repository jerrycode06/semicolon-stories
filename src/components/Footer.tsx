import { Github, Linkedin, Mail, X } from "lucide-react";

const socialLinks = [
  { icon: X, href: "https://x.com/_headless_coder", label: "X" },
  { icon: Github, href: "https://github.com/jerrycode06", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/nikhil-upadhyay-166673150/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:nikhil9690@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-8">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} semicolon stories. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
