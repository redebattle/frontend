/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaHome, FaShoppingCart, FaUserAlt, FaCookie, FaDiscord, FaBan, FaClipboard, FaUsers, FaFile, FaSignInAlt } from 'react-icons/fa'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CookieConsent, { Cookies } from 'react-cookie-consent'

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
        setplayersOnline(response?.data?.players?.online ? response?.data?.players?.online : 'Error')
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
        setdiscordOnline(response?.data?.presence_count ? response?.data?.presence_count : '0')
      })
      .catch(e => {
        setdiscordOnline(null)
        console.log('Ocorreu um erro na conexão a API getDiscordOn', e)
      })
  })

  return (
    <header className="">
      <div className="relative bg-header-image py-4 md:py-8 ">
        <div className="flex items-center align-middle justify-center tracking-tight ">
          <div className="md:block sm:hidden">
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

      <div className="flex justify-center w-full md:justify-between py-2 px-20 md:py-4 items-center bg-purple-600 border-b-4 border-purple-700 ">
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
      </div>
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
