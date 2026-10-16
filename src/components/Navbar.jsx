import React, { useState } from 'react'
import { Facebook, Instagram, Linkedin, Mail, Menu, Phone, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/siteData'

const socialIcons = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className="border-b border-slate-800 bg-navy-950 text-slate-300">
        <div className="container-shell flex items-center justify-between py-2.5 text-[11px] sm:text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a href="tel:+918856851907" className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors">
              <Phone size={14} className="text-gold-400" />
              +91-8856851907
            </a>
            <div className="h-4 w-px bg-white/10" />
            <a href="mailto:info@garudexportsandservices.com" className="inline-flex items-center gap-2 hover:text-gold-300 transition-colors">
              <Mail size={14} className="text-gold-400" />
              <span className="hidden sm:inline">info@garudexportsandservices.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {socialIcons.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                className="inline-flex rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-400 transition-all"
                aria-label={label}
                title={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-slate-200/40 bg-white/90 backdrop-blur-xl">
        <div className="container-shell flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="h-10 w-10 bg-gold-400 flex items-center justify-center text-navy-950 font-bold text-lg group-hover:bg-gold-300 transition-all">
              G
            </div>
            <span className="hidden sm:inline font-display text-lg font-bold text-navy-950 group-hover:text-gold-600 transition-colors">
              Garud Exports
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-gold-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gold-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <div className="h-6 w-px bg-slate-200" />
            <Link
              to="/admin"
              className="text-sm font-semibold text-navy-950 hover:text-gold-600 transition-colors flex items-center gap-1"
            >
              Admin
              <ArrowRight size={14} />
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 rounded-md bg-gold-400 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-300 transition-all"
            >
              Quick Enquiry
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-200 p-2.5 text-navy-950 hover:bg-slate-100 lg:hidden transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="container-shell flex flex-col gap-3 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gold-50 rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="border-t border-slate-200 my-2" />

              <Link
                to="/admin"
                className="px-4 py-2.5 text-sm font-semibold text-navy-950 hover:text-gold-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Admin Dashboard
              </Link>

              <a
                href="#enquiry"
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 text-sm font-semibold text-center hover:shadow-lg transition-all flex items-center justify-center gap-2"
                onClick={() => setOpen(false)}
              >
                Quick Enquiry
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
