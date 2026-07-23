import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 font-bold">
        <Link href="/">หน้าหลัก</Link>
        <Link href="/notion">ทดสอบ</Link>
    </nav>
  )
}

export default Navbar