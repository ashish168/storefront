/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page:   '#FDFCFA',
        ink:    '#1A1F1C',
        body:   '#4A524D',
        mute:   '#858C87',
        line:   '#E3E2DD',
        bottle: '#15372B',   // structural green — chrome, not accent
        moss:   '#2D5A46',
        signal: '#C2410C',   // used only for stock + price urgency
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { shell: '82rem' },
    },
  },
  plugins: [],
}
