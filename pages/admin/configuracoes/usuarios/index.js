/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useToasts } from 'react-toast-notifications'

import { AuthContext } from '../../../../contexts/AuthContext'
import AdminSidebar from '../../../../components/AdminSidebar'
import api from '../../../../service/api'

const TableLogs = ({ id, usuario, ip, data, users }) => {
  const [dataFormatada, setDataFormatada] = useState(data)

  const { addToast } = useToasts()

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  useEffect(() => {
    api.get('').then(response =>
      setDataFormatada(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(new Date(data))
      )
    )
  }, [dataFormatada])

  return (
    <tr className="bg-dark3 border border-dark2 h-14">
      {users.map(user => {
        if (user.id === usuario) {
          return (
            <td className="text-gray-300 border border-dark2 text-center">
              {user.nome}
            </td>
          )
        }
      })}
      <td className="text-gray-300 border border-dark2 text-center">
        {dataFormatada}
      </td>
      <td className="text-gray-300 border border-dark2 text-center">{ip}</td>
    </tr>
  )
}

const TableUsers = ({ id, nome }) => {
  const { addToast } = useToasts()

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  return (
    <tr className="bg-dark3 border border-dark2 h-14">
      <td className="text-gray-300 border border-dark2 text-center">{nome}</td>
      <td className="text-gray-300 border border-dark2 text-center">-/-</td>
      <td className="text-gray-300 border border-dark2 text-center">
        <div className="flex flex-row items-center justify-center">
          <div className="ml-1 mr-1">
            <a className="hover:text-purple-500">
              <FaEdit />
            </a>
          </div>
          <div className="mr-1 mt-1">
            <button>
              <a className="hover:text-red-500">
                <FaTrashAlt />
              </a>
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function AdminConfiUsers({
  getLog,
  getUsers,
  error,
  possuiPermissao
}) {
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
      <title>Usuários | Painel Rede Battle</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800">
          {(possuiPermissao && (
            <div className="ml-72 mr-8 mt-12">
              <div className="flex items-center justify-around">
                <p className="text-gray-300 text-xl font-medium">
                  Usuários registrados
                </p>
                <p className="text-gray-300 text-xl font-medium">
                  Logs de atividades
                </p>
              </div>
              <div className="flex justify-center pt-4">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-dark2 h-14">
                      <th className="text-gray-300">Usuário</th>
                      <th className="text-gray-300">Último login</th>
                      <th className="text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUsers.map(users => {
                      return (
                        <TableUsers
                          id={users.id}
                          key={users.id}
                          nome={users.nome}
                        />
                      )
                    })}
                  </tbody>
                </table>

                <table className="table-auto w-full border-collapse ml-2 border-b-4 border-black border-opacity-50">
                  <thead>
                    <tr className="bg-dark2 h-14">
                      <th className="text-gray-300">Usuário</th>
                      <th className="text-gray-300">Data/Hora</th>
                      <th className="text-gray-300">IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLog.map(logs => {
                      return (
                        <TableLogs
                          id={logs.id}
                          key={logs.id}
                          usuario={logs.user_id}
                          data={logs.createdAt}
                          ip={logs.ip}
                          users={getUsers}
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

  const getLog = await api
    .get('/sessions/logs', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API getSessionsLogs. ', e)
      error = true
    })

  const getUsers = await api
    .get('/users/get', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API getSessionsLogs. ', e)
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

  getUserRoles.map(roles => {
    if (
      roles.role.nome === 'CONFIGURACOES.USUARIOS' ||
      roles.role.nome === '*' ||
      roles.role.nome === 'CONFIGURACOES.*'
    ) {
      possuiPermissao = true
    }
  })

  return {
    props: { getLog, getUsers, error, possuiPermissao }
  }
}
