import React from 'react'
import { Facebook, Globe2, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { footerProducts, navLinks } from '../data/siteData'

const socialIcons = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Globe2, label: 'Website' },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-navy-950 to-navy-900 text-slate-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-shell relative z-10 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg">
                G
              </div>
              <span className="font-display text-lg font-bold text-white">Garud Exports</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Delivering India's premium products to global markets with quality, reliability, and consistent service.
            </p>
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-400 transition-all duration-300"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Products</h4>
            <ul className="space-y-3">
              {footerProducts.slice(0, 5).map((item) => (
                <li key={item}>
                  <a href="#products" className="text-sm text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-slate-300">Phone</div>
                  <a href="tel:+918856851907" className="text-gold-400 hover:text-gold-300 transition-colors">
                    +91-8856851907
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-slate-300">Email</div>
                  <a href="mailto:info@garudexportsandservices.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                    info@garud...
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-slate-300">Location</div>
                  <div className="text-gold-400">Thane, India</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Subscribe for updates and exclusive offers.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all"
              />
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 text-sm font-semibold hover:shadow-lg transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-400">
            <div>
              <p>© {currentYear} Garud Exports & Services. All Rights Reserved.</p>
            </div>
            <div className="md:text-right space-x-6">
              <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center pt-4 border-t border-white/5">
          <p className="text-xs text-slate-500">Made with <span className="text-gold-400">♡</span> for global partnerships</p>
        </div>
      </div>
    </footer>
  )
}
