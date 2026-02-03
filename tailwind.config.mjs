/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Warm coffee cafe atmosphere palette
        primary: {
          50: '#fdf8f3',
          100: '#faf0e4',
          200: '#f4ddc4',
          300: '#ecc49b',
          400: '#e2a66f',
          500: '#d4874a', // Rich coffee brown
          600: '#c16d3d',
          700: '#a15534',
          800: '#824530',
          900: '#6b3a29',
        },
        warm: {
          50: '#fefcf9',
          100: '#fdf7f0',
          200: '#faeee1',
          300: '#f6e0c7',
          400: '#f0cca3',
          500: '#e8b47d', // Warm caramel
          600: '#d89c5a',
          700: '#c4823f',
          800: '#a16b35',
          900: '#85582f',
        },
        neutral: {
          50: '#faf9f7',
          100: '#f3f1ed',
          200: '#e8e4dd',
          300: '#d6cfc4',
          400: '#b8aea0',
          500: '#9c8f7e', // Warm gray
          600: '#7d6f5e',
          700: '#675a4a',
          800: '#564c3f',
          900: '#4a4037',
        },
        accent: {
          50: '#fef7ed',
          100: '#fdedd5',
          200: '#fad7aa',
          300: '#f6bb74',
          400: '#f1943c',
          500: '#ed7516', // Warm orange accent
          600: '#de5a0c',
          700: '#b8440c',
          800: '#933612',
          900: '#762e12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#404040',
            lineHeight: '1.7',
          }
        }
      }
    },
  },
  plugins: [],
}