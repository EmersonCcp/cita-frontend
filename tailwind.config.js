/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#5a8d7a',
        "primary": '#033649'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}