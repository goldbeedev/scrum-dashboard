'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on the landing page (root route)
  if (pathname === '/') {
    return null;
  }

  return <Navbar />;
} 