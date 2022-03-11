import { motion } from 'framer-motion'
import Image from 'next/image'
import { Line, Bar, Area } from 'recharts'

import Chart from '../components/Chart'
import { areaTheme, barTheme } from '../utils/chartThemes'
import dadosArea from '../utils/dadosArea'
import dados from '../utils/dadosArea'
import dadosBar from '../utils/dadosBar'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const variantItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const menuItems = [
  {
    name: 'Postagens',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-newspaper h-6 w-6"
        viewBox="0 0 16 16"
      >
        <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
        <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
      </svg>
    )
  },
  {
    name: 'Equipe',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-people w-6 h-6"
        viewBox="0 0 16 16"
      >
        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    )
  },
  {
    name: 'Atualizações',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-calendar-week w-6 h-6"
        viewBox="0 0 16 16"
      >
        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
      </svg>
    )
  },
  {
    name: 'Termos de Uso',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-paperclip w-6 h-6"
        viewBox="0 0 16 16"
      >
        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
      </svg>
    )
  },
  {
    name: 'Manutenção',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-terminal w-6 h-6"
        viewBox="0 0 16 16"
      >
        <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z" />
        <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z" />
      </svg>
    )
  },
  {
    name: 'Encurtador',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-link w-6 h-6"
        viewBox="0 0 16 16"
      >
        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
      </svg>
    )
  },
  {
    name: 'Messages',
    svg: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )
  },
  {
    name: 'Messages',
    svg: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )
  },
  {
    name: 'Messages',
    svg: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )
  },
  {
    name: 'Messages',
    svg: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )
  },
  {
    name: 'Messages',
    svg: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    )
  },
  {
    name: 'Documents',
    svg: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    )
  }
]

const MenuItem = (item, active) => (
  <motion.a
    variants={variantItem}
    key={item.name}
    href="#"
    className="inline-flex items-center justify-center p-2 hover:text-gray-300 hover:bg-dark5 focus:text-gray-300 focus:bg-dark5 rounded-lg"
  >
    <span className="sr-only">{item.name}</span>
    <div className="flex flex-col items-center justify-center">
      {item.svg}
      <span className="text-2xs text-center mt-1">{item.name}</span>
    </div>
  </motion.a>
)

const Aside = () => (
  <motion.aside
    transition={{ duration: 0.2 }}
    initial={{ x: -88 }}
    animate={{ x: 0 }}
    className="hidden lg:flex lg:flex-col md:block md:w-auto"
    id="mobile-menu"
  >
    <a
      href="#"
      className="inline-flex items-center justify-center h-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500 w-full"
    >
      <Image
        src="https://redebattle.com.br/img/logo.png"
        width={50}
        height={50}
      />
    </a>
    <div className="flex-grow flex flex-col justify-between text-gray-300 bg-dark3">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col mx-4 my-6 space-y-4"
      >
        <a
          href="#"
          className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg"
        >
          <span className="sr-only">Dashboard</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-house w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fill-rule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
        </a>

        {menuItems.map(item => MenuItem(item))}
      </motion.nav>
      <div className="w-full inline-flex items-center justify-center h-20 border-t border-dark5">
        <button className="p-2 hover:text-gray-300 hover:bg-dark5 focus:text-gray-300 focus:bg-dark5 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-2xs text-center mt-1">Configurações</span>
          </div>
        </button>
      </div>
    </div>
  </motion.aside>
)

const Header = () => (
  <header className="flex items-center h-20 px-6 sm:px-10 bg-dark3">
    <button
      data-collapse-toggle="mobile-menu"
      className="sm:block lg:hidden relative flex-shrink-0 p-2 mr-2 text-gray-300 hover:bg-dark5 hover:text-gray-200 focus:bg-dark5 focus:text-gray-200 rounded-full"
      aria-controls="mobile-menu-2"
      aria-expanded="false"
    >
      <span className="sr-only">Menu</span>
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
    <div className="hidden md:block md:w-auto relative w-full max-w-md sm:-ml-2 items-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
      <input
        type="text"
        role="search"
        placeholder="Pesquisar..."
        className="py-2 pl-10 pr-4 w-full border-1 border-dark5 bg-dark2 placeholder-gray-300 focus:border-purple-500 text-gray-300 rounded-lg"
      />
    </div>
    <div className="flex flex-shrink-0 items-center ml-auto">
      <button className="inline-flex items-center p-2 hover:bg-dark5 hover:text-red-500 focus:bg-dark5 rounded-lg">
        <span className="sr-only">User Menu</span>
        <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
          <span className="font-semibold text-purple-500">Grace Simmons</span>
          <span className="text-sm text-gray-300">Lecturer</span>
        </div>
        <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user profile photo"
            className="h-full w-full object-cover"
          />
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hidden sm:block h-6 w-6 text-gray-300"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div className="border-l border-dark5 pl-3 ml-3 space-x-1">
        <button className="relative p-2 text-gray-300 hover:bg-dark5 focus:bg-dark5 focus:text-gray-300 rounded-lg">
          <span className="sr-only">Notifications</span>
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <button className="text-center relative p-2 text-gray-300 hover:bg-dark5 hover:text-red-500 focus:bg-dark5 focus:text-red-500 rounded-lg">
          <span className="sr-only">Log out</span>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
)

const Main = () => (
  <motion.main
    transition={{ duration: 0.3, delay: 0 }}
    animate={{ y: 0, opacity: 1 }}
    initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6 bg-dark2"
  >
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-newspaper w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
          </svg>
        </div>
        <div>
          <span className="block text-2xl text-purple-500 font-bold">0</span>
          <span className="block text-gray-300">Postagens</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-headset w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
          </svg>
        </div>
        <div>
          <span className="block text-2xl text-purple-500 font-bold">0</span>
          <span className="block text-gray-300">Tickets abertos</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-cart-check w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </div>
        <div>
          <span className="inline-block text-2xl text-purple-500 font-bold">
            0
          </span>
          <span className="block text-gray-300">Vendas</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-orange-600 bg-orange-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl text-purple-500 font-bold">83%</span>
          <span className="block text-gray-300">Finished homeworks</span>
        </div>
      </div>
    </section>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="flex flex-col md:col-span-2 md:row-span-2 bg-dark3 shadow rounded-lg">
        <div className="px-6 py-5 font-semibold border-b border-dark5 text-gray-300">
          The number of applied and left students per month
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center bg-dark4 justify-center h-full px-4 py-16 text-gray-300 text-sm font-bold rounded-md">
            <Chart type="area" data={dadosArea}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F77737" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F77737" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area dataKey="Abertos" fill="url(#colorPv)" {...areaTheme} />
              <Area dataKey="Fechados" fill="url(#colorUv)" {...areaTheme} />
            </Chart>
          </div>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              fill="#fff"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold text-purple-500">25</span>
          <span className="block text-gray-300">Lections left</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold text-purple-500">139</span>
          <span className="block text-gray-300">Hours spent on lections</span>
        </div>
      </div>
      <div className="row-span-3 bg-dark3 shadow rounded-lg">
        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-dark5">
          <span className="text-gray-300">Students by average mark</span>
          <button
            type="button"
            className="inline-flex justify-center rounded-md px-1 -mr-1 bg-dark2 border border-dark5 text-sm leading-5 font-medium text-gray-300 hover:text-gray-400"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Descending
            <svg
              className="-mr-1 ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
          <ul className="p-6 space-y-6">
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/82.jpg"
                  alt="Annette Watson profile picture"
                />
              </div>
              <span className="text-gray-300">Annette Watson</span>
              <span className="ml-auto font-semibold text-purple-500">9.3</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/81.jpg"
                  alt="Calvin Steward profile picture"
                />
              </div>
              <span className="text-gray-300">Calvin Steward</span>
              <span className="ml-auto font-semibold text-purple-500">8.9</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/80.jpg"
                  alt="Ralph Richards profile picture"
                />
              </div>
              <span className="text-gray-300">Ralph Richards</span>
              <span className="ml-auto font-semibold text-purple-500">8.7</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/79.jpg"
                  alt="Bernard Murphy profile picture"
                />
              </div>
              <span className="text-gray-300">Bernard Murphy</span>
              <span className="ml-auto font-semibold text-purple-500">8.2</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/78.jpg"
                  alt="Arlene Robertson profile picture"
                />
              </div>
              <span className="text-gray-300">Arlene Robertson</span>
              <span className="ml-auto font-semibold text-purple-500">8.2</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/77.jpg"
                  alt="Jane Lane profile picture"
                />
              </div>
              <span className="text-gray-300">Jane Lane</span>
              <span className="ml-auto font-semibold text-purple-500">8.1</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/76.jpg"
                  alt="Pat Mckinney profile picture"
                />
              </div>
              <span className="text-gray-300">Pat Mckinney</span>
              <span className="ml-auto font-semibold text-purple-500">7.9</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Norman Walters profile picture"
                />
              </div>
              <span className="text-gray-300">Norman Walters</span>
              <span className="ml-auto font-semibold text-purple-500">7.7</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col row-span-3 bg-dark3 shadow rounded-lg">
        <div className="px-6 py-5 font-semibold border-b border-dark5 text-gray-300">
          Students by type of studying
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-center h-full px-4 py-24 text-gray-200 text-sm font-bold bg-dark4 rounded-lg">
            <Chart type="bar" data={dadosBar}>
              <Bar {...barTheme} fill="#833AB4" dataKey="VIP" />
              <Bar {...barTheme} fill="#F56040" dataKey="Cash" />
              <Bar {...barTheme} fill="#25d366" dataKey="Outros" />
            </Chart>
          </div>
        </div>
      </div>
    </section>

    <section className="text-center font-bold text-gray-500">
      <p className="bg-dark rounded-lg bg-opacity-30">
        © Rede Battle <br />
        Development by Filipe Moreno
      </p>
    </section>
  </motion.main>
)

function Layout() {
  return (
    <div className="flex bg-dark2 min-h-screen">
      <Aside></Aside>

      <div className="flex-grow text-gray-800">
        <Header></Header>
        <Main></Main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <title>Painel | Rede Battle</title>
      <Layout></Layout>
    </>
  )
}
