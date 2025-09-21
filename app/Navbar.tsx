'use client';
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Settings', href: '/settings'}
    ]

    const pathname = usePathname();

  return (
    <nav className='flex p-x-4 border-b mb-3 h-10 space-x-4 items-center'>
      <Link href="/">Logo</Link>

      <ul className='flex space-x-4'>
        {links.map(link =>
            <Link
                key={link.href}
                href={link.href}
                className={`${pathname === link.href
                    ? 'text-zinc-900'
                    : 'text-zinc-500'}
                    text-zinc-500 hover:text-zinc-800 transition-colors`
            }>
                {link.label}
            </Link>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
