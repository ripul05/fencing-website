/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        silver: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9' }],
        'display': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards', // ✅ Added
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0px)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0px)' },
        },
        fadeInUp: { // ✅ New animation
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animationDelay: {
        '0': '0ms',
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1400': '1400ms',
        '1600': '1600ms',
        '1800': '1800ms',
        '2000': '2000ms',
        '2200': '2200ms',
        '2400': '2400ms',
        '2600': '2600ms',
        '2800': '2800ms',
        '3000': '3000ms',
        '3200': '3200ms',
        '3400': '3400ms',
        '3600': '3600ms',
        '3800': '3800ms',
        '4000': '4000ms',
        '4200': '4200ms',
        '4400': '4400ms',
        '4600': '4600ms',
        '4800': '4800ms',
        '5000': '5000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'fencing-pattern': 'linear-gradient(45deg, transparent 48%, rgba(251, 191, 36, 0.1) 49%, rgba(251, 191, 36, 0.1) 51%, transparent 52%)',
      },
      boxShadow: {
        'elegant': '0 20px 60px -12px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(251, 191, 36, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.will-change-transform-opacity': { 'will-change': 'transform, opacity' },
        '.will-change-transform': { 'will-change': 'transform' },
        '.will-change-auto': { 'will-change': 'auto' },
        '.no-animations *': { 'animation': 'none !important', 'transition': 'none !important' },
        '.contain-layout-paint': { 'contain': 'layout paint' },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};
