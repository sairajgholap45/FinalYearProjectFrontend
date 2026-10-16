import React, { useState } from 'react'
import { X } from 'lucide-react'

const loginDefaults = {
  email: '',
  password: '',
}

const registerDefaults = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function AuthModal({ open, mode, onClose, onModeChange, onLogin, onRegister, loading }) {
  const [loginForm, setLoginForm] = useState(loginDefaults)
  const [registerForm, setRegisterForm] = useState(registerDefaults)
  const [error, setError] = useState('')

  if (!open) {
    return null
  }

  const updateLoginField = (field, value) => {
    setLoginForm((current) => ({ ...current, [field]: value }))
  }

  const updateRegisterField = (field, value) => {
    setRegisterForm((current) => ({ ...current, [field]: value }))
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const result = await onLogin(loginForm)

    if (!result.success) {
      setError(result.error)
      return
    }

    setLoginForm(loginDefaults)
    setError('')
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const result = await onRegister(registerForm)

    if (!result.success) {
      setError(result.error)
      return
    }

    setRegisterForm(registerDefaults)
    setError('')
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/55 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-navy-950/20">
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-slate-800 px-6 py-5 text-white">
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex rounded-full border border-white/20 p-2 text-white/90 transition hover:bg-white/10"
            onClick={onClose}
            aria-label="Close authentication dialog"
          >
            <X size={18} />
          </button>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-300">Welcome</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-slate-200">
            {mode === 'login'
              ? 'Access your account and continue your export enquiries.'
              : 'Register once and keep your details ready for future enquiries.'}
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6 grid grid-cols-2 rounded-full bg-slate-100 p-1">
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === 'login' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-500'
              }`}
              onClick={() => {
                setError('')
                onModeChange('login')
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === 'register' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-500'
              }`}
              onClick={() => {
                setError('')
                onModeChange('register')
              }}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(event) => updateLoginField('email', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => updateLoginField('password', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  placeholder="Enter your password"
                />
              </label>

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(event) => updateRegisterField('name', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(event) => updateRegisterField('email', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(event) => updateRegisterField('password', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  placeholder="Minimum 6 characters"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</span>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(event) => updateRegisterField('confirmPassword', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                  placeholder="Repeat your password"
                />
              </label>

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
