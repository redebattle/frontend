/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */

import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect } from 'react'
import { FaTrashAlt, FaEdit, FaEye, FaPause } from 'react-icons/fa'
import Modal from 'react-modal'
import Switch from 'react-switch'
import { useToasts } from 'react-toast-notifications'

import Layout from '../../../components/Layout'
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

export default function AdminManutencaoIndex({
  error,
  manutencao,
  possuiPermissao,
  mensagem
}) {
  const router = useRouter()

  const { addToast } = useToasts()

  const [checked, setChecked] = useState(false)

  const handleChange = nextChecked => {
    setChecked(nextChecked)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function handleEdit({ mensagem, status }) {
    try {
      const resStatus = await api.put('/configuracoes/manutencao/check', {
        status
      })

      const resMessagem = await api.put('/configuracoes/manutencao/mensagem', {
        mensagem
      })

      addToast('Configurações atualizadas.', {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (e) {
      return addToast(e.response?.data?.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  if (error) {
    return (
      <>
        <title>Manutenção | Administração RedeBattle</title>
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
      <title>Manutenção | Administração RedeBattle</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-8">
          {(possuiPermissao && (
            <div>
              <div className="w-full pt-5 pl-3">
                <div>
                  <h1 className="text-4xl font-normal font-medium text-white">
                    Manutenção
                  </h1>
                </div>
              </div>
              <form onSubmit={handleSubmit(handleEdit)}>
                <div className="flex flex-col items-center justify-center pt-4 mb-4">
                  <p className="text-white">Status:</p>

                  <select
                    {...register('status')}
                    className="bg-dark shadow appearance-none border rounded w-32 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-6"
                    id="select"
                    defaultValue={manutencao}
                  >
                    <option value="true">Ativado</option>
                    <option value="false">Desativado</option>
                  </select>
                  <p className="text-white">Mensagem:</p>
                  <textarea
                    {...register('mensagem', { required: true })}
                    placeholder="Mensagem"
                    defaultValue={mensagem.message}
                    className="bg-dark shadow appearance-none border rounded py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline mr-3 w-full h-64"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Atualizar
                  </button>
                </div>
              </form>
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
  const { 'battleadmin.token': token } = parseCookies(ctx)
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
  const manutencao = await api
    .get('/configuracoes/manutencao/check', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de checkManutenção', e)
      error = true
    })

  const mensagem = await api
    .get('/configuracoes/manutencao/mensagem', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(e => {
      console.log(
        'Ocorreu um erro ao acessar a API de getManutencaoMensagem',
        e
      )
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
      roles.role.nome === 'SITE.MANUTENCAO' ||
      roles.role.nome === '*' ||
      roles.role.nome === 'SITE.*'
    ) {
      possuiPermissao = true
    }
  })

  return {
    props: { error, manutencao, mensagem, possuiPermissao }
  }
}
