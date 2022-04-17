/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'
import { BsArrowReturnLeft, BsPatchCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { BiCommentX, BiCommentAdd } from 'react-icons/bi'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import api from '../../../service/api'
import { useEffect, useState } from 'react'
import ErrorAPI from '../../../components/ErrorAPI'
import Manutencao from '../../../components/Manutencao'

export default function VisualizarTicket({ tickets, manutencao, statusCode }) {
  const router = useRouter()
  const [dataCreation, setDateCreation] = useState(null)
  const [hoursCreation, setHoursCreation] = useState(null)
  const [dataUpdate, setDateUpdate] = useState(null)
  const [hoursUpdate, setHoursUpdate] = useState(null)

  if (statusCode?.code !== 200) {
    return <ErrorAPI statusCode={statusCode} />
  }

  if (statusCode.code === 200) {
    useEffect(async () => {
      await setDateCreation(
        Intl.DateTimeFormat('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(tickets.ticket.createdAt))
      )
    }, [dataCreation])

    useEffect(async () => {
      await setHoursCreation(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(tickets.ticket.createdAt))
      )
    }, [hoursCreation])

    useEffect(async () => {
      await setDateUpdate(
        Intl.DateTimeFormat('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(tickets.ticket.updatedAt))
      )
    }, [dataUpdate])

    useEffect(async () => {
      await setHoursUpdate(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(tickets.ticket.updatedAt))
      )
    }, [hoursUpdate])
  }

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
      <title>Detalhes do ticket | Rede Battle</title>
      <div className="flex flex-row items-center justify-between bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-4">
        <div className="flex flex-row items-center">
          <h1 className="font-bold text-2xl p-2">
            Ticket #{tickets.ticket.id}
          </h1>
          {(!tickets.ticket.closed && (
            <span class="ml-2 badge badge-outline text-lime-500 font-bold">
              Aberto
            </span>
          )) || (
            <span class="ml-2 badge badge-outline text-red-500 font-bold">
              Fechado
            </span>
          )}
          <span
            class="ml-2 badge badge-outline font-bold"
            style={{ color: tickets.ticket.priority.color }}
          >
            {tickets.ticket.priority.name}
          </span>
        </div>
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6"
        >
          <BsArrowReturnLeft className="mr-2" />
          Voltar
        </button>
      </div>
      <div className="flex lg:flex-row sm:flex-col">
        <div className="flex flex-col max-w-lg">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-4">
            <h1 className="text-center font-bold text-xl p-2">
              Detalhes do ticket
            </h1>
            <hr className="opacity-10" />
            <p className="p-3">
              <b>Status:</b> {tickets.ticket.status.name}
            </p>
            <p className="p-3 flex flex-col">
              <b>Última atualização:</b> {dataUpdate} às {hoursUpdate}
            </p>
            <p className="p-3 flex flex-col">
              <b>Criado em:</b> {dataCreation} às {hoursCreation}
            </p>
          </div>
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-4">
            <h1 className="text-center font-bold text-xl p-2">
              Arquivos anexados
            </h1>
            <hr className="opacity-10" />
            <p className="p-3">
              Clique ou arraste os arquivos para upload
              <br />
              Você pode arrastar um ou mais arquivos. <br />
              Não é necessário responder o ticket, o upload é automático.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10">
            <div className="bg-dark flex flex-row items-center p-4 -mt-4 rounded-lg">
              <h1 className="font-bold text-xl">
                {tickets.ticket.title} ➡️ {tickets.ticket.category.name}
              </h1>
            </div>
            <div className="p-1 my-4">
              {tickets.threads.map(thread => {
                const [dateThread, setDateThread] = useState(null)
                const [hoursThread, setHoursThread] = useState(null)
                useEffect(async () => {
                  await setDateThread(
                    Intl.DateTimeFormat('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }).format(new Date(thread.createdAt))
                  )
                }, [dateThread])

                useEffect(async () => {
                  await setHoursThread(
                    Intl.DateTimeFormat('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(thread.createdAt))
                  )
                }, [hoursThread])
                if (thread.agent === '0') {
                  return (
                    <div className="flex justify-end rounded-lg p-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center justify-end m-1">
                          <p className="mr-2 flex items-center">
                            {thread.user.name} ({thread.user.username}){' '}
                            {thread.user.is_verified && (
                              <div
                                data-tip="Membro verificado"
                                className="tooltip tooltip-top"
                              >
                                <BsPatchCheckFill
                                  className="ml-1 lg:text-base sm:text-xs text-facebook"
                                  data-tip="Membro verificado"
                                />
                              </div>
                            )}
                          </p>
                          <span class="mr-16 badge badge-outline text-instagram_grad_9 font-bold text-2xs">
                            VIP
                          </span>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="bg-roxo p-4 rounded-lg w-full items-center">
                            <p>{thread.content}</p>
                          </div>
                          <img
                            className="w-12 h-12 m-2"
                            src="/img/no-avatar.png"
                            alt="Avatar"
                          />
                        </div>
                        <p className="text-right mr-16 pr-1 text-xs p-1 text-gray-300">
                          {dateThread} às {hoursThread}
                        </p>
                      </div>
                    </div>
                  )
                }
                if (thread.agent === '1') {
                  return (
                    <div className="flex justify-start rounded-lg p-2">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center m-1">
                          <p className="ml-16 pl-1 flex items-center">
                            {thread.user.name} ({thread.user.username}){' '}
                            {thread.user.is_verified && (
                              <div
                                data-tip="Membro verificado"
                                className="tooltip tooltip-top"
                              >
                                <BsPatchCheckFill
                                  className="ml-1 lg:text-base sm:text-xs text-facebook"
                                  data-tip="Membro verificado"
                                />
                              </div>
                            )}
                          </p>
                          <span class="ml-2 badge badge-outline text-green-500 font-bold text-2xs">
                            Moderador
                          </span>
                        </div>
                        <div className="flex flex-row items-center">
                          <img
                            className="w-12 h-12 m-2"
                            src="/img/no-avatar.png"
                            alt="Avatar"
                          />
                          <div className="bg-mercadopago2 p-4 rounded-lg w-full">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: thread.content
                              }}
                            />
                          </div>
                        </div>
                        <p className="text-left ml-16 pr-1 text-xs p-1 text-gray-300">
                          {dateThread} às {hoursThread}
                        </p>
                      </div>
                    </div>
                  )
                }
              })}
            </div>

            <hr className="m-3 opacity-10" />
            {(!tickets.ticket.closed && (
              <form>
                <label className="font-medium text-lg">
                  Envie uma resposta
                </label>
                <textarea
                  className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 text-lg font-medium h-32 w-full"
                  id="mensagem"
                />
                <button className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                  Responder
                </button>
              </form>
            )) || (
              <div className="bg-red-500 p-4 my-6 rounded-lg sm:w-full">
                <p className="flex flex-row items-center justify-center lg:text-base sm:text-sm font-bold">
                  <BiCommentX className="mr-2" />O ticket foi fechado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async ctx => {
  try {
    let statusCode = { code: 200 }
    const { id } = ctx.params

    const { 'redebattle.token': token } = await parseCookies(ctx)
    if (!token) {
      return {
        redirect: {
          destination: '/conta/login',
          permanent: false
        }
      }
    }

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkMaintenance', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const tickets = await api
      .get(`/tickets/${id}`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API getTicketsByID', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    return {
      props: { tickets, manutencao, statusCode }
    }
  } catch (e) {
    return {
      props: { statusCode: e.code }
    }
  }
}
