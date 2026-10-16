import React from 'react'
import { products } from '../data/siteData'
import ProductCard from './ProductCard'
import SectionHeader from './SectionHeader'

export default function ProductsSection() {
  return (
    <section id="products" className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Products"
          title="Our Premium Range of Global Exports"
          description="Explore our export-ready range of food products and lifestyle goods - sourced with care, packed with quality, and prepared for international markets."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
