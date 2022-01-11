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
        'header-image': "url('/img/header.jpg')",
        'top-donator-image': "url('/img/top-donator-bg.jpg')",
        'recent-donations-image': "url('/img/last-purchases-bg.jpg')",
        'minecraft-dark': "url('/img/bg-minecraft-dark.png')"
      }),
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif']
      },
      colors: {
        facebook: '#1877F2',
        twitter: '#1da1f2',
        instagram: '#E1306C',
        instagram_grad_1: '#405DE6',
        instagram_grad_2: '#5851D8',
        instagram_grad_3: '#833AB4',
        instagram_grad_4: '#C13584',
        instagram_grad_5: '#E1306C',
        instagram_grad_6: '#FD1D1D',
        instagram_grad_7: '#F56040',
        instagram_grad_8: '#F77737',
        instagram_grad_9: '#FCAF45',
        instagram_grad_10: '#FFDC80',
        instagram_grad_11: '#FFFFFF',
        youtube: '#ff0000',
        discord: '#404EED',
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
