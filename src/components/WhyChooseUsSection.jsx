import React from 'react'
import { Award, TrendingUp, Zap, Users, Shield, CheckCircle2 } from 'lucide-react'
import { features } from '../data/siteData'
import FeatureCard from './FeatureCard'
import SectionHeader from './SectionHeader'

const iconMap = {
  'Quality Standards': Award,
  'Premium & Verified': TrendingUp,
  'Global Supply': Zap,
  'Customer-Centric': Users,
  'Ethical Trade': Shield,
  'Transparent': CheckCircle2,
}

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="relative py-20 sm:py-24 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-shell relative z-10">
        <SectionHeader
          eyebrow="Why Choose Us?"
          title="Built for confidence in global trade"
          description="From sourcing and packaging to communication and delivery, our process is designed to help buyers trade with clarity and confidence."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.title?.split(/\s+/)[0]] || Award
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl border border-slate-200 hover:border-gold-200 bg-white hover:bg-gold-50/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-xl bg-gold-50 group-hover:bg-gold-100 flex items-center justify-center text-gold-600 mb-4 transition-all group-hover:scale-110">
                  <IconComponent size={28} />
                </div>
                <h3 className="font-semibold text-lg text-navy-950 mb-3 group-hover:text-gold-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gold-50 group-hover:bg-gold-100 transition-colors mb-4">
                <span className="text-3xl font-bold text-gold-600">500+</span>
              </div>
              <p className="font-semibold text-navy-950 mb-1">Premium Products</p>
              <p className="text-sm text-slate-600">Carefully sourced and verified</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gold-50 group-hover:bg-gold-100 transition-colors mb-4">
                <span className="text-3xl font-bold text-gold-600">50+</span>
              </div>
              <p className="font-semibold text-navy-950 mb-1">Global Markets</p>
              <p className="text-sm text-slate-600">Serving buyers worldwide</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gold-50 group-hover:bg-gold-100 transition-colors mb-4">
                <span className="text-3xl font-bold text-gold-600">100%</span>
              </div>
              <p className="font-semibold text-navy-950 mb-1">Quality Assured</p>
              <p className="text-sm text-slate-600">Rigorous quality control</p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gold-50 group-hover:bg-gold-100 transition-colors mb-4">
                <span className="text-3xl font-bold text-gold-600">24/7</span>
              </div>
              <p className="font-semibold text-navy-950 mb-1">Support</p>
              <p className="text-sm text-slate-600">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
