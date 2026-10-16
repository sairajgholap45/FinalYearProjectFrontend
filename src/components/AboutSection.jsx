import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { trustPoints } from '../data/siteData'
import SectionHeader from './SectionHeader'

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative border-l-4 border-gold-400 pl-4">
          <img
            src="/images/export-warehouse-hero.png"
            alt="Garud Exports and Services global sourcing overview"
            className="relative min-h-[390px] w-full object-cover shadow-premium"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = '/images/product-placeholder.svg'
            }}
          />
        </div>

        <div>
          <SectionHeader
            eyebrow="Who we are"
            title="Garud Exports & Services - Delivering India's Quality to the World"
            description="Garud Exports & Services supplies premium-quality Indian food products and lifestyle goods to global markets, including agro products, spices, snacks, handicrafts, jewellery, copper articles, and home decor - carefully sourced and export-ready to meet international standards."
          />

          <p className="mt-8 text-base leading-8 text-slate-600">
            We are committed to building long-term, trustworthy business relationships and being a dependable partner for importers, distributors, and retailers worldwide.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-3 border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="bg-gold-100 p-2 text-gold-700">
                  <CheckCircle2 size={18} />
                </div>
                <span className="font-semibold text-navy-950">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
