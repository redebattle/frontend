const colors = require('tailwindcss/colors')
module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./service/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '300px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      backgroundImage: theme => ({
        'header-image': "url('/img/header.jpg')"
      }),
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif']
      },
      colors: {
        facebook: '#3b5998',
        twitter: '#1da1f2',
        instagram: '#c32aa3',
        youtube: '#ff0000',
        discord: '#5865f2',
        whatsapp: '#25d366',
        dark: '#121212',
        dark2: '#212121',
        dark3: '#303030',
        dark4: '#424242',
        roxo: '#8b5cf6'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('daisyui')
  ]
}
