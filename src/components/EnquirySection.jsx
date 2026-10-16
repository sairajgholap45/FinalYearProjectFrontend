import React, { useState } from 'react'
import { Send, Phone, Mail, Globe2, CheckCircle2, AlertCircle, Loader } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const ENQUIRY_TIMEOUT_MS = 15000

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: '',
    success: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitState({ loading: true, error: '', success: false })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), ENQUIRY_TIMEOUT_MS)

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry')
      }

      setSubmitState({ loading: false, error: '', success: true })
      setFormData({ name: '', email: '', phone: '', message: '' })

      setTimeout(() => {
        setSubmitState({ loading: false, error: '', success: false })
      }, 5000)
    } catch (error) {
      const errorMessage = error.name === 'AbortError' ? 'Request timeout. Please try again.' : error.message
      setSubmitState({ loading: false, error: errorMessage, success: false })
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return (
    <section id="enquiry" className="relative py-20 sm:py-24 bg-gradient-to-b from-navy-950 to-navy-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-shell relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 backdrop-blur-sm mb-6">
            <Send size={16} className="text-gold-300" />
            <span className="text-sm font-semibold text-gold-200">Easy Enquiry Process</span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Let's connect and explore how Garud can meet your export needs with quality and reliability.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gold-500/20 group-hover:bg-gold-500/30 text-gold-400 group-hover:text-gold-300 transition-all">
                  <Phone size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                <a href="tel:+918856851907" className="text-slate-300 hover:text-gold-300 transition-colors">
                  +91-8856851907
                </a>
              </div>
            </div>

            <div className="flex gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gold-500/20 group-hover:bg-gold-500/30 text-gold-400 group-hover:text-gold-300 transition-all">
                  <Mail size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <a href="mailto:info@garudexportsandservices.com" className="text-slate-300 hover:text-gold-300 transition-colors">
                  info@garudexportsandservices.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gold-500/20 group-hover:bg-gold-500/30 text-gold-400 group-hover:text-gold-300 transition-all">
                  <Globe2 size={24} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Location</h3>
                <p className="text-slate-300">
                  102, Sadguru Krupa Sadan<br />
                  Thane, Maharashtra
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Response guarantee: Usually within 24 hours</p>
              <div className="flex items-center gap-2 text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm">Available for partnerships</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 hover:border-gold-400/50 transition-all duration-300 shadow-xl animate-in fade-in slide-in-from-right-4 duration-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-100">First Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-100">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-100">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91-XXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-100">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your requirements..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all resize-none"
                />
              </div>

              {submitState.success && (
                <div className="flex gap-3 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-100 animate-in fade-in">
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Thank you! We'll contact you soon.</span>
                </div>
              )}

              {submitState.error && (
                <div className="flex gap-3 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-100 animate-in fade-in">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{submitState.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitState.loading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
              >
                {submitState.loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
