/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red':    '#e50000',
        'brand-red2':   '#ff2200',
        'brand-gold':   '#f5a623',
        'brand-dark':   '#050505',
        'brand-darker': '#0d0d0d',
        'brand-card':   '#111111',
        'brand-border': '#1e1e1e',
        'brand-white':  '#f0f0f0',
      },
      fontFamily: {
        bebas:   ['"Bebas Neue"', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        mont:    ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float':     'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-rev':  'spin 15s linear infinite reverse',
        'pulse-red': 'pulseRed 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%':      { transform: 'translateY(-20px) rotate(3deg)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(229,0,0,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(229,0,0,0.8)' },
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at center, #1a0000 0%, #050505 70%)',
      }
    },
  },
  plugins: [],
}
