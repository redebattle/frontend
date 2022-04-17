/* eslint-disable prefer-const */
/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Router from 'next/router'
import Link from 'next/link'

import { BsArrowReturnLeft } from 'react-icons/bs'

import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Custom404() {
  function handleReturnButton() {
    Router.back()
  }

  return (
    <>
      <Header />
      <title>404 - Página não encontrada | Rede Battle</title>
      <div className="flex items-center justify-center p-8">
        <div className="p-6 max-w-3xl bg-white rounded-lg border-gray-200 shadow-md dark:bg-dark2 dark:border-b-4 dark:border-black">
          <h1 className="text-9xl font-bold text-gray-300 text-center">404</h1>
          <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight flex items-center justify-center">
            <div className="badge bg-youtube lg:text-lg sm:text-xs -mt-32 font-bold">
              ERRO
            </div>
          </h1>
          <h1 className="text-3xl text-gray-300 font-medium text-center">
            Página não encontrada
          </h1>
          <h1 className="text-gray-300 text-center p-2">
            A página que você procura não existe ou não está disponível no
            momento.
          </h1>
          <a onClick={() => Router.back()}>
            <motion.div
              className="flex justify-center items-center p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button className="flex flex-row items-center justify-center bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 h-10 w-40 sm:text-sm font-medium text-white">
                <BsArrowReturnLeft className="mr-1 flex items-center" />
                Voltar
              </button>
            </motion.div>
          </a>
        </div>

        {/* <div className='sm:flex sm:flex-col w-a'>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <h1 className="text-9xl font-bold text-gray-300 text-center">
              404
            </h1>
          </motion.div>
          <h1 className="text-3xl text-gray-300 font-medium text-center">
            Página não encontrada
          </h1>
          <h1 className="text-gray-300 text-center">
            A página que você procura não existe ou não está disponível no
            momento.
          </h1>
          <div className='flex items-center justify-center mt-4'>
            <br />
            <Link href="/">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 h-10 w-40 sm:text-sm font-medium text-white">
                  Voltar ao início
                </button>
              </motion.div>
            </Link>
          </div>
        </div> */}
        {/* <div className=''>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <motion.img src="/img/error404.png" alt="logo" width="300" />
          </motion.div>
        </div> */}
      </div>
      <Footer />
    </>
  )
}
