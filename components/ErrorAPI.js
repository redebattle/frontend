import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { FaArrowLeft } from 'react-icons/fa'

export default function ErrorAPI() {
  return (
    <>
      <Header />
      <title>503 - Erro na API | Rede Battle</title>
      <div className="flex items-center justify-center p-8">
        <div className="flex lg:flex-row items-center justify-center sm:flex-col p-6 w-full bg-white rounded-lg border-gray-200 shadow-md dark:bg-dark2 dark:border-b-4 dark:border-black">
          <div>
            <h1 className="text-7xl font-bold text-gray-300 text-center">
              ERRO
            </h1>
            <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight flex items-center justify-center">
              <div class="badge bg-youtube lg:text-lg sm:text-xs -mt-16 font-bold">503</div>
            </h1>
            <h1 className="text-3xl text-gray-300 font-medium text-center">
              PUTSSSS...
            </h1>
            <h1 className="text-gray-300 text-center p-2">
              Não foi possível estabelecer conexão com a API.
            </h1>
            <a href='/'>
              <motion.div className='flex justify-center items-center p-2' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button className="flex flex-row items-center justify-center bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 h-10 w-40 sm:text-sm font-medium text-white">
                  <FaArrowLeft className="mr-2  w-4 h-4 flex items-center justify-center text-center" /> Voltar ao início
                </button>
              </motion.div>
            </a>
          </div>
          <div className='flex items-center justify-center'>
            <motion.img src="/img/system-error.png" alt="logo" width="300" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
