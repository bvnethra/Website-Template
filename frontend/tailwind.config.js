/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../templates/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        warmIvory: '#ECEBE6',
        charcoal: '#1F1F1F',
        mutedSlate: '#666666',
        accentGreen: '#25D366',
        brand: '#6366f1',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
