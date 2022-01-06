/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { FaUser, FaShoppingCart, FaHeadset, FaSignOutAlt } from 'react-icons/fa'

import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ContaSidebar from '../../components/ContaSidebar'

export default function ContaIndex() {
  return (
    <>
      <Header />

      <title>Minha Conta | Rede Battle</title>

      <div className="container">
        <div className="content">
          <div className="flex flex-row">
            <ContaSidebar />
            <div className="flex flex-col ">
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-10 max-w-4xl p-10">
                <div>
                  <h1 className="text-gray-300 text-3xl ">Olá, TheMito!</h1>
                </div>
                <div>
                  <h1 className="text-gray-300 text-lg mt-3">
                    Este é o seu painel, aqui você pode visualizar todas as
                    compras efetuadas (sejam elas aprovadas, pendentes ou
                    recusadas). Tem alguma dúvida? Entre em contato conosco pelo
                    e-mail: suporte@battlecraft.com.br ou criando um ticket no
                    suporte.
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 text-3xl mt-6">
                    Cadastre seu email!
                  </h1>
                </div>
                <div>
                  <h1 className="text-gray-300 text-lg mt-3">
                    Registrando um e-mail sua conta fica mais segura e pode ser
                    recuperada sem dificuldades posteriormente!
                  </h1>
                </div>
                <div>
                  <div>
                    <form>
                      <input
                        className="shadow bg-dark appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline mt-5"
                        id="email"
                        type="email"
                        placeholder="Email"
                      />
                    </form>
                  </div>
                  <div>
                    <button
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
                      type="submit"
                    >
                      Adicionar
                    </button>
                  </div>
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
