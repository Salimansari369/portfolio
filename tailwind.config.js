/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
        script: ['"Satisfy"', '"Dancing Script"', '"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        sakura: {
          50: '#fff5f8',
          100: '#ffe8f0',
          200: '#ffd0e1',
          300: '#ffa8c8',
          400: '#ff75a6',
          500: '#f54785',
        },
        skyworld: {
          50: '#f4f7ff',
          100: '#e8effe',
          200: '#d3e1fd',
          300: '#b1c9fb',
          400: '#85a7f6',
          500: '#5b82ef',
          600: '#4264e3',
        },
        lavender: {
          50: '#f8f6ff',
          100: '#f0ecfe',
          200: '#e2dbfd',
          300: '#cabdfb',
          400: '#ab95f6',
          500: '#896bee',
          600: '#724ee1',
        }
      },
      boxShadow: {
        'glass': '0 10px 35px -5px rgba(93, 107, 176, 0.12), 0 4px 16px -4px rgba(137, 107, 238, 0.07)',
        'glass-hover': '0 20px 45px -8px rgba(93, 107, 176, 0.2), 0 8px 22px -6px rgba(137, 107, 238, 0.12)',
        'pill': '0 8px 22px -4px rgba(114, 78, 225, 0.42)',
      }
    },
  },
  plugins: [],
}
