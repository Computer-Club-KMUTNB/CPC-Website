"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme === 'system' ? theme : resolvedTheme;
  const isDark = currentTheme === 'dark';
  const logoSrc = isDark ? '/cck_logo-white.png' : '/cck_logo-black.png';

  return (
    <nav className="flex w-full items-center gap-4 p-4 font-bold">
      <Link href="/" className="flex-shrink-0">
        <Image src={logoSrc} alt="โลโก้ชมรมคอมพิวเตอร์" width={20} height={20} />
      </Link>

      <div className="font-cpc ml-auto flex items-center gap-2 text-3xl">
        <Link href="/">หน้าหลัก</Link>
        <Link href="/notion">ทดสอบ</Link>
        <Link href="/blogs">Blog ชาวชมรม</Link>

        <button
          type="button"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle color theme"
        >
          {mounted ? (isDark ? '☀️' : '🌙') : '…'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar