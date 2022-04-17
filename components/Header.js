import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CookieConsent, { Cookies } from 'react-cookie-consent'
import Link from 'next/link'

import {
  FaHome,
  FaShoppingCart,
  FaDiscord,
  FaBan,
  FaUsers,
  FaFile,
  FaSignInAlt,
  FaShoppingBasket,
  FaUserAlt
} from 'react-icons/fa'

import { IoIosNotifications } from 'react-icons/io'

import api from '../service/api'
import { parseCookies } from 'nookies'
import Swal from 'sweetalert2'
import { AuthContext } from '../contexts/AuthContext'
import Router from 'next/router'

export default function Header(context, { online }) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    showConfirmButton: false,
    timer: 4500,
    timerProgressBar: true
  })
  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = 'jogar.redebattle.com.br'
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    Toast.fire({
      icon: 'success',
      background: '#49872a',
      color: 'white',
      title: 'O IP foi copiado!'
    })
  }

  const [playersOnline, setplayersOnline] = useState(null)
  const [discordOnline, setdiscordOnline] = useState(null)
  const { user, isAuthenticated } = useContext(AuthContext)

  const [itemsCart, setItemsCart] = useState(0)

  useEffect(() => {
    api
      .get('/api/server')
      .then(response => {
        setplayersOnline(
          response?.data?.players?.online
            ? response?.data?.players?.online
            : '-/-'
        )
      })
      .catch(e => {
        setplayersOnline('-/-')
        console.log('Ocorreu um erro na conexão a API getOnlinePlayers', e)
      })
  })

  useEffect(() => {
    api
      .get('/api/discord')
      .then(response => {
        setdiscordOnline(
          response?.data?.presence_count
            ? response?.data?.presence_count
            : '-/-'
        )
      })
      .catch(e => {
        setdiscordOnline('-/-')
        console.log('Ocorreu um erro na conexão a API getDiscordOn', e)
      })
  })

  return (
    <header>
      {isAuthenticated && (
        <div className="bg-dark2 w-full h-6 flex items-center">
          {user.is_administrator && (
            <a
              onClick={() => Router.push('/admin')}
              className="text-gray-500 text-sm mx-4 cursor-pointer hover:text-purple-500"
            >
              Painel de administração
            </a>
          )}
        </div>
      )}
      <div className="relative bg-header-image py-4 md:py-8 ">
        <div className="flex items-center align-middle justify-center tracking-tight ">
          <div className="lg:block md:hidden sm:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyToClipboard}
            >
              <h1 className="text-white font-semibold text-4xl text-left">
                {(playersOnline === '-/-' && (
                  <SkeletonTheme
                    color="rgba(33, 33, 33, 0.2)"
                    highlightColor="rgba(255, 255, 255, 0.3)"
                  >
                    <p>-/-</p>
                  </SkeletonTheme>
                )) ||
                  Intl.NumberFormat('pt-BR').format(playersOnline) || (
                    <SkeletonTheme
                      color="rgba(33, 33, 33, 0.2)"
                      highlightColor="rgba(255, 255, 255, 0.3)"
                    >
                      <p>
                        <Skeleton count={1} />
                      </p>
                    </SkeletonTheme>
                  )}
              </h1>
              <h1 className="text-white font-medium">jogadores Online</h1>
            </motion.button>
          </div>
          <div className="px-36 sm:h-auto sm:w-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                src="/img/logo.png"
                alt="logo"
                className="w-44 h-26"
              />
            </motion.div>
          </div>
          <div className="md:block sm:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <h1 className="text-white font-semibold text-4xl text-left">
                {(discordOnline === '-/-' && (
                  <SkeletonTheme
                    color="rgba(33, 33, 33, 0.2)"
                    highlightColor="rgba(255, 255, 255, 0.3)"
                  >
                    <p>-/-</p>
                  </SkeletonTheme>
                )) ||
                  Intl.NumberFormat('pt-BR').format(discordOnline) || (
                    <SkeletonTheme
                      color="rgba(33, 33, 33, 0.2)"
                      highlightColor="rgba(255, 255, 255, 0.3)"
                    >
                      <p>
                        <Skeleton count={1} />
                      </p>
                    </SkeletonTheme>
                  )}
              </h1>
              <h1 className="text-white font-medium">onlines no Discord!</h1>
            </motion.button>
          </div>
        </div>
      </div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b-lg dark:bg-purple-600 dark:border-b-4 dark:border-purple-700">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          {/* <a href="#" class="flex">
            <img class="w-10 h-auto p-1 mr-2" src="/img/logos/rounded-color.png" alt="Logo Battle!" />
              <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Battle!</span>
          </a> */}
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-purple-700 dark:focus:ring-purple-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/">
                  <a
                    className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800  dark:border-black"
                    aria-current="page"
                  >
                    <div className="flex flex-row items-center">
                      <FaHome className="mr-1" />
                      INÍCIO
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/loja">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-purple-800 focus:bg-purple-800 dark:border-black">
                    <div className="flex flex-row items-center">
                      <FaShoppingBasket className="mr-1" />
                      LOJA
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/discord">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 dark:hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                    <div className="flex flex-row items-center">
                      <FaDiscord className="mr-1" />
                      DISCORD
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/equipe">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                    <div className="flex flex-row items-center">
                      <FaUsers className="mr-1" />
                      EQUIPE
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/punicoes">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                    <div className="flex flex-row items-center">
                      <FaBan className="mr-1" />
                      PUNIÇÕES
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/changelog">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                    <div className="flex flex-row items-center">
                      <FaFile className="mr-1" />
                      CHANGELOG
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/loja/carrinho">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                    <div className="flex flex-row items-center">
                      <FaShoppingCart className="mr-1" />
                      CARRINHO ({itemsCart})
                    </div>
                  </a>
                </Link>
              </li>
              {(!isAuthenticated && (
                <li>
                  <Link href="/conta">
                    <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                      <div className="flex flex-row items-center">
                        <FaSignInAlt className="mr-1" />
                        ENTRAR
                      </div>
                    </a>
                  </Link>
                </li>
              )) || (
                <li>
                  <Link href="/conta">
                    <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-purple-800 focus:bg-purple-800 md:p-2 md:dark:hover:p-2 dark:hover:text-purple-500 hover:bg-purple-800 focus:bg-purple-800 dark:hover:text-white dark:border-black">
                      <div className="flex flex-row items-center">
                        <FaUserAlt className="mr-1" />
                        SUA CONTA
                      </div>
                    </a>
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <div className="dropdown">
                    <label>
                      <button className="relative p-2 text-gray-300 hover:bg-purple-800 focus:bg-purple-800 focus:text-gray-300 rounded-lg">
                        <span className="sr-only">Notificações</span>
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
                    </label>
                    <div
                      tabindex="0"
                      className="dropdown-content card card-compact w-64 p-2 shadow bg-dark3 text-primary-content"
                    >
                      <div className="card-body">
                        <h3 className="card-title">😁</h3>
                        <p>Você não tem novas notificações.</p>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <CookieConsent
        location="bottom"
        buttonText="Entendi"
        cookieName="accept-cookies"
        style={{ background: '#1b1b1b' }}
        buttonStyle={{ background: '#7c3aed', color: '#FFF', fontSize: '14px' }}
        expires={150}
      >
        <div className="flex flex-row items-center">
          Nosso site utiliza cookies para garantir que você tenha a melhor
          experiência. Se quiser saber mais, basta acessar nossa
          <a className="ml-1 text-purple-400" href="/privacidade">
            Política de Privacidade
          </a>
          .
        </div>
      </CookieConsent>
    </header>
  )
}
