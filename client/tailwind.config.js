/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Pacifico"', 'cursive'],
      }
    },
    center: true,
  },
  plugins: [{
    tailwindcss: {},
    autoprefixer: {},
  }],
}

