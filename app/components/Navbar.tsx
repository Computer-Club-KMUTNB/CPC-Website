import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className="flex gap-4 p-4">
        <Link href="/">Home Page</Link>
        <Link href="/notion">Test Notion</Link>
    </nav>
  )
}

export default Navbar