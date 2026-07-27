"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="ml-auto rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700"
        disabled
      >
        …
      </button>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="ml-auto rounded-full border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle color theme"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-full flex flex-col">
        <div className="flex items-center justify-end px-4 py-2">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Providers;