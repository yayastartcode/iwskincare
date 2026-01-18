'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { SiteSetting, Media } from '@/payload-types'

interface HeaderClientProps {
  data: SiteSetting
}

export function HeaderClient({ data }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get logo image URL
  const getLogoUrl = (): string | null => {
    if (!data.logo?.image) return null
    if (typeof data.logo.image === 'string') return data.logo.image
    return (data.logo.image as Media).url ?? null
  }

  const logoUrl = getLogoUrl()
  const logoText = data.logo?.text || ''
  const navLinks = data.navigation?.links?.filter((link) => link.isActive) ?? []
  const ctaButton = data.navigation?.ctaButton

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoText}
              width={200}
              height={60}
              className="h-14 w-auto md:h-16"
              priority
            />
          ) : (
            <>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#6B7F5E]"
              >
                <path
                  d="M12 2C12 2 8 6 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 6 12 2 12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M12 6C12 6 10 8 10 11C10 13 11 15 12 16C13 15 14 13 14 11C14 8 12 6 12 6Z"
                  fill="white"
                  fillOpacity="0.3"
                />
              </svg>
              <span className="text-2xl font-medium text-[#5C5346] md:text-3xl">
                {logoText}
              </span>
            </>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
              className="text-sm font-medium text-[#5C5346] transition-colors hover:text-[#6B7F5E]"
            >
              {link.label}
            </Link>
          ))}
          {ctaButton?.show && ctaButton.label && ctaButton.url && (
            <Link
              href={ctaButton.url}
              target={ctaButton.openInNewTab ? '_blank' : undefined}
              rel={ctaButton.openInNewTab ? 'noopener noreferrer' : undefined}
              className="rounded-lg bg-[#6B7F5E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#5a6b4f]"
            >
              {ctaButton.label}
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#5C5346] hover:bg-gray-100 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-gray-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-base font-medium text-[#5C5346] transition-colors hover:text-[#6B7F5E]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {ctaButton?.show && ctaButton.label && ctaButton.url && (
              <Link
                href={ctaButton.url}
                target={ctaButton.openInNewTab ? '_blank' : undefined}
                rel={ctaButton.openInNewTab ? 'noopener noreferrer' : undefined}
                className="mt-2 rounded-lg bg-[#6B7F5E] px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#5a6b4f]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaButton.label}
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
