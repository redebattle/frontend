/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '../../service/api'
import apiWay from '../../service/apiWay'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default function Punicoes({ ban, error }) {

  if (!ban) {
    return (
      <>
<title>Punições | Rede Battle</title>
      <Header />
      <div className="INDEX">
        <div className="flex grid grid-rows-1 mt-4 md:mt-8 px-12">
          <div className=" pb-4 col-span-3">
            <div className="justify-center  rounded-xl">
              <div className="py-5 px-5 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <div className="bg-dark2 p-10 text-center w-full rounded-lg">
                  <h1 className="text-gray-300 text-xl font-medium">
                    Nenhuma punição encontrada com esse ID.
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

  if (error) {
    return (
      <Error
        className="bg-dark"
        statusCode="503"
        title="Não foi possível realizar a conexão com a API"
      />
    )
  }

  const [dataBan, setDataBan] = useState(null)
  useEffect(() => {
    setDataBan(
      Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(new Date(ban?.time * 1))
    )
  }, [dataBan])
  return (
    <>
      <title>Punição #{ban?.id} - {ban?.user?.name} | Rede Battle</title>
      <Header />
      <div className="INDEX">
        <div className="flex grid grid-rows-1 mt-4 md:mt-8 px-12">
          <div className=" pb-4 col-span-3">
            <div className="justify-center  rounded-xl">
              <div className="py-5 px-5 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                {(ban === null && (
                  <div className="bg-dark2 p-10 text-center w-full">
                    <h1 className="text-gray-300 text-xl font-medium">
                      Punição não encontrada.
                    </h1>
                  </div>
                )) || (
                  <div className='w-full h-auto'>
                    <div className='bg-dark2 p-4 rounded-lg m-4'>
                      <h1 className='font-bold'>Banimento #{ban.id} {parseInt(ban.active.data) === 0 && ban.removed_by_name === '#expired' && <span class="badge badge-outline text-lime-400 ml-2">Finalizado</span>}
                                                {parseInt(ban.active.data) === 0 && ban.removed_by_name !== '#expired' && <span class="badge badge-outline text-yellow-600 ml-2">Revogado</span>}
                                                {parseInt(ban.active.data) === 1 && <span class="badge badge-outline text-red-400 ml-2">Ativo</span>}
                                                {parseInt(ban.ipban.data) === 1 && <span class="badge badge-outline text-dark ml-2">IPBan</span>}
                                                {parseInt(ban.silent.data) === 1 && <span class="badge badge-outline text-gray-500 ml-2">Silenciado</span>}

                      </h1>
                    </div>
                    <div className='flex flex-row'>
                      <div className='flex flex-col'>
                        <div className='bg-dark2 p-4 rounded-lg m-4 h-auto w-48'>
                          <div className='flex flex-col items-center justify-center'>
                            <img className='p-1' src={`https://minotar.net/armor/bust/${ban.user.name}/120`}></img>
                            <h1 className='p-2 text-2xl'>{ban.user.name}</h1>
                          </div>
                        </div>
                        <div className='bg-dark2 p-4 rounded-lg m-4 h-auto w-48'>
                          <div className='flex flex-col justify-center items-center'>
                            <h1 className='p-2'>Banido por:</h1>
                            <img className='p-1' src={`https://minotar.net/armor/bust/${ban.banned_by_name}/120`}></img>
                            <p className='text-2xl p-1'>{ban.banned_by_name}</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col w-full p-3'>
                        {parseInt(ban.active.data) !== 0 && ban.removed_by_name !== '#expired' &&
                        <div className='bg-red-400 bg-opacity-25 p-4 rounded-lg m-4 w-auto h-auto'>
                          <div className='flex flex-row justify-between items-center h-36 p-5 mr-12 ml-6'>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Banido em:</h1>
                              <p className='text-2xl'>{Intl.DateTimeFormat('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                    }).format(new Date(ban.time))} às {Intl.DateTimeFormat('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    }).format(new Date(ban.time))}
                              </p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Motivo do banimento:</h1>
                              <p className='text-2xl'>{ban.reason}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Término:</h1>
                              <p className='text-2xl'>
                                {ban.until < 0 && <span class="badge badge-outline text-red-500">Permanente</span>}
                                {ban.until > 0 &&new Date(ban.until * 1).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div> ||
                        <div className='bg-lime-400 bg-opacity-25 p-4 rounded-lg m-4 w-auto h-auto'>
                          <div className='flex flex-row justify-between items-center h-36 p-5 mr-12 ml-6'>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Banido em:</h1>
                              <p className='text-2xl'>{Intl.DateTimeFormat('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                    }).format(new Date(ban.time))} às {Intl.DateTimeFormat('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    }).format(new Date(ban.time))}
                              </p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Motivo do banimento:</h1>
                              <p className='text-2xl'>{ban.reason}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Término:</h1>
                              <p className='text-2xl'>
                                {ban.until < 0 && <span class="badge badge-outline text-red-500">Permanente</span>}
                                {ban.until > 0 &&new Date(ban.until * 1).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>}
                        {parseInt(ban.active.data) !== 1 && ban.removed_by_name !== '#expired' &&
                        <div className='bg-dark2 p-4 rounded-lg m-4 w-auto h-auto'>
                          <div className='flex flex-row justify-between items-center h-36 p-5 mr-12 ml-6'>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Revogado em:</h1>
                              <p className='text-2xl'>{Intl.DateTimeFormat('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                    }).format(new Date(ban.removed_by_date))} às {Intl.DateTimeFormat('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    }).format(new Date(ban.removed_by_date))}
                              </p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                              <h1>Motivo da revogação:</h1>
                              <p className='text-2xl'>{ban.removed_by_reason ? ban.removed_by_reason : 'Não informado.'}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                              <img src={`https://minotar.net/armor/bust/${ban.removed_by_name}/80`}></img>
                              <h1 className='pt-2 -mb-1'>Revogado por:</h1>
                              <p className='text-2xl'>{ban.removed_by_name}</p>
                            </div>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const { id } = query
    let error

    const ban = await apiWay
      .get(`http://way.redebattle.com.br/api/v1/banimentos/id/${id}`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getPunicoes', e)
        return error === true
      })

      console.log(ban)

    return {
      props: { ban, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
