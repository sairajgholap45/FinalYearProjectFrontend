import {
  Award,
  Boxes,
  CheckCircle2,
  Globe2,
  Leaf,
  Mail,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Quick Enquiry', href: '#enquiry' },
]

export const trustPoints = [
  'Premium, carefully sourced products',
  'Quality, transparency, and trust',
  'Reliable packaging and timely delivery',
]

export const stats = [
  { value: '09', label: 'Export Categories', icon: Boxes },
  { value: '100%', label: 'Verified Sourcing', icon: ShieldCheck },
  { value: '24/7', label: 'Buyer Support', icon: Mail },
  { value: 'Worldwide', label: 'Trade Reach', icon: Globe2 },
]

export const products = [
  {
    title: 'Fruits & Vegetables',
    description: 'Farm-fresh produce carefully sourced and packed to maintain natural freshness and quality.',
    image: '/images/fruits-vegetables-photo.png',
  },
  {
    title: 'Grocery Products',
    description: 'Essential Indian grocery items hygienically processed for consistent quality, safety, and shelf life.',
    image: '/images/grocery-photo.png',
  },
  {
    title: 'Indian Spices',
    description: 'Authentic Indian spices offering rich aroma, natural color, and bold flavor profiles.',
    image: '/images/spices-photo.png',
  },
  {
    title: 'Dry Fruits & Nuts',
    description: 'Premium dry fruits and nuts selected for freshness, taste, nutrition, and purity.',
    image: '/images/dry-fruits-photo.png',
  },
  {
    title: 'Namkeen & Traditional Snacks',
    description: 'Traditional Indian snacks prepared hygienically to preserve authentic taste and crunch.',
    image: '/images/namkeen-photo.png',
  },
  {
    title: 'Handicrafts',
    description: 'Authentic handcrafted products reflecting India\'s rich cultural heritage, made by skilled artisans using traditional techniques.',
    image: '/images/handicrafts-photo.png',
  },
  {
    title: 'Imitation Jewellery',
    description: 'Stylish and elegant imitation jewellery designed to match global fashion trends while maintaining superior finish and durability.',
    image: '/images/jewellery-photo.png',
  },
  {
    title: 'Copper Articles',
    description: 'High-quality copper products crafted with precision, suitable for daily use, gifting, and decorative purposes.',
    image: '/images/copper-articles-photo.png',
  },
  {
    title: 'Furniture & Home Decor',
    description: 'Beautifully designed furniture and home decor items that combine craftsmanship, functionality, and timeless aesthetics.',
    image: '/images/furniture-photo.png',
  },
]

export const features = [
  {
    title: 'Uncompromising Quality Standards',
    icon: Sparkles,
    description: 'Strict quality control at every stage from sourcing and handling to packaging and dispatch.',
  },
  {
    title: 'Premium & Verified Products',
    icon: CheckCircle2,
    description: 'Carefully sourced food products and lifestyle goods from verified farmers, artisans, and manufacturers.',
  },
  {
    title: 'Reliable Global Supply Network',
    icon: Truck,
    description: 'Consistent supply and timely delivery to international markets through dependable logistics.',
  },
  {
    title: 'Customer-Centric Approach',
    icon: Boxes,
    description: 'Clear communication and customized solutions tailored to buyer requirements.',
  },
  {
    title: 'Ethical & Responsible Trade',
    icon: Leaf,
    description: 'We value fair trade, responsible sourcing, and long-term business conduct.',
  },
  {
    title: 'Transparent Business Operations',
    icon: Globe2,
    description: 'Honest communication, clear documentation, and traceable processes for smooth trade.',
  },
  {
    title: 'Industry Experience & Commitment',
    icon: Award,
    description: 'Export knowledge and a commitment to excellence that support lasting partnerships.',
  },
]

export const footerProducts = [
  'Fruits & Vegetables',
  'Grocery Products',
  'Indian Spices',
  'Dry Fruits & Nuts',
  'Namkeen & Traditional Snacks',
  'Handicrafts',
  'Imitation Jewellery',
  'Copper Articles',
  'Furniture & Home Decor',
]
