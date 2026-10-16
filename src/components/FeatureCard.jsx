import React from 'react'
export default function FeatureCard({ feature }) {
  const Icon = feature.icon

  return (
    <article className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-xl">
      <div className="mb-5 inline-flex rounded-2xl bg-navy-950 p-3 text-gold-300 shadow-lg shadow-navy-950/20">
        <Icon size={24} />
      </div>
      <h3 className="font-display text-xl font-bold text-navy-950">{feature.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
    </article>
  )
}
