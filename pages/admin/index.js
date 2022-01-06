/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { FaCaretRight } from 'react-icons/fa'

import { AuthContext } from '../../contexts/AuthContext'
import AdminSidebar from '../../components/AdminSidebar'
import api from '../../service/api'

export default function Dashboard({ getDashboard, error, possuiPermissao }) {
  const { user, roles } = useContext(AuthContext)

  if (error) {
    return (
      <>
        <title>Administração | RedeBattle</title>
        <div>
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-8">
            <div className="flex flex-col items-center justify-center my-auto">
              <h1 className="text-9xl font-bold text-gray-300 text-center">
                ERRO!
              </h1>
              <h1 className="text-3xl text-gray-300 font-medium text-center">
                Ocorreu um erro.
              </h1>
              <h1 className="text-gray-300 text-center">
                Ocorreu um erro ao realizar a conexão getRoles.
              </h1>
            </div>

            <AdminSidebar />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <title>Painel | Rede Battle</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800">
          {(possuiPermissao && (
            <div className="ml-72 mr-10 mt-4">
              <div className="grid grid-cols-3 h-32">
                <div className="flex flex-col items-center justify-center bg-blue-500 border-b-4 border-blue-700 m-2 rounded-sm">
                  <div className="">
                    <h1 className="text-white text-xl">
                      {getDashboard?.postagens} Postagens
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="text-white text-sm hover:text-black flex justify-center items-center">
                      <FaCaretRight />
                      <Link href="#">Ir para as postagens</Link>
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-purple-500 border-b-4 border-purple-700 m-2 rounded-sm">
                  <div className="">
                    <h1 className="text-white text-xl">
                      {getDashboard?.vendas} Vendas
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="text-white text-sm hover:text-black flex justify-center items-center">
                      <FaCaretRight />
                      <Link href="#">Ir para as vendas</Link>
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-yellow-500 border-b-4 border-yellow-700 m-2 rounded-sm">
                  <div className="">
                    <h1 className="text-white text-xl">
                      {getDashboard?.tickets} Tickets abertos
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="text-white text-sm hover:text-black flex justify-center items-center">
                      <FaCaretRight />
                      <Link href="#">Ir para os tickets</Link>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="bg-dark2 border border-b-4 border-black border-opacity-60 mx-2 min-h-screen">
                <div>
                  <h1 className="text-gray-300 text-4xl flex items-center justify-center">
                    Index
                  </h1>
                </div>
              </div>
            </div>
          )) || (
            <div className="ml-72 mr-10 mt-4">
              <div className="bg-dark2 border border-b-4 border-black border-opacity-60 mx-2 p-12">
                <div>
                  <h1 className="text-gray-300 text-4xl flex items-center justify-center">
                    Dashboard
                  </h1>
                  <h1 className="text-gray-300 text-xl flex items-center justify-center">
                    Bem-vindo ao painel de administração!
                  </h1>
                </div>
              </div>
            </div>
          )}

          <AdminSidebar />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'cubeadmin.token': token } = await parseCookies(ctx)
  let possuiPermissao = false
  let error = false

  if (!token) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false
      }
    }
  }

  const getUserRoles = await api
    .get('/roles/admin/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data.permissoes)
    .catch(e => {
      console.log('Ocorreu um erro ao realizar a conexão getRoles')
      error = true
    })

  getUserRoles?.map(roles => {
    if (
      roles.role.nome === 'DASHBOARD' ||
      roles.role.nome === 'DASHBOARD.*' ||
      roles.role.nome === '*'
    ) {
      possuiPermissao = true
    }
  })

  const getDashboard = await api
    .get('/dashboard', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API getDashboard', e)
      error = true
    })
  return {
    props: { getDashboard, possuiPermissao, error }
  }
}
