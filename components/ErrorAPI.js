import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function ErrorAPI() {
  return (
    <>
      <Header />
      <title>400 - Erro na API | Rede Battle</title>
      <div className="flex items-center justify-center pt-10 pl-60 pr-60">
        <div>
          <h1 className="text-9xl font-bold text-gray-300 text-center">
            400
          </h1>
          <h1 className="text-3xl text-gray-300 font-medium text-center">
            PUTSSSS
          </h1>
          <h1 className="text-gray-300 text-center">
            Não foi possível estabelecer conexão com a API.
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
          <motion.img src="/img/system-error.png" alt="logo" width="300" />
        </div>
      </div>
      <Footer />
    </>
  )
}
