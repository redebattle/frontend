/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import Layout from '../../../components/Layout'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaSidebar from '../../../components/ContaSidebar'

export default function ContaCompasIndex() {
  return (
    <>
      <Header />

      <title>Minhas Compras | Rede Battle</title>

      <div className="container">
        <div className="content">
          <div className="flex flex-row">
            <ContaSidebar />
            <div className="flex flex-col ">
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-10 max-w-4xl p-10 ">
                <div>
                  <h1 className="text-gray-300 text-3xl ">Compras!</h1>
                </div>
                <div>
                  <h1 className="text-gray-300 text-lg mt-3 ">
                    Você ainda não teve nenhuma compra aprovada.
                  </h1>
                </div>
              </div>
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
