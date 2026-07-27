"use client";
import Image from 'next/image'
import Link from 'next/link'
import Providers from './Providers'

function Navbar() {
  return (
      <nav className="flex w-full items-center gap-4 p-4 font-bold">
        <Link href="/" className="flex-shrink-0">
          <Image src="/cck_logo-white.png" alt="โลโก้ชมรมคอมพิวเตอร์" width={20} height={20} />
        </Link>
        <Providers/>
        <div className="font-cpc ml-auto flex gap-2 text-3xl">
          <Link href="/">หน้าหลัก</Link>
          <Link href="/notion">ทดสอบ</Link>
          <Link href="/blogs">Blog ชาวชมรม</Link>
        </div>
      </nav>
  )
}

export default Navbar