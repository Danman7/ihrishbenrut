"use client";

import { Anchor } from "@/app/ui/Anchor";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { IoTriangleOutline } from "react-icons/io5";

const navigation = [{ name: "Книги", href: "/books" }];

export const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="p-4 shadow-md mb-14">
      <nav className="flex items-center mx-auto max-w-4xl justify-between">
        {isMobileMenuOpen ? (
          <IoMdClose className="text-xl" onClick={toggleMobileMenu} />
        ) : (
          <IoMdMenu className="md:hidden text-xl" onClick={toggleMobileMenu} />
        )}

        {!isMobileMenuOpen && (
          <div className="text-2xl mr-12">
            <Link className="flex items-center gap-4" href="/">
              <IoTriangleOutline />
              Само Твоята Воля
            </Link>
          </div>
        )}

        <div className="gap-4 hidden md:flex">
          {navigation.map((item) => (
            <Anchor key={item.href} href={item.href}>
              {item.name}
            </Anchor>
          ))}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <nav className="flex flex-col gap-4 mt-4">
          <Anchor href="/">Home</Anchor>

          {navigation.map((item) => (
            <Anchor key={item.href} href={item.href}>
              {item.name}
            </Anchor>
          ))}
        </nav>
      )}
    </header>
  );
};
