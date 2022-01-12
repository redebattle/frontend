/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import api from '../service/api'

export default function Manutencao() {
  const [mensagem, setMensagem] = useState()
  useEffect(() => {
    api
      .get('/configuracoes/manutencao/mensagem')
      .then(response => setMensagem(response.data.message))
      .catch(e => {
        console.log(
          'Ocorreu um erro ao acessar a API de getMessageManutencao',
          e
        )
      })
  }, [mensagem])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <title>Manutenção | RedeBattle</title>
      <div className="flex lg:flex-row sm:flex-col lg:justify-evenly sm:justify-center items-center">
        <div className='sm:p-12'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            style={{ filter: 'grayscale(100%)' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15
            }}
            whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src="/img/logo.png"
              alt="logo"
              layoutId="logo-img"
              className="w-65 h-32"
            />
          </motion.div>
        </div>
        <div className='flex flex-col justify-center lg:items-start sm:items-center'>
          <h1 className="text-red-600 lg:text-5xl sm:text-3xl md:text-5xl uppercase text-center">
            Site em <b>manutenção</b>
          </h1>
          <div
            className="p-5 text-gray-300 lg:text-lg sm:text-base"
            dangerouslySetInnerHTML={{ __html: mensagem }}
          />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {}
