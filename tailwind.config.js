/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Primárias Futuristas
        primary: {
          blue: '#0066FF',
          purple: '#6366F1',
          cyan: '#06B6D4',
        },
        // Backgrounds Dark Mode
        bg: {
          primary: '#0A0A0F',
          secondary: '#0F172A',
          tertiary: '#1E293B',
          card: 'rgba(15, 23, 42, 0.8)',
        },
        // Glassmorphism
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        // Efeitos Neon
        neon: {
          blue: '#00D4FF',
          purple: '#8B5CF6',
          green: '#10B981',
          red: '#EF4444',
          yellow: '#F59E0B',
        },
        // Textos
        text: {
          primary: '#FFFFFF',
          secondary: '#E2E8F0',
          muted: '#94A3B8',
          disabled: '#64748B',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0066FF 0%, #6366F1 50%, #06B6D4 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        'gradient-header': 'linear-gradient(90deg, rgba(10, 10, 15, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 102, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), inset 0 0 20px rgba(139, 92, 246, 0.1)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.1)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'neon-pulse': {
          'from': { 
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1)' 
          },
          'to': { 
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.8), inset 0 0 30px rgba(0, 212, 255, 0.2)' 
          },
        },
        'fadeIn': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
      },
    },
  },
  plugins: [],
}
