/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1020',
        mint: '#44d7b6',
        sky: '#56c7ff',
        flame: '#ff8f5a',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(8, 20, 42, 0.2)',
      },
    },
  },
  plugins: [],
};
