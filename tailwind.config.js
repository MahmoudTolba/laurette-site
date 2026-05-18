/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./app.vue",
      "./components/**/*.{vue,js,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app/**/*.vue"
    ],

    theme: {
      extend: {
        colors: {
          primary: '#C28E78',
          secondary: '#A67563',
          dark: '#5C4033',
          background: '#F5F1ED',
          surface: '#FFF8F6',
          text: '#1F1B19',
          muted: '#51443F',
          outline: '#D5C3BC',
        },

        fontFamily: {
          sans: ['Cairo', 'sans-serif'],
          serif: ['Noto Serif', 'serif'],
        },

        boxShadow: {
          luxury: '0 24px 48px -12px rgba(92, 64, 51, 0.08)',
          soft: '0 4px 30px rgba(92, 64, 51, 0.05)',
        },

        backgroundImage: {
          'primary-gradient': 'linear-gradient(135deg, #C28E78 0%, #A67563 100%)',
        },

        borderRadius: {
          luxury: '24px',
        }
      },
    },

    plugins: [],
  }
