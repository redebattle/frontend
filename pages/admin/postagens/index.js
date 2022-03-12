import { motion } from 'framer-motion'
import { Router } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPause, FaTrashAlt } from 'react-icons/fa'
import { useToasts } from 'react-toast-notifications'
import DashboardAsid from '../../../components/Dashboard/Aside'
import DashboardHeader from '../../../components/Dashboard/Header'
import api from '../../../service/api'
import Modal from 'react-modal'
import Link from 'next/link'

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
    <tr class="bg-dark5 border border-dark4 md:border-none block md:table-row rounded-lg my-2">
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

      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">ID:</span>
        {id}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Título:</span>
        {titulo}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Autor:</span>
        {autor}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Categoria:</span>
        {categoria}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Data:</span>
        {dataPost}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Status:</span>
        {(status === 'true' && <p className="text-green-500">Ativo</p>) ||
          (status === 'false' && <p className="text-red-500">Inativo</p>) ||
          '-'}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Acessos:</span>
        {acessos}
      </td>
      <td class="p-3 md:border md:border-dark4 md:table-cell flex flex-col">
        <span class="inline-block md:hidden font-bold">Ações:</span>
        <div className="flex flex-row items-center items-start justify-center sm:justify-start">
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
      {/* <td className="text-gray-300 border border-dark5 text-center">{id}</td> */}
      {/* <td className="text-gray-300 border border-dark5 text-center">
        {titulo}
      </td>
      <td className="text-gray-300 border border-dark5 text-center">{autor}</td>
      <td className="text-gray-300 border border-dark5 text-center">
        {categoria}
      </td>
      <td className="text-gray-300 border border-dark5 text-center">
        {dataPost}
      </td> */}
      {/* <td className="text-gray-300 border border-dark5 text-center">
        {(status === 'true' && <p className="text-green-500">Ativo</p>) ||
          (status === 'false' && <p className="text-red-500">Inativo</p>) ||
          '-'}
      </td> */}
      {/* <td className="text-gray-300 border border-dark5 text-center">
        {acessos}
      </td> */}
      {/* <td className="text-gray-300 border border-dark5 text-center">
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
      </td> */}
    </tr>
  )
}

const Main = ({ posts }) => (
  <motion.main
    transition={{ duration: 0.3, delay: 0 }}
    animate={{ y: 0, opacity: 1 }}
    initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6 bg-dark2"
  >
    <section className="grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-1 xl:grid-flow-col gap-6">
      <div className="flex flex-col md:col-span-1 md:row-span-1 bg-dark3 shadow rounded-lg">
        <div className="px-6 py-5 font-semibold border-b border-dark5 text-gray-300 flex items-center justify-between">
          Todas as postagens
          <Link href="postagens/adicionar">
            <button className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Nova postagem
            </button>
          </Link>
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center bg-dark4 justify-center h-full px-4 py-16 text-gray-300 text-sm font-bold rounded-md">
            <table className="min-w-full border-collapse table-auto bg-dark3">
              <thead class="block md:table-header-group h-14">
                <tr class="border border-dark5 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    #
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    Título
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    Autor
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    Categoria
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    Data
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    Status
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    <div className="flex items-center justify-center p-2">
                      <FaEye />
                    </div>
                  </th>
                  <th class="p-2 text-white font-bold md:border md:border-dark5 text-left block md:table-cell">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
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
      </div>
    </section>
    <section className="text-center font-bold text-gray-500">
      <p className="bg-dark rounded-lg bg-opacity-30">
        © Rede Battle <br />
        Development by Filipe Moreno
      </p>
    </section>
  </motion.main>
)

export default function PostagensDashboard({ postsInfo }) {
  return (
    <>
      <title>Postagens | Rede Battle</title>
      <div className="flex bg-dark2 min-h-screen">
        <DashboardAsid active="Postagens" />

        <div className="flex-grow text-gray-800">
          <DashboardHeader />
          <Main posts={postsInfo} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'battleadmin.token': token } = await parseCookies(ctx)
  let possuiPermissao = false
  let error = false
  let page = 1

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
    props: { postsInfo: postsInfo.obs.rows, possuiPermissao, error }
  }
}
