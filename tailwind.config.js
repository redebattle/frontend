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
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      backgroundImage: theme => ({
        'header-image': "url('/img/header.jpg')",
        'top-donator-image': "url('/img/top-donator-bg.jpg')",
        'recent-donations-image': "url('/img/last-purchases-bg.jpg')",
        'minecraft-dark': "url('/img/bg-minecraft-dark.png')"
      }),
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'Inter', 'ui-sans-serif'],
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
        twitch: '#6441a5',
        nimotv: '#6c00f3',
        booyah: '#f8a829',
        whatsapp: '#25d366',
        mercadopago: '#00AEEF',
        mercadopago2: '#243E8C',
        dark: '#121212',
        dark2: '#1b1b1b',
        dark3: '#212121',
        dark4: '#303030',
        dark5: '#424242',
        roxo: '#8b5cf6',
        colorPrimary: '#7e3af2',
        colorSecondary: '#da145a',
        colorTerciary: '#da3114',
        colorQuartenary: '#da14bd',
        otherColor: '#dd2476',
        verde: '#14DA94',
        textPrimary: '#cecece',
      }
    }
  },
  variants: {
    outline: ["focus"],
    extend: {}
  },
  corePlugins: {
   outline: false,
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('daisyui'),
    require('@themesberg/flowbite/plugin'),
  ],
  content: [
    "./node_modules/@themesberg/flowbite/**/*.js"
  ]
}
