/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Montserrat', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#5865F2',
          hover: '#4752c4',
          muted: '#404eed',
        },
        dc: {
          bg: '#313338',
          surface: '#2b2d31',
          elevated: '#1e1f22',
          hover: '#393c41',
          input: '#1e1f22',
          'text-normal': '#dbdee1',
          'text-secondary': '#b5bac1',
          'text-muted': '#949ba4',
          border: '#3f4147',
          'border-subtle': '#35373c',
          success: '#23a55a',
          danger: '#da373c',
          warning: '#f0b232',
        },
      },
      borderRadius: {
        dc: '4px',
        'dc-md': '8px',
        'dc-lg': '12px',
      },
    },
  },
  plugins: [],
}
