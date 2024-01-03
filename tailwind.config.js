/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF3E0",
        primary: '#AEDFF7',
        secondary: '#FD8150',
        accent: '#2ECC71',
        grey: "#A4A4A4",
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#4caf50',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'anime-ace': ['Anime Ace', 'cursive'],
      },
      boxShadow: {
        'custom': '4px 4px 0 0 rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
