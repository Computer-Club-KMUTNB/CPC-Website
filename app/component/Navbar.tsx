import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 b-2">
        <Link href="/">Home page</Link>
        <Link href="/notion">Test Notion</Link>
    </nav>
  )
}

export default Navbar