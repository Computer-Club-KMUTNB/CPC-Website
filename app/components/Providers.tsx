"use client";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-full flex flex-col">{children}</div>
    </ThemeProvider>
  );
};

export default Providers;