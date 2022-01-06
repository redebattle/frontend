/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    <div className="h-screen flex flex-col justify-center">
      <title>Manutenção | RedeBattle</title>

      <div className="flex justify-evenly items-center">
        <div>
          <h1 className="text-red-600 text-3xl uppercase">
            Site em <b>manutenção</b>
          </h1>
          <p
            className="py-5 text-gray-300 text-lg"
            dangerouslySetInnerHTML={{ __html: mensagem }}
          ></p>
        </div>

        <div>
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
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {}
