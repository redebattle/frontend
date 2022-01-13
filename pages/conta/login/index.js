/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { parseCookies } from 'nookies'

import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'

export default function ContaLogin() {
  const [nick, setNick] = useState('Steve')

  const logar = event => {
    event.preventDefault()
    // const email = event.target.email.value
    alert('Funciona!')
  }

  // function handleChange(value) {
  //   useEffect(() => {
  //     setNick(value.value)
  //   })
  // }

  return (
    <>
      <Header />

      <title>Logar | Rede Battle</title>
      <center>
        <div className="w-full max-w-xs pt-10">
          <form
            onSubmit={logar}
            className="bg-dark2 border-b-4 border-black rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <div className="pb-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <img src={`https://cravatar.eu/helmavatar/${nick}/96`} className='rounded-lg' />
              </motion.div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2 pt-2" htmlFor="nick">
                Nick usado no servidor
              </label>
              <input
                className="shadow bg-dark appearance-none border-b-4 border-black rounded-lg w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                id="nick"
                type="text"
                placeholder="Nick"
                onChange={e => setNick(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="senha">
                Senha usada no servidor
              </label>
              <input
                className="shadow bg-dark appearance-none border-b-4 border-black rounded-lg w-full py-2 px-3 text-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="senha"
                type="password"
                placeholder="******"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <button
                  className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-700 hover:border-purple-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Entrar
                </button>
              </motion.div>
              <a
                className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
                href="/admin/forgot-password"
              >
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
      </center>
      <Footer />
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'redebattle.token': token } = await parseCookies(ctx)
  if (token) {
    return {
      redirect: {
        destination: '/conta/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
