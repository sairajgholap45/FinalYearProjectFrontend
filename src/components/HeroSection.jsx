import React, { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Globe2, Pause, Play } from 'lucide-react'
import { products, stats } from '../data/siteData'

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeProduct = products[activeIndex]

  useEffect(() => {
    if (isPaused) return undefined

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % products.length)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [isPaused])

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + products.length) % products.length)
  }

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % products.length)
  }

  return (
    <section
      id="home"
      className="relative min-h-[680px] overflow-hidden bg-navy-950 text-white sm:min-h-[720px]"
      aria-roledescription="carousel"
      aria-label="Export product categories"
    >
      <img
        key={activeProduct.image}
        src={activeProduct.image}
        alt={activeProduct.title}
        className="absolute inset-0 h-full w-full animate-in fade-in object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950/75 to-transparent" />

      <div className="container-shell relative flex min-h-[680px] flex-col justify-between py-24 sm:min-h-[720px] sm:py-28">
        <div className="flex flex-1 items-center">
          <div key={activeProduct.title} className="max-w-3xl animate-in fade-in">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-bold uppercase text-gold-300">
              <Globe2 size={17} />
              We are here to export
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-[1.08] sm:text-6xl lg:text-7xl">
              {activeProduct.title}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
              {activeProduct.description}
            </p>

            <a href="#products" className="mt-8 inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold-400 hover:text-navy-950">
              View products
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-white/25 pt-5">
          <div className="flex items-center gap-3" aria-label={`Slide ${activeIndex + 1} of ${products.length}`}>
            {products.map((product, index) => (
              <button
                key={product.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${product.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/70 hover:bg-white'}`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-white/90">
              {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/40 bg-navy-950/40 text-white transition hover:border-gold-300 hover:text-gold-300"
            >
              {isPaused ? <Play size={18} /> : <Pause size={18} />}
            </button>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous product"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/40 bg-navy-950/40 text-white transition hover:border-gold-300 hover:text-gold-300"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next product"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/40 bg-navy-950/40 text-white transition hover:border-gold-300 hover:text-gold-300"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hidden grid-cols-2 gap-x-8 gap-y-3 sm:grid lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="border-l border-white/30 pl-3">
                <p className="font-display text-lg font-bold text-white">{item.value}</p>
                <p className="text-xs text-slate-200">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
