'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { HeroSlider as HeroSliderType, Media } from '@/payload-types'

interface HeroSliderProps {
  data: HeroSliderType
}

interface SlideData {
  id?: string | null
  image: string | Media
  alt?: string | null
  isActive?: boolean | null
}

function SliderContent({
  slides,
  settings,
  className,
}: {
  slides: SlideData[]
  settings: HeroSliderType['settings']
  className?: string
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(settings?.autoPlay ?? true)

  const activeSlides = slides.filter((slide) => slide.isActive) ?? []
  const autoPlayInterval = (settings?.autoPlayInterval ?? 5) * 1000

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }, [activeSlides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }, [activeSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(settings?.autoPlay ?? true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlaying || activeSlides.length <= 1) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayInterval, activeSlides.length])

  const getImageData = (image: string | Media): { url: string; alt: string } => {
    if (typeof image === 'string') return { url: image, alt: '' }
    return { url: image.url ?? '', alt: image.alt ?? '' }
  }

  if (activeSlides.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {activeSlides.map((slide, index) => {
          const imageData = getImageData(slide.image)
          return (
            <div key={slide.id ?? index} className="relative h-full w-full flex-shrink-0">
              <Image
                src={imageData.url}
                alt={slide.alt || imageData.alt || `Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Next slide"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function HeroSlider({ data }: HeroSliderProps) {
  const desktopSlides = (data.desktopSlides ?? []) as SlideData[]
  const mobileSlides = (data.mobileSlides ?? []) as SlideData[]

  const hasDesktopSlides = desktopSlides.some((s) => s.isActive)
  const hasMobileSlides = mobileSlides.some((s) => s.isActive)

  if (!hasDesktopSlides && !hasMobileSlides) {
    return (
      <section className="relative mx-auto flex h-[500px] w-full max-w-7xl items-center justify-center bg-gray-100 md:h-[700px] lg:h-[800px]">
        <p className="text-gray-500">Belum ada slide. Tambahkan slide di Admin Panel.</p>
      </section>
    )
  }

  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden">
      {/* Desktop Slider */}
      {hasDesktopSlides && (
        <SliderContent
          slides={desktopSlides}
          settings={data.settings}
          className="relative hidden h-[700px] lg:block lg:h-[800px]"
        />
      )}

      {/* Mobile Slider */}
      {hasMobileSlides && (
        <SliderContent
          slides={mobileSlides}
          settings={data.settings}
          className="relative block h-[500px] md:h-[600px] lg:hidden"
        />
      )}

      {/* Fallback: If only desktop slides exist, show them on mobile too */}
      {!hasMobileSlides && hasDesktopSlides && (
        <SliderContent
          slides={desktopSlides}
          settings={data.settings}
          className="relative block h-[500px] md:h-[600px] lg:hidden"
        />
      )}

      {/* Fallback: If only mobile slides exist, show them on desktop too */}
      {!hasDesktopSlides && hasMobileSlides && (
        <SliderContent
          slides={mobileSlides}
          settings={data.settings}
          className="relative hidden h-[700px] lg:block lg:h-[800px]"
        />
      )}
    </section>
  )
}
