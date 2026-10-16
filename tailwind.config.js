/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd1ff',
          300: '#8fb0ff',
          400: '#5d84ff',
          500: '#325bff',
          600: '#183ddf',
          700: '#122fb4',
          800: '#122a87',
          900: '#0f1f5f',
          950: '#08122f',
        },
        gold: {
          50: '#fff9eb',
          100: '#fff0c6',
          200: '#ffe18a',
          300: '#ffd458',
          400: '#f4bc23',
          500: '#d79d12',
          600: '#b57d0c',
          700: '#925f0d',
          800: '#784c12',
          900: '#643f14',
        },
      },
      fontFamily: {
        display: ['"Montserrat"', 'sans-serif'],
        body: ['"Instrument Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(8, 18, 47, 0.08)',
        premium: '0 28px 90px rgba(8, 18, 47, 0.16)',
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(120deg, rgba(8,18,47,0.92) 0%, rgba(8,18,47,0.78) 48%, rgba(8,18,47,0.52) 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(244, 188, 35, 0.0)' },
          '50%': { boxShadow: '0 20px 45px rgba(244, 188, 35, 0.18)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
