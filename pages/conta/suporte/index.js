/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import Layout from '../../../components/Layout'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaSidebar from '../../../components/Conta/ContaSidebar'
import { FaQuestionCircle } from 'react-icons/fa'

export default function ContaSuporteIndex() {
  return (
    <>
      <Header />
      <title>Suporte | Rede Battle</title>
      <div className="flex lg:flex-row sm:flex-col">
        <ContaSidebar />
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10 ">
            <div className='flex flex-row'>
              <FaQuestionCircle className='text-yellow-400 text-3xl font-bold mr-2' />
              <h1 className="text-gray-300 text-3xl font-bold">Suporte</h1>
            </div>
            <p>Crie um ticket atraves do nosso discord. Use o canal <u className='text-yellow-400'>#atendimento</u></p>
            <div className="flex justify-center pt-5 pb-5 mt-2 mb-2 bg-dark2 border-b-4 border-black border-opacity-60 rounded-lg">
              <iframe
                title='Twitter'
                className='lg:w-full sm:w-full'
                src="https://discordapp.com/widget?id=762534744969052181&theme=dark"
                width="460"
                height="500"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'redebattle.token': token } = await parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: '/conta/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
