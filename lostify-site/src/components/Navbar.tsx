"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/demo", label: "Request Demo" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-3 z-[60] px-4 sm:top-6"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 md:px-8">
        {/* Fundbox Name on the Left */}
        <Link
          href="/"
          className="font-semibold uppercase tracking-[0.4em] text-base md:text-lg text-foreground transition-colors hover:text-primary"
        >
          Fundbox
        </Link>

        {/* Menu Icon on the Right */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className="flex items-center justify-center p-2 transition-colors hover:text-primary"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Dropdown Menu (Hover) */}
          <div className="hidden md:block">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 min-w-[180px] z-50"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <GlassSurface
                    variant="card"
                    className="w-full rounded-2xl px-2 py-2"
                    innerClassName="flex flex-col gap-1"
                  >
                    {links.map(({ href, label }) => {
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          className={cn(
                            "rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                            isActive
                              ? "bg-primary/15 text-primary"
                              : "text-foreground/80 hover:bg-accent hover:text-foreground"
                          )}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </GlassSurface>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 w-full max-w-6xl px-4 md:px-0 md:hidden"
          >
            <GlassSurface
              variant="card"
              className="w-full rounded-[2rem] px-6 py-6"
              innerClassName="flex flex-col gap-4 text-base font-medium"
            >
              {links.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 transition-all",
                      isActive
                        ? "bg-primary/15 text-primary shadow-inner"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </GlassSurface>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
