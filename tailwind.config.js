/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      neutral: '#f2eada',
      'neutral-dark': '#0d1014',
      primary: '#4169e1',
      'primary-dark': '#e66322',
    },
    extend: {
      animation: {
        updown: 'updown 2s ease-in-out infinite',
        'leftright-full': 'leftright-full 7s infinite',
      },
      keyframes: {
        updown: {
          '0%, 100%': { transform: 'translateY(-0.5rem)' },
          '50%': { transform: 'translateY(0.5rem)' },
        },
        'leftright-full': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
