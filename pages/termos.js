import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import UserAvatar from 'react-user-avatar'
import { FaArrowLeft, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/router'

import api from '../service/api'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Manutencao from '../components/Manutencao'
import Metadata from '../components/Metadata'
import ErrorAPI from '../components/ErrorAPI'
import { BsPatchCheckFill, BsHeart, BsHeartFill } from 'react-icons/bs'


export default function Termos({ error, manutencao }) {

  // if (error) {
  //   return (
  //     <ErrorAPI />
  //   )
  // }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  return (
    <>
      <Header />
      <title>Termos - Rede Battle</title>
      {/* ADICIONA METADATA */}
      <Metadata title={`TERMOS E CONDIÇÕES - Rede Battle`} description={`Fique por dentro das regras do servidor.`} /*imgURL={post.header}*/ url={`https://redebattle.com.br/regras`} />
      <div className='flex lg:flex-row sm:flex-col'>
        <div className='bg-dark2 w-full p-4 m-6 rounded-lg border-b-4 border-black'>
          <h1 className='font-bold text-2xl'>TERMOS E CONDIÇÕES</h1>
          <div className='overflow-auto h-96 bg-dark3 p-4 m-4 rounded-lg border-b-4 border-black'>
            <div className='p-4'>
              <h1 className='text-2xl font-bold'>Abuso de Bugs</h1>
              <p className='font-extralight'>Aproveitar-se de qualquer maneira de um erro em nossos sistemas para benefício próprio ou ter conhecimento de um erro e não reportá-lo.</p>
              <p className='mt-2'><b>Exemplo:</b> Aproveitar-se de um erro de duplicação de itens.</p>
            </div>
            <div className='p-4 -mt-3'>
              <h1 className='text-2xl font-bold'>Abuso de Bugs</h1>
              <p className='font-extralight'>Aproveitar-se de qualquer maneira de um erro em nossos sistemas para benefício próprio ou ter conhecimento de um erro e não reportá-lo.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  try {

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return (error = true)
      })


    return {
      props: { manutencao, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
