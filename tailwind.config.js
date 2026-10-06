/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        control: {
          bg: '#0a0d14',
          panel: '#111726',
          card: '#161f36',
          border: '#233052',
          borderSubtle: '#1b2540',
          accent: '#3b82f6',
          accentGlow: 'rgba(59, 130, 246, 0.25)',
        },
        semantic: {
          success: '#10b981',
          failure: '#ef4444',
          amber: '#f59e0b',
          sky: '#0284c7',
          purple: '#a855f7',
          slate: '#64748b',
          cyan: '#06b6d4',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
