/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect } from 'react'
import { FaTrashAlt, FaEdit, FaEye, FaPause } from 'react-icons/fa'
import Modal from 'react-modal'

import Layout from '../../../components/Layout'
import AdminSidebar from '../../../components/AdminSidebar'
import api from '../../../service/api'
import { useToasts } from 'react-toast-notifications'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#212121'
  },
  overlay: {
    backgroundColor: 'rgba(33, 33, 33, 0.8)'
  }
}

const Table = ({ id, data, acessos, originalUrl, shortUrl, slug }) => {
  const [dataPost, setDataPost] = useState(data || null)
  const [modalIsOpen1, setIsOpen1] = useState(false)
  const { addToast } = useToasts()

  function openModal1() {
    setIsOpen1(true)
  }

  function closeModal1() {
    setIsOpen1(false)
  }

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  useEffect(() => {
    api.get('').then(response =>
      setDataPost(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(new Date(data))
      )
    )
  }, [dataPost])

  async function handleExcluir(id) {
    try {
      await api.delete(`/encurtador/${id}`)
      addToast('Link excluído com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      closeModal1()

      await delay()

      Router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha na exlusão: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }

      addToast('Erro ao excluír: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }
  return (
    <tr className="bg-dark3 border border-dark2 h-14">
      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        style={customStyles}
      >
        <div className="">
          <div className="text-gray-300 flex items-center justify-center">
            <h1 className="text-lg">EXCLUÍR?</h1>
          </div>

          <div>
            <h1 className="text-gray-300 flex items-center justify-center p-2">
              Você tem certeza que deseja EXCLUÍR este link?
            </h1>
          </div>

          <div className="flex items-center justify-center p-5">
            <button
              onClick={closeModal1}
              className="mx-2 bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleExcluir(id)
              }}
              className="mx-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>

      <td className="text-gray-300 border border-dark2 text-center">{id}</td>
      <td className="text-gray-300 border border-dark2 text-center">
        <a href={shortUrl} className="hover:text-purple-500">
          {shortUrl}
        </a>
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        <a href={originalUrl} className="hover:text-purple-500">
          {originalUrl}
        </a>
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        {acessos}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        {dataPost}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        <div className="flex flex-row items-center justify-center">
          <div className="mr-1">
            <a
              data-tip="Visualizar"
              onClick={() =>
                Router.push(`/admin/encurtador/encurtar/feito?slug=${slug}`)
              }
              className="hover:text-purple-500 cursor-pointer"
            >
              <FaEye />
            </a>
          </div>
          <div className="ml-1 mr-1">
            <a
              data-tip="Excluír"
              onClick={openModal1}
              className="hover:text-red-500 cursor-pointer"
            >
              <FaTrashAlt />
            </a>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function AdminEncurtadorIndex({
  error,
  encurtador,
  possuiPermissao
}) {
  const { addToast } = useToasts()

  if (error) {
    return (
      <>
        <title>Encurtador | Administração CubeBox</title>
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
                Não foi possível realizar a conexão com a API.
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
      <title>Encurtador | Administração CubeBox</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-8">
          {(possuiPermissao && (
            <div>
              <div className="w-full pt-5 pl-3">
                <div>
                  <h1 className="text-4xl font-normal font-medium text-white">
                    Encurtador
                  </h1>

                  <p className="text-sm text-white">Encurte suas URLs!</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Link href="encurtador/encurtar">
                  <button className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Encurtar
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center pt-4 mb-4">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-dark2 h-14">
                      <th className="text-gray-300">#</th>
                      <th className="text-gray-300">URL Longa</th>
                      <th className="text-gray-300">URL Encurtada</th>
                      <th className="text-gray-300">
                        <div className="flex items-center justify-center p-2">
                          <FaEye />
                        </div>
                      </th>
                      <th className="text-gray-300">Data</th>

                      <th className="text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {encurtador?.map(short => {
                      return (
                        <Table
                          key={short.id}
                          id={short.id}
                          originalUrl={short.original_url}
                          shortUrl={short.short_url}
                          data={short.createdAt}
                          acessos={short.acess}
                          slug={short.slug}
                        />
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )) || (
            <div className="flex flex-col items-center justify-center my-auto">
              <h1 className="text-9xl font-bold text-gray-300 text-center">
                403
              </h1>
              <h1 className="text-3xl text-gray-300 font-medium text-center">
                Permissão insuficiente
              </h1>
              <h1 className="text-gray-300 text-center">
                Você não possuí permissão para acessar esta página.
              </h1>
            </div>
          )}

          <AdminSidebar />
        </div>
      </div>
    </>
  )
}
export const getServerSideProps = async ctx => {
  const { 'cubeadmin.token': token } = parseCookies(ctx)
  let error = false
  let possuiPermissao = false

  if (!token) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false
      }
    }
  }
  const page = ctx.query.pagina || 1

  // const postsInfo = await api
  //   .get(
  //     `/encurtador/admin/list?page=${page}&itens=10&sort=createdAt&order=desc`,
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   )
  //   .then(res => res.data)
  //   .catch(e => {
  //     console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
  //     return (error = true)
  //   })
  const encurtador = await api
    .get('/encurtador/', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getEncurtador', e)
      error = true
    })

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
      roles.role.nome === 'SITE.ENCURTADOR' ||
      roles.role.nome === '*' ||
      roles.role.nome === 'SITE.*'
    ) {
      possuiPermissao = true
    }
  })

  return {
    props: { error, encurtador, possuiPermissao }
  }
}
