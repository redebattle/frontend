import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CookieConsent, { Cookies } from 'react-cookie-consent'
import Link from 'next/link'

import { FaHome, FaShoppingCart, FaDiscord, FaBan, FaUsers, FaFile, FaSignInAlt, FaShoppingBasket} from 'react-icons/fa'

import api from '../service/api'

export default function Header({ online }) {
  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = 'jogar.redebattle.com.br'
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    alert('Copiado!')
  }

  const [playersOnline, setplayersOnline] = useState(null)
  const [discordOnline, setdiscordOnline] = useState(null)

  useEffect(() => {
    api
      .get('/api/server')
      .then(response => {
        setplayersOnline(response?.data?.players?.online ? response?.data?.players?.online : '-/-')
      })
      .catch(e => {
        setplayersOnline(null)
        console.log('Ocorreu um erro na conexão a API getOnlinePlayers', e)
      })
  })

  useEffect(() => {
    api
      .get('/api/discord')
      .then(response => {
        setdiscordOnline(response?.data?.presence_count ? response?.data?.presence_count : '-/-')
      })
      .catch(e => {
        setdiscordOnline(null)
        console.log('Ocorreu um erro na conexão a API getDiscordOn', e)
      })
  })

  return (
    <header>
      <div className="relative bg-header-image py-4 md:py-8 ">
        <div className="flex items-center align-middle justify-center tracking-tight ">
          <div className="lg:block md:hidden sm:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyToClipboard}
            >
              <h1 className="text-white font-semibold text-4xl text-left">
                {Intl.NumberFormat('pt-BR').format(playersOnline) || (
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
                {Intl.NumberFormat('pt-BR').format(discordOnline) || (
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

      {/* <div className="flex justify-center w-full md:justify-between py-2 px-20 md:py-4 items-center bg-purple-600 border-b-4 border-purple-700 sm:hidden">
        <nav className="space-x-8 text-1xl text-white font-semibold ">
          <Link href="/">
            <a className=" hover:text-purple-300 inline-flex items-center tracking-tight">
              <FaHome /> <div className="pl-1">INÍCIO</div>
            </a>
          </Link>
          <Link href="/loja">
            <a className="tracking-wide hover:text-purple-300 inline-flex items-center">
              <FaShoppingCart /> <div className="pl-1">LOJA</div>
            </a>
          </Link>
          <Link href="/discord">
            <a className="tracking-wide hover:text-purple-300 inline-flex items-center">
              <FaDiscord /> <div className="pl-1">DISCORD</div>
            </a>
          </Link>
          <Link href="/equipe">
            <a className="tracking-wide hover:text-purple-300 inline-flex items-center">
              <FaUsers /> <div className="pl-1">EQUIPE</div>
            </a>
          </Link>
          <Link href="/punicoes">
            <a className="tracking-wide hover:text-purple-300 inline-flex items-center">
              <FaBan /> <div className="pl-1">PUNIÇÕES</div>
            </a>
          </Link>
          <Link href="/changelog">
            <a className="tracking-wide hover:text-purple-300 inline-flex items-center">
              <FaFile /> <div className="pl-1">CHANGELOG</div>
            </a>
          </Link>
        </nav>
        <nav className="space-x-8 text-1xl text-white font-semibold">
          <Link href="/conta">
            <a className="tracking-wide hover:text-purple-300 inline-flex items-center">
              <FaSignInAlt /> <div className="pl-1">LOGAR</div>
            </a>
          </Link>
        </nav>
      </div> */}
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b-lg dark:bg-purple-600 dark:border-b-4 dark:border-purple-700">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          {/* <a href="#" class="flex">
            <img class="w-10 h-auto p-1 mr-2" src="/img/logos/rounded-color.png" alt="Logo Battle!" />
              <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Battle!</span>
          </a> */}
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-purple-700 dark:focus:ring-purple-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Abrir menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black" aria-current="page"><div className="flex flex-row items-center"><FaHome className='mr-1' />INÍCIO</div></a>
                </Link>
              </li>
              <li>
                <Link href="/loja">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaShoppingBasket className='mr-1' />LOJA</div></a>
                </Link>
              </li>
              <li>
                <Link href="/discord">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaDiscord className='mr-1' />DISCORD</div></a>
                </Link>
              </li>
              <li>
                <Link href="/equipe">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaUsers className='mr-1' />EQUIPE</div></a>
                </Link>
              </li>
              <li>
                <Link href="/punicoes">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaBan className='mr-1' />PUNIÇÕES</div></a>
                </Link>
              </li>
              <li>
                <Link href="/changelog">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaFile className='mr-1' />CHANGELOG</div></a>
                </Link>
              </li>
              <li>
                <Link href="/loja/carrinho">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaShoppingCart className='mr-1' />CARRINHO</div></a>
                </Link>
              </li>
              <li>
                <Link href="/conta">
                  <a className="block py-2 pr-4 pl-3 text-white font-bold rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-gray-300 md:dark:hover:text-white md:dark:hover:bg-black md:dark:hover:bg-opacity-20 md:p-1 md:dark:hover:p-1 dark:hover:text-purple-500 dark:hover:bg-black dark:hover:bg-opacity-40 dark:hover:text-white dark:border-black"><div className="flex flex-row items-center"><FaSignInAlt className='mr-1' />ENTRAR</div></a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <CookieConsent
        location="bottom"
        buttonText="Entendi"
        cookieName="accept-cookies"
        style={{ background: '#313131' }}
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
