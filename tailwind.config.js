/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
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
          950: '#020617',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      gridTemplateColumns: {
        '52': 'repeat(52, minmax(0, 1fr))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin for theme-aware utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.glass-effect': {
          'background': 'rgba(30, 41, 59, 0.8)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-effect-light': {
          'background': 'rgba(248, 250, 252, 0.8)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(0, 0, 0, 0.1)',
        },
        '.gradient-text': {
          'background': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-shadow': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
        '.button-primary': {
          'background': 'linear-gradient(135deg, #3b82f6, #2563eb)',
          'color': '#ffffff',
          'padding': '0.75rem 1.5rem',
          'border-radius': '0.5rem',
          'font-weight': '600',
          'transition': 'all 0.3s ease',
          'box-shadow': '0 4px 14px rgba(59, 130, 246, 0.3)',
        },
        '.button-secondary': {
          'background': 'transparent',
          'color': '#3b82f6',
          'padding': '0.75rem 1.5rem',
          'border': '2px solid #3b82f6',
          'border-radius': '0.5rem',
          'font-weight': '600',
          'transition': 'all 0.3s ease',
        },
        '.section-padding': {
          'padding': '6rem 0',
        },
        '.container-custom': {
          'max-width': '1200px',
          'margin': '0 auto',
          'padding': '0 1rem',
        },
      };
      addUtilities(newUtilities);
    }
  ],
} 