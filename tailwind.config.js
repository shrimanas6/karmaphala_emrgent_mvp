/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        teal: {
          DEFAULT: '#005D63',
          50: '#E6F1F2',
          100: '#CCE3E5',
          200: '#99C7CB',
          300: '#66ABB1',
          400: '#338F97',
          500: '#005D63',
          600: '#004A4F',
          700: '#00373B',
          800: '#002528',
          900: '#001214'
        },
        gold: {
          DEFAULT: '#D99A22',
          50: '#FBF1DD',
          100: '#F7E2BA',
          200: '#EFCA85',
          300: '#E7B24F',
          400: '#D99A22',
          500: '#B37E17',
          600: '#8A6112',
          700: '#61440D',
          800: '#382708'
        },
        beige: {
          DEFAULT: '#FBF6EC',
          50: '#FEFCF8',
          100: '#FBF6EC',
          200: '#F5EAD1',
          300: '#EEDDB4'
        },
        softgreen: {
          DEFAULT: '#D8E8D5',
          light: '#EAF2E7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(0, 93, 99, 0.12)',
        'premium': '0 10px 40px -12px rgba(0, 93, 99, 0.18)',
        'gold': '0 8px 24px -8px rgba(217, 154, 34, 0.35)'
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.8)', opacity: 0.6 }, '100%': { transform: 'scale(2)', opacity: 0 } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.4,0,0.6,1) infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
