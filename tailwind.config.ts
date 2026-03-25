import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'spin-fast': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'spin-fast': 'spin-fast 0.5s linear infinite',
        'slide-up': 'slide-up 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
      },
      colors: {
        primary: {
          DEFAULT: '#1a237e', 
          light: '#4a69ff',
        },
        secondary: '#f5f6fa', 
        accent: {
          purple: '#a155ff',
          pink: '#ff55a5',
        },
        textColor: {
          primary: '#333333',
          light: '#7c8db5',
        },
        category: {
          blue: '#4a69ff',
          red: '#ff5555',
          green: '#55c57a',
          yellow: '#ffbb55',
          purple: '#a155ff',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;


