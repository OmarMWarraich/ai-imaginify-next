"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

import { useState } from 'react';

const MobileNav = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); 
  const pathname = usePathname();

  const handleSheetToggle = () => {
    setIsSheetOpen(!isSheetOpen); 
  };

  const closeSheet = () => {
    setIsSheetOpen(false); 
  };

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <div className="relative">
            <Sheet open={isSheetOpen}>
              <SheetTrigger>
                <Image 
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                  onClick={handleSheetToggle} 
                />
              </SheetTrigger>
              <SheetContent className="sheet-content sm:w-64">
                <>
                  <Image 
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={152}
                    height={23}
                  />

                  <ul className="header-nav_elements">
                    {navLinks.map((link) => {
                      const isActive = link.route === pathname

                      return (
                        <li 
                          className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                          key={link.route}
                          >
                          <Link 
                            className="sidebar-link cursor-pointer" 
                            href={link.route}
                            onClick={closeSheet}
                          >
                            <Image 
                              src={link.icon}
                              alt="logo"
                              width={24}
                              height={24}
                            />
                            {link.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </>
              </SheetContent>
            </Sheet>
          </div>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}

export default MobileNav;
