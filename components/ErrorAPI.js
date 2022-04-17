import { motion } from 'framer-motion'
import Router from 'next/router'

import { FaArrowLeft } from 'react-icons/fa'

import Footer from '../components/Footer'
import Header from '../components/Header'

export default function ErrorAPI({ statusCode }) {
  console.log(statusCode)
  const listErrors = [
    {
      code: 400,
      title: statusCode?.message ? statusCode?.message : 'Requisição Incorreta',
      pageTitle: 'Requisição Incorreta',
      message: 'Seu cliente emitiu uma solicitação malformada ou ilegal.',
      image: '/img/errors/400.png'
    },
    {
      code: 401,
      title: statusCode?.message ? statusCode?.message : 'Não Autorizado',
      pageTitle: statusCode?.message ? statusCode?.message : 'Não Autorizado',
      message:
        'A página que você procura não existe ou não está disponível no momento.',
      image: '/img/errors/401.png'
    },
    {
      code: 404,
      title: statusCode?.message
        ? statusCode?.message
        : 'Página não encontrada',
      pageTitle: statusCode?.message
        ? statusCode?.message
        : 'Página não encontrada',
      message:
        'A página que você procura não existe ou não está disponível no momento.',
      image: '/img/errors/404.png'
    },
    {
      code: 503,
      pageTitle: 'Erro na API',
      title: 'PUTSSSS...',
      message: 'Não foi possível estabelecer conexão com a API.',
      image: '/img/errors/503.png'
    }
  ]

  let getError

  listErrors.map(listError => {
    if (listError.code === statusCode ? statusCode : statusCode.code) {
      getError = listError
    }
  })
  return (
    <>
      <Header />
      <title>
        {getError?.code} - {getError?.pageTitle} | Rede Battle
      </title>
      <div className="flex items-center justify-center p-8">
        <div className="flex lg:flex-row items-center justify-center sm:flex-col p-6 w-full bg-white rounded-lg border-gray-200 shadow-md dark:bg-dark2 dark:border-b-4 dark:border-black">
          <div>
            <h1 className="text-7xl font-bold text-gray-300 text-center">
              ERRO
            </h1>
            <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight flex items-center justify-center">
              <div className="badge bg-youtube lg:text-lg sm:text-xs -mt-16 font-bold">
                {getError?.code}
              </div>
            </h1>
            <h1 className="text-3xl text-gray-300 font-medium text-center">
              {getError?.title}
            </h1>
            <h1 className="text-gray-300 text-center p-2">
              {getError?.message}
            </h1>
            <a onClick={() => Router.back()}>
              <motion.div
                className="flex justify-center items-center p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button className="flex flex-row items-center justify-center bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 h-10 w-40 sm:text-sm font-medium text-white">
                  <FaArrowLeft className="mr-2  w-4 h-4 flex items-center justify-center text-center" />{' '}
                  Voltar
                </button>
              </motion.div>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <motion.img
              src={getError?.image}
              alt="Imagem de Erro"
              width="300"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
