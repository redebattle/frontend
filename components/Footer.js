/* eslint-disable camelcase */
/* eslint-disable react/react-in-jsx-scope */
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaDiscord
} from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'
import api from '../service/api'
import { useEffect, useState } from 'react'

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
    <footer className="bg-purple-600 border-b-4 border-purple-700 pt-10 mt-10">
      <div className="max-w-6xl m-auto text-white flex flex-wrap justify-between align-middle items-center pr-20">
        <div className="pt-12 pr-8 w-1/2 sm:w-4/12 md:w-3/12 align-middle items-center">
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
              className="w-44 h-26"
            />
          </motion.div>
        </div>
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-white font-medium mb-6">
            Sobre nós
          </div>
          <p className="sm:text-sm sm:w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
            necessitatibus placeat nobis corporis incidunt sunt itaque eius
            dolorum, dignissimos odio nostrum, reprehenderit magnam non cum
            officia quam voluptate dolor cupiditate.
          </p>
        </div>
        <div className="pl-16 pt-5 pb-5 w-1/2 sm:w-1/12 md:w-3/12">
          <div className="text-xs uppercase text-white font-medium mb-6">
            Links úteis
          </div>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-1"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #1
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-2"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #2
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-3"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #3
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-4"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #4
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-5"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #5
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-6"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #6
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
            <a
              href="/link-7"
              className="my-3 block text-gray-300 hover:text-purple-300 text-sm font-medium duration-700"
            >
              Link #7
            </a>
          </motion.div>
        </div>
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-white font-medium mb-6">
            Facebook
          </div>
          <div className="">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebook&tabs=messages&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="130"
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5
            border-t border-purple-500 text-white text-sm
            flex-col md:flex-row max-w-6xl"
        >
          <div className="mt-2">
            Copyright © Rede Battle. Todos direitos reservados.
          </div>
          {/* <div className="mt-2">
            © CubeBox 2021 - Todos os direitos reservados. <br />
            Esse site não é afiliado à Mojang, AB e/ou Microsoft. "Minecraft" é
            uma marca comercial da Mojang Synergies AB
          </div> */}

          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a
              href={social?.discord_url}
              className="w-8 mx-1 text-3xl hover:text-discord"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaDiscord />
              </motion.div>
            </a>
            <a
              href={social?.youtube_url}
              className="w-8 mx-1 text-3xl hover:text-youtube"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaYoutube />
              </motion.div>
            </a>
            <a
              href={social?.instagram_url}
              className="w-8 mx-1 text-3xl hover:text-instagram"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaInstagram />
              </motion.div>
            </a>
            <a
              href={social?.twitter_url}
              className="w-8 mx-1 text-3xl hover:text-twitter"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaTwitter />
              </motion.div>
            </a>
            <a
              href={social?.facebook_url}
              className="w-8 mx-1 text-3xl hover:text-facebook"
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
