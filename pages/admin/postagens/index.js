/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useToasts } from 'react-toast-notifications'
import Modal from 'react-modal'
import ReactTooltip from 'react-tooltip'

import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { FaTrashAlt, FaEdit, FaEye, FaPause } from 'react-icons/fa'
import { AuthContext } from '../../../contexts/AuthContext'
import AdminSidebar from '../../../components/AdminSidebar'
import api from '../../../service/api'

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

const Table = ({
  id,
  titulo,
  data,
  acessos,
  autor,
  categoria,
  status,
  slug
}) => {
  const [dataPost, setDataPost] = useState(data)

  const [modalIsOpen1, setIsOpen1] = useState(false)
  const [modalIsOpen2, setIsOpen2] = useState(false)

  function openModal1() {
    setIsOpen1(true)
  }

  function closeModal1() {
    setIsOpen1(false)
  }

  function openModal2() {
    setIsOpen2(true)
  }

  function closeModal2() {
    setIsOpen2(false)
  }
  const { addToast } = useToasts()

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
      await api.delete(`/postagens/${id}`)
      addToast('Postagem excluída com sucesso!', {
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

  async function handleInativar(id) {
    try {
      await api.put(`/postagens/changeStatus/${id}`)
      addToast('Postagem alterada com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      closeModal2()

      await delay()

      Router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha ao inativar: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }

      addToast('Erro ao inativar: ' + e.response.data.error, {
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
              Você tem certeza que deseja EXCLUÍR essa postagem?
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

      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
      >
        <div className="">
          <div className="text-gray-300 flex items-center justify-center">
            <h1 className="text-lg uppercase">Alterar?</h1>
          </div>

          <div>
            <h1 className="text-gray-300 flex items-center justify-center p-2">
              Você tem certeza que deseja alterar esta postagem?
            </h1>
          </div>

          <div className="flex items-center justify-center p-5">
            <button
              onClick={closeModal2}
              className="mx-2 bg-red-600 border-b-4 border-red-700 hover:bg-red-500 hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                handleInativar(id)
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
        {titulo}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">{autor}</td>
      <td className="text-gray-300 border border-dark2 text-center">
        {categoria}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        {dataPost}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        {(status === 'true' && <p className="text-whatsapp">Ativo</p>) ||
          (status === 'false' && <p className="text-red-500">Inativo</p>) ||
          '-'}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        {acessos}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">
        <div className="flex flex-row items-center justify-center">
          <div className="mr-1">
            <Link href={'/postagens/' + slug}>
              <a data-tip="Visualizar" className="hover:text-purple-500">
                <FaEye />
              </a>
            </Link>
          </div>

          <div className="mr-1 ml-1">
            <a
              data-tip={
                (status === true && 'Inativar') ||
                (status === false && 'Ativar') ||
                'Status'
              }
              onClick={openModal2}
              className="hover:text-purple-500"
            >
              <FaPause />
            </a>
          </div>

          <div className="ml-1 mr-1">
            <Link href="/editar">
              <a data-tip="Editar" className="hover:text-purple-500">
                <FaEdit />
              </a>
            </Link>
          </div>

          <div className="mr-1">
            <a
              data-tip="Excluír"
              onClick={openModal1}
              className="hover:text-red-500"
            >
              <FaTrashAlt />
            </a>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function AdminPostagensIndex({ posts, error, possuiPermissao }) {
  const { user } = useContext(AuthContext)

  if (error) {
    return (
      <>
        <title>Postagens | Administração CubeBox</title>
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
      <title>Postagens | Painel Rede Battle</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800">
          {(possuiPermissao && (
            <div className="ml-72 mr-8 mt-12">
              <div className="flex items-center justify-center">
                <Link href="postagens/adicionar">
                  <button className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Nova postagem
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center pt-4">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-dark2 h-14">
                      <th className="text-gray-300">#</th>
                      <th className="text-gray-300">Título</th>
                      <th className="text-gray-300">Autor</th>
                      <th className="text-gray-300">Categoria</th>
                      <th className="text-gray-300">Data</th>
                      <th className="text-gray-300">Status</th>
                      <th className="text-gray-300">
                        <div className="flex items-center justify-center p-2">
                          <FaEye />
                        </div>
                      </th>
                      <th className="text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => {
                      return (
                        <Table
                          key={post.id}
                          id={post.id}
                          slug={post.slug}
                          titulo={post.titulo}
                          autor={post.autor.nome}
                          categoria={post.categoria.descricao}
                          data={post.createdAt}
                          status={post.visivel.toString()}
                          acessos={post.acessos}
                        />
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )) || (
            <div className="flex flex-col items-center justify-center my-auto ml-64">
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
  const { 'cubeadmin.token': token } = await parseCookies(ctx)
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

  const getUserRoles = await api
    .get('/roles/admin/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data.permissoes)
    .catch(e => {
      console.log('Ocorreu um erro ao realizar a conexão getRoles')
    })

  getUserRoles.map(roles => {
    if (
      roles.role.nome === 'SITE.POSTAGENS' ||
      roles.role.nome === 'SITE.*' ||
      roles.role.nome === '*'
    ) {
      possuiPermissao = true
    }
  })

  const postsInfo = await api
    .get(
      `/postagens/admin/list?page=${page}&itens=10&sort=createdAt&order=desc`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
      return (error = true)
    })
  return {
    props: { error: false, posts: postsInfo.obs.rows, possuiPermissao }
  }
}
