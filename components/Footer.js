/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaDiscord
} from 'react-icons/fa'

import api from '../service/api'

const Footer = () => {
  const [social, setSocial] = useState()
  const [finish, setFinish] = useState('')
  useEffect(() => {
    api
      .get('/configuracoes/redessociais')
      .then(response => setSocial(response.data))
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getRedesSociais', e)
      })
  }, [finish])

  return (
    <footer className="bg-purple-600 border-b-4 border-purple-700 pt-5 mt-10">
      <div className="pt-2">
        <div className="flex pb-5 px-3 m-auto border-purple-500 text-white text-sm flex-col md:flex-row max-w-6xl">
          {/* <div className="mt-2">
            Copyright © Rede Battle. Todos direitos reservados.
          </div> */}
          <div className="mt-2 sm:p-2 sm:mb-2">
            <h1 className="font-medium">
              © 2022 Rede Battle - Todos os direitos reservados.
            </h1>
            <p className="text-xs">
              Esse site não é afiliado à Mojang, AB e/ou Microsoft. "Minecraft"
              é uma marca comercial da Mojang Synergies AB
            </p>
          </div>

          <div className="flex flex-auto items-center justify-center mt-2">
            <a
              href={social?.discord_url}
              className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-discord border-b-2 border-black p-2 rounded-lg px-5"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaDiscord />
              </motion.div>
            </a>
            <a
              href={social?.instagram_url}
              className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-gradient-to-b hover:from-instagram_grad_1 hover:via-instagram_grad_2 hover:via-instagram_grad_3 hover:via-instagram_grad_4 hover:via-instagram_grad_5 hover:via-instagram_grad_6 hover:to-instagram_grad_8 border-b-2 border-black p-2 rounded-lg px-5"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaInstagram />
              </motion.div>
            </a>
            <a
              href={social?.twitter_url}
              className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-twitter border-b-2 border-black p-2 rounded-lg px-5"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaTwitter />
              </motion.div>
            </a>
            <a
              href={social?.youtube_url}
              className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-youtube border-b-2 border-black p-2 rounded-lg px-5"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaYoutube />
              </motion.div>
            </a>
            <a
              href={social?.facebook_url}
              className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-facebook border-b-2 border-black p-2 rounded-lg px-5"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaFacebookF />
              </motion.div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
