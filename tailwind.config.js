/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'white' : "#fff",
        'boldColor': '#0f172a',
        'regularColor': '#64748b',
        'borderColor': "#e2e8f0",
        'skeleton' : "#cbd5e1"
      },
    },
  },
  plugins: [],
}

