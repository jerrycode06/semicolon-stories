import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-lg font-semibold">
          <img src="/logo.png" width={80} height={80} alt="logo" />
          <span>semicolon stories</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Posts
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
