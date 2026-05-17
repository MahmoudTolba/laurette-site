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
          // Main Brand Colors
          primary: "#805441",       // Rose Brown
          secondary: "#A67563",     // Warm Nude Brown
          accent: "#C28E78",        // Rose Gold
  
          // Backgrounds & Surfaces
          background: "#F5F1ED",
          surface: "#FFF8F6",
          surfaceVariant: "#EAE0DD",
  
          // Text Colors
          text: {
            primary: "#5C4033",
            secondary: "#83746E",
            light: "#FFFFFF",
          },
  
          // Borders
          border: {
            DEFAULT: "#D5C3BC",
            soft: "#EAE0DD",
          },
  
          // Extra Luxury Tones
          nude: "#FFC4B0",
          cream: "#FCF1EE",
  
          // Optional Teal Accent
          teal: {
            DEFAULT: "#3A6566",
            light: "#76A2A2",
          }
        },
  
        fontFamily: {
          sans: ['Cairo', 'sans-serif'],
          serif: ['Noto Serif', 'serif'],
        },
  
        boxShadow: {
          luxury: "0 24px 48px -12px rgba(92, 64, 51, 0.08)",
          soft: "0 4px 30px rgba(92, 64, 51, 0.05)",
        },
  
        backgroundImage: {
          'primary-gradient':
            'linear-gradient(135deg, #C28E78 0%, #A67563 100%)',
        },
  
        borderRadius: {
          luxury: "24px",
        }
      },
    },
  
    plugins: [],
  }