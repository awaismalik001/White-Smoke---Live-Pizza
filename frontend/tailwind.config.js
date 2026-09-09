/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e50000',
        background: '#050505',
        card: '#111111',
        accent: '#f5a623',
        text: '#f0f0f0',
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
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Dancing Script', 'cursive'],
        bebas:   ['"Bebas Neue"', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        mont:    ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at center, #1a0000 0%, #050505 70%)',
      },
    },
  },
  plugins: [],
}