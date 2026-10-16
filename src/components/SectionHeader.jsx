import React from 'react'
export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="mb-4 inline-flex border-l-2 border-gold-500 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
        {eyebrow}
      </p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy mt-5">{description}</p>
    </div>
  )
}
