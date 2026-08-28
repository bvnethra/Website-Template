/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limestone: "#E8E4DC",
        "soft-white": "#F8F7F4",
        charcoal: "#1B1B1A",
        "arch-gray": "#77756F",
        "deep-earth": "#8A705C",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        tighter: '-0.04em',
      }
    },
  },
  plugins: [],
}
