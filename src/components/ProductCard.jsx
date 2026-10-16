import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function ProductCard({ product, index }) {
  return (
    <article
      className="group overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-premium"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={product.image || '/images/product-placeholder.svg'}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = '/images/product-placeholder.svg'
          }}
        />
        <span className="absolute bottom-0 left-0 bg-navy-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
          Export category
        </span>
      </div>

      <div className="flex min-h-[190px] flex-col p-6">
        <h3 className="font-display text-xl font-bold text-navy-950">{product.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <a href="#enquiry" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy-950 transition hover:text-gold-700">
          Enquire about this product
          <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  )
}
