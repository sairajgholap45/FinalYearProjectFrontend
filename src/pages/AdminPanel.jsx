import React, { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  BadgeInfo,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  FileText,
  HardDrive,
  Inbox,
  LayoutDashboard,
  Loader2,
  Mail,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react'
import { apiRequest, API_ROOT } from '../lib/api'
import { products as fallbackProducts, features as fallbackFeatures } from '../data/siteData'

const defaultCompanyProfile = {
  companyName: 'Garud Exports & Services',
  focus: [],
  supportEmail: 'info@garudexportsandservices.com',
}

const defaultSiteContent = {
  brandName: 'Garud Exports & Services',
  tagline: "Delivering India's Quality to the World",
  focusAreas: [],
  trustPoints: [
    'Premium, carefully sourced products',
    'Quality, transparency, and trust',
    'Reliable packaging and timely delivery',
  ],
  contact: {
    phone: '+91-8856851907',
    email: 'info@garudexportsandservices.com',
    address: '102, Sadguru Krupa Sadan, near Shubh Ayush School, Tal - Murbad 421401, District - Thane',
  },
  products: fallbackProducts,
  features: fallbackFeatures,
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'products', label: 'Products', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings2 },
]

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'archived', label: 'Archived' },
]

const ADMIN_SESSION_KEY = 'garud-admin-session'

const emptyProduct = {
  title: '',
  description: '',
  image: '/images/product-placeholder.svg',
}

const emptyFeature = {
  title: '',
  description: '',
}

const formatDateTime = (value) => {
  if (!value) {
    return 'Unknown'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

const statusStyles = {
  new: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'in-progress': 'bg-amber-50 text-amber-700 ring-amber-200',
  resolved: 'bg-navy-50 text-navy-700 ring-navy-200',
  archived: 'bg-slate-100 text-slate-600 ring-slate-200',
}

const splitLines = (value) =>
  String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const joinLines = (items) => (Array.isArray(items) ? items.join('\n') : '')

const downloadJson = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

function StatCard({ title, value, icon: Icon, detail }) {
  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 font-display text-3xl font-bold text-navy-950">{value}</h3>
          {detail ? <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p> : null}
        </div>
        <div className="rounded-2xl bg-gold-50 p-3 text-gold-700">
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}

function SectionCard({ title, description, children, action }) {
  return (
    <section className="rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-navy-950">{title}</h3>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">{description}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Input({ label, value, onChange, name, type = 'text', placeholder, className = '' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-navy-300 focus:ring-4 focus:ring-navy-100 ${className}`}
      />
    </label>
  )
}

function TextArea({ label, value, onChange, name, rows = 4, placeholder, className = '' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-600">{label}</span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-navy-300 focus:ring-4 focus:ring-navy-100 ${className}`}
      />
    </label>
  )
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState({
    company: false,
    site: false,
  })
  const [dbStatus, setDbStatus] = useState(null)
  const [enquiries, setEnquiries] = useState([])
  const [companyProfile, setCompanyProfile] = useState(defaultCompanyProfile)
  const [siteContent, setSiteContent] = useState(defaultSiteContent)
  const [message, setMessage] = useState('')

  const hydrateData = (sitePayload, companyPayload) => {
    setCompanyProfile({
      ...defaultCompanyProfile,
      ...(companyPayload || {}),
    })

    setSiteContent({
      ...defaultSiteContent,
      ...(sitePayload || {}),
      contact: {
        ...defaultSiteContent.contact,
        ...(sitePayload?.contact || {}),
      },
      products: Array.isArray(sitePayload?.products) ? sitePayload.products : defaultSiteContent.products,
      features: Array.isArray(sitePayload?.features) ? sitePayload.features : defaultSiteContent.features,
      trustPoints: Array.isArray(sitePayload?.trustPoints) ? sitePayload.trustPoints : defaultSiteContent.trustPoints,
    })
  }

  const loadAdminData = async () => {
    setLoading(true)
    setError('')

    try {
      const [enquiriesResponse, companyResponse, siteResponse, statusResponse] = await Promise.allSettled([
        apiRequest('/api/enquiries'),
        apiRequest('/api/company'),
        apiRequest('/api/site-content'),
        apiRequest('/api/db-status'),
      ])

      if (enquiriesResponse.status === 'fulfilled') {
        setEnquiries(enquiriesResponse.value.enquiries || [])
      } else {
        throw enquiriesResponse.reason
      }

      hydrateData(
        siteResponse.status === 'fulfilled' ? siteResponse.value : null,
        companyResponse.status === 'fulfilled' ? companyResponse.value : null,
      )

      if (statusResponse.status === 'fulfilled') {
        setDbStatus(statusResponse.value)
      } else {
        setDbStatus({
          success: false,
          status: 'degraded',
          storage: 'unknown',
          error: statusResponse.reason?.message || 'Unable to load database status',
        })
      }
    } catch (loadError) {
      setError(loadError?.message || 'Unable to load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData()
    }
  }, [isAuthenticated])

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoginError('')

    try {
      const result = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      if (result?.success) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
        setIsAuthenticated(true)
        setLoginPassword('')
      }
    } catch (loginError) {
      setLoginError(loginError?.message || 'Invalid admin credentials.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setIsAuthenticated(false)
    setLoading(true)
    setEnquiries([])
    setMessage('')
    setError('')
  }

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase()

    return enquiries.filter((enquiry) => {
      const searchable = [enquiry.name, enquiry.email, enquiry.phone, enquiry.query, enquiry.status]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return !query || searchable.includes(query)
    })
  }, [enquiries, search])

  const metrics = useMemo(() => {
    const total = enquiries.length
    const newCount = enquiries.filter((enquiry) => (enquiry.status || 'new') === 'new').length
    const activeCount = enquiries.filter((enquiry) => ['new', 'in-progress'].includes(enquiry.status || 'new')).length
    const resolvedCount = enquiries.filter((enquiry) => enquiry.status === 'resolved').length

    return {
      total,
      newCount,
      activeCount,
      resolvedCount,
      productCount: Array.isArray(siteContent.products) ? siteContent.products.length : 0,
      featureCount: Array.isArray(siteContent.features) ? siteContent.features.length : 0,
    }
  }, [enquiries, siteContent])

  const handleCompanyChange = (event) => {
    const { name, value } = event.target
    setCompanyProfile((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSiteChange = (event) => {
    const { name, value } = event.target
    setSiteContent((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setSiteContent((current) => ({
      ...current,
      contact: {
        ...current.contact,
        [name]: value,
      },
    }))
  }

  const updateListField = (field, value) => {
    setSiteContent((current) => ({
      ...current,
      [field]: splitLines(value),
    }))
  }

  const updateProductField = (index, field, value) => {
    setSiteContent((current) => ({
      ...current,
      products: current.products.map((product, productIndex) =>
        productIndex === index ? { ...product, [field]: value } : product,
      ),
    }))
  }

  const updateFeatureField = (index, field, value) => {
    setSiteContent((current) => ({
      ...current,
      features: current.features.map((feature, featureIndex) =>
        featureIndex === index ? { ...feature, [field]: value } : feature,
      ),
    }))
  }

  const addProduct = () => {
    setSiteContent((current) => ({
      ...current,
      products: [...current.products, { ...emptyProduct }],
    }))
  }

  const removeProduct = (index) => {
    setSiteContent((current) => ({
      ...current,
      products: current.products.filter((_, productIndex) => productIndex !== index),
    }))
  }

  const addFeature = () => {
    setSiteContent((current) => ({
      ...current,
      features: [...current.features, { ...emptyFeature }],
    }))
  }

  const removeFeature = (index) => {
    setSiteContent((current) => ({
      ...current,
      features: current.features.filter((_, featureIndex) => featureIndex !== index),
    }))
  }

  const handleStatusChange = async (id, status) => {
    setMessage('')

    try {
      const result = await apiRequest(`/api/enquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })

      setEnquiries((current) =>
        current.map((enquiry) => (enquiry.id === id ? result.enquiry : enquiry)),
      )
      setMessage('Enquiry status updated.')
    } catch (updateError) {
      setMessage(updateError?.message || 'Failed to update enquiry status.')
    }
  }

  const deleteEnquiry = async (id) => {
    const confirmation = window.confirm('Delete this enquiry?')
    if (!confirmation) {
      return
    }

    try {
      await apiRequest(`/api/enquiries/${id}`, { method: 'DELETE' })
      setEnquiries((current) => current.filter((enquiry) => enquiry.id !== id))
      setMessage('Enquiry deleted.')
    } catch (deleteError) {
      setMessage(deleteError?.message || 'Failed to delete enquiry.')
    }
  }

  const saveCompanyProfile = async () => {
    setSaving((current) => ({ ...current, company: true }))
    setMessage('')

    try {
      const result = await apiRequest('/api/company', {
        method: 'PUT',
        body: JSON.stringify(companyProfile),
      })

      setCompanyProfile(result.companyProfile)
      setMessage('Company profile saved.')
    } catch (saveError) {
      setMessage(saveError?.message || 'Failed to save company profile.')
    } finally {
      setSaving((current) => ({ ...current, company: false }))
    }
  }

  const saveSiteContent = async () => {
    setSaving((current) => ({ ...current, site: true }))
    setMessage('')

    try {
      const result = await apiRequest('/api/site-content', {
        method: 'PUT',
        body: JSON.stringify(siteContent),
      })

      hydrateData(result.siteContent, companyProfile)
      setMessage('Site content saved.')
    } catch (saveError) {
      setMessage(saveError?.message || 'Failed to save site content.')
    } finally {
      setSaving((current) => ({ ...current, site: false }))
    }
  }

  const saveAllContent = async () => {
    await saveCompanyProfile()
    await saveSiteContent()
  }

  const refreshData = async () => {
    await loadAdminData()
    setMessage('Admin data refreshed.')
  }

  const exportAdminData = () => {
    downloadJson('garud-admin-export.json', {
      companyProfile,
      siteContent,
      enquiries,
      dbStatus,
      exportedAt: new Date().toISOString(),
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(244,188,35,0.14),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(8,18,47,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-10">
        <div className="w-full max-w-md rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-premium backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-navy-950 p-3 text-gold-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-700">Admin Login</p>
              <h1 className="mt-1 font-display text-2xl font-bold text-navy-950">Secure access</h1>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Sign in to manage enquiries, content, and products.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Input
              label="Admin Email"
              name="adminEmail"
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              placeholder="Admin email"
              autoComplete="username"
            />
            <Input
              label="Password"
              name="adminPassword"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            {loginError ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {loginError}
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-900"
            >
              Sign In
            </button>
          </form>

        </div>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Enquiries" value={metrics.total} icon={Inbox} detail="All captured contact requests" />
        <StatCard title="New Leads" value={metrics.newCount} icon={Mail} detail="Fresh enquiries waiting for action" />
        <StatCard title="Active Leads" value={metrics.activeCount} icon={Users} detail="New and in-progress conversations" />
        <StatCard title="Resolved" value={metrics.resolvedCount} icon={CheckCircle2} detail="Closed or completed enquiries" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <SectionCard
          title="Recent Enquiries"
          description="The latest contact requests are grouped here so you can respond quickly."
          action={
            <button
              type="button"
              onClick={() => setActiveSection('enquiries')}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:border-navy-300 hover:bg-navy-50"
            >
              View all
              <ArrowRight size={16} />
            </button>
          }
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredEnquiries.slice(0, 5).length ? (
                  filteredEnquiries.slice(0, 5).map((enquiry) => (
                    <tr key={enquiry.id} className="align-top">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-navy-950">{enquiry.name}</div>
                        <div className="mt-1 line-clamp-2 text-sm text-slate-500">{enquiry.query}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        <div>{enquiry.email}</div>
                        {enquiry.phone ? <div className="mt-1">{enquiry.phone}</div> : null}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                            statusStyles[enquiry.status || 'new']
                          }`}
                        >
                          {(enquiry.status || 'new').replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">{formatDateTime(enquiry.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-8 text-sm text-slate-500" colSpan="4">
                      No enquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="System Status" description="Current storage and backend health overview.">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-50 p-2 text-emerald-700">
                  <Database size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">Database</p>
                  <p className="text-sm text-slate-500">
                    {dbStatus?.success ? dbStatus.storage : dbStatus?.status || 'Loading...'}
                  </p>
                </div>
              </div>
              {dbStatus?.error ? <p className="mt-3 text-sm text-slate-500">{dbStatus.error}</p> : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Products</p>
                <p className="mt-2 font-display text-2xl font-bold text-navy-950">{metrics.productCount}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Features</p>
                <p className="mt-2 font-display text-2xl font-bold text-navy-950">{metrics.featureCount}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-gold-200 bg-gold-50 p-4 text-sm text-gold-900">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck size={16} />
                Admin note
              </div>
              <p className="mt-2 leading-6">
                Content updates are saved to the backend and enquiry actions work with MongoDB or the local file fallback.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )

  const renderEnquiries = () => (
    <SectionCard
      title="Enquiry Manager"
      description="Search, reclassify, and manage all incoming buyer messages."
      action={
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search enquiries..."
              className="w-64 rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-navy-300 focus:ring-4 focus:ring-navy-100"
            />
          </div>
          <button
            type="button"
            onClick={refreshData}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:border-navy-300 hover:bg-navy-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <th className="px-4 py-3">Buyer</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Query</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredEnquiries.length ? (
              filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-navy-950">{enquiry.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{formatDateTime(enquiry.createdAt)}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    <div>{enquiry.email}</div>
                    <div className="mt-1">{enquiry.phone || 'No phone provided'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={enquiry.status || 'new'}
                      onChange={(event) => handleStatusChange(enquiry.id, event.target.value)}
                      className={`rounded-full border-0 px-3 py-2 text-xs font-semibold ring-1 ring-inset outline-none ${statusStyles[enquiry.status || 'new']}`}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <p className="max-w-[380px] text-sm leading-6 text-slate-600">{enquiry.query}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-navy-950 transition hover:border-navy-300 hover:bg-navy-50"
                      >
                        <Mail size={14} />
                        Reply
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteEnquiry(enquiry.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-sm text-slate-500" colSpan="5">
                  No enquiries match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )

  const renderContent = () => (
    <div className="space-y-6">
      <SectionCard
        title="Brand Content"
        description="Update the company identity, hero text, and customer-facing contact details."
        action={
          <button
            type="button"
            onClick={saveAllContent}
            className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900"
          >
            <Save size={16} />
            Save All
          </button>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Input label="Company Name" name="companyName" value={companyProfile.companyName} onChange={handleCompanyChange} />
            <Input label="Support Email" name="supportEmail" value={companyProfile.supportEmail} onChange={handleCompanyChange} type="email" />
            <TextArea
              label="Hero Tagline"
              name="tagline"
              value={siteContent.tagline}
              onChange={handleSiteChange}
              rows={3}
              placeholder="Short brand tagline..."
            />
            <TextArea
              label="Address"
              name="address"
              value={siteContent.contact?.address || ''}
              onChange={handleContactChange}
              rows={4}
            />
          </div>
          <div className="space-y-4">
            <Input label="Brand Name" name="brandName" value={siteContent.brandName} onChange={handleSiteChange} />
            <Input label="Phone" name="phone" value={siteContent.contact?.phone || ''} onChange={handleContactChange} />
            <Input label="Public Email" name="email" value={siteContent.contact?.email || ''} onChange={handleContactChange} type="email" />
            <TextArea
              label="Focus Areas"
              value={joinLines(siteContent.focusAreas)}
              onChange={(event) => updateListField('focusAreas', event.target.value)}
              rows={4}
              placeholder="One focus area per line"
            />
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Trust Points" description="These line items are used for your credibility highlights on the homepage.">
          <TextArea
            label="Trust Points"
            value={joinLines(siteContent.trustPoints)}
            onChange={(event) => updateListField('trustPoints', event.target.value)}
            rows={8}
            placeholder="One trust point per line"
          />
        </SectionCard>

        <SectionCard title="Feature Blocks" description="Edit the value propositions shown in the why-choose-us section.">
          <div className="space-y-4">
            {siteContent.features.map((feature, index) => (
              <div key={`${feature.title || 'feature'}-${index}`} className="rounded-3xl border border-slate-200 p-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr]">
                  <Input
                    label={`Feature ${index + 1} Title`}
                    value={feature.title || ''}
                    onChange={(event) => updateFeatureField(index, 'title', event.target.value)}
                  />
                  <Input
                    label={`Feature ${index + 1} Description`}
                    value={feature.description || ''}
                    onChange={(event) => updateFeatureField(index, 'description', event.target.value)}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-navy-300 hover:bg-navy-50 hover:text-navy-950"
            >
              <Plus size={16} />
              Add Feature
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  )

  const renderProducts = () => (
    <SectionCard
      title="Product Catalog"
      description="Manage the product cards shown on the homepage. Add or remove entries as your export range changes."
      action={
        <button
          type="button"
          onClick={addProduct}
          className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
        >
          <Plus size={16} />
          Add Product
        </button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {siteContent.products.map((product, index) => (
          <div key={`${product.title || 'product'}-${index}`} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-soft">
            <img
              src={product.image || '/images/product-placeholder.svg'}
              alt={product.title || 'Product preview'}
              className="h-44 w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = '/images/product-placeholder.svg'
              }}
            />
            <div className="space-y-4 p-5">
              <Input
                label="Title"
                value={product.title || ''}
                onChange={(event) => updateProductField(index, 'title', event.target.value)}
              />
              <TextArea
                label="Description"
                value={product.description || ''}
                onChange={(event) => updateProductField(index, 'description', event.target.value)}
                rows={4}
              />
              <Input
                label="Image path"
                value={product.image || ''}
                onChange={(event) => updateProductField(index, 'image', event.target.value)}
              />
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Product changes are saved through the same site content endpoint as your other homepage content.
        </p>
        <button
          type="button"
          onClick={saveSiteContent}
          disabled={saving.site}
          className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving.site ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Products
        </button>
      </div>
    </SectionCard>
  )

  const renderSettings = () => (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <SectionCard title="System Tools" description="Maintenance actions and data export tools for the admin panel.">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={refreshData}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-navy-950 transition hover:border-navy-300 hover:bg-navy-50"
          >
            <RefreshCw size={16} />
            Refresh Data
          </button>
          <button
            type="button"
            onClick={exportAdminData}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-navy-950 transition hover:border-navy-300 hover:bg-navy-50"
          >
            <Download size={16} />
            Export JSON
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-gold-50 p-2 text-gold-700">
              <HardDrive size={18} />
            </div>
            <div>
              <p className="font-semibold text-navy-950">Backend</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                API root: <span className="font-mono text-slate-700">{API_ROOT}</span>
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Database mode: {dbStatus?.success ? dbStatus.storage : dbStatus?.status || 'unknown'}
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Audit Trail" description="Quick snapshot of what the panel is currently managing.">
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-navy-50 p-2 text-navy-700">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">Brand</p>
                <p className="text-sm text-slate-500">{siteContent.brandName}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-2 text-emerald-700">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">Total Enquiries</p>
                <p className="text-sm text-slate-500">{metrics.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-50 p-2 text-amber-700">
                <CalendarDays size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">Latest Refresh</p>
                <p className="text-sm text-slate-500">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  )

  const sectionViews = {
    dashboard: renderDashboard(),
    enquiries: renderEnquiries(),
    content: renderContent(),
    products: renderProducts(),
    settings: renderSettings(),
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,188,35,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(8,18,47,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <aside className="hidden w-80 shrink-0 border-r border-white/60 bg-white/80 p-6 backdrop-blur-xl xl:block">
          <div className="rounded-[28px] border border-slate-200 bg-navy-950 p-5 text-white shadow-premium">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">Admin Console</p>
            <h1 className="mt-3 font-display text-2xl font-bold">{siteContent.brandName}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Manage enquiries, content, and product updates from one central dashboard.
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const active = activeSection === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? 'bg-navy-950 text-white shadow-premium'
                      : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-navy-950'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gold-50 p-2 text-gold-700">
                <BadgeInfo size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-950">Public Website</p>
                <p className="text-sm text-slate-500">Open site in a new tab</p>
              </div>
            </div>
            <a
              href="/"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-4 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              View Homepage
              <ExternalLink size={16} />
            </a>
          </div>
        </aside>

        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 xl:px-8 xl:py-8">
          <div className="rounded-[32px] border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="inline-flex rounded-full border border-gold-200 bg-gold-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">
                  Operations Dashboard
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-navy-950 sm:text-4xl">
                  Admin panel for enquiries, content, and products
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                  Use this console to review leads, change the homepage copy, and keep your export catalogue up to date.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={refreshData}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-navy-950 transition hover:border-navy-300 hover:bg-navy-50"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={saveAllContent}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-900"
                >
                  <Save size={16} />
                  Save Content
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 xl:hidden">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active ? 'bg-navy-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {loading ? (
              <div className="mt-8 flex min-h-[40vh] items-center justify-center rounded-[30px] border border-dashed border-slate-200">
                <div className="flex items-center gap-3 text-slate-500">
                  <Loader2 className="animate-spin" size={20} />
                  Loading admin data...
                </div>
              </div>
            ) : error ? (
              <div className="mt-8 rounded-[30px] border border-rose-200 bg-rose-50 p-6 text-rose-800">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="mt-1" />
                  <div>
                    <p className="font-semibold">Could not load admin data</p>
                    <p className="mt-2 text-sm leading-6">{error}</p>
                    <button
                      type="button"
                      onClick={refreshData}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-800 ring-1 ring-inset ring-rose-200 transition hover:bg-rose-100"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                {message ? (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    {message}
                  </div>
                ) : null}

                {sectionViews[activeSection]}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
