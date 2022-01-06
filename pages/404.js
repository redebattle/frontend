/* eslint-disable prefer-const */
/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Custom404() {
  return (
    <>
      <Header />
      <title>404 - Página não encontrada | Rede Battle</title>
      <div className="flex items-center justify-between pt-10 pl-60 pr-60">
        <div>
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
          <center>
            <br />
            <Link href="/">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 h-10 w-40 sm:text-sm font-medium text-white">
                  Voltar ao início
                </button>
              </motion.div>
            </Link>
          </center>
        </div>
        <div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <motion.img src="/img/error404.png" alt="logo" width="300" />
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
