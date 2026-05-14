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
          primary: "#805441",
          secondary: "#D3C2B4",
        },
  
        fontFamily: {
          sans: ['Cairo', 'sans-serif'],
        }
      },
    },
  
    plugins: [],
  }