/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '../../service/api'
import apiWay from '../../service/apiWay'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ErrorAPI from '../../components/ErrorAPI'
import MetadataComponent from '../../components/Metadata'
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
                  <div className="bg-dark2 p-10 text-center w-full rounded-lg border-b-4 border-black">
                    <h1 className="text-gray-300 text-4xl font-bold mb-3">
                      Opsssss....
                    </h1>
                    <h1 className="text-gray-300 text-xl font-medium">
                      Não encontrei nenhuma punição com esse ID.
                    </h1>
                    <div className='flex justify-center mt-5'>
                      <img className='w-32 h-32' src='/img/death-emoji.png'></img>
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

  if (error) {
    return (
      <>
        <ErrorAPI />
      </>
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
      <MetadataComponent
        title={`Punições de ${ban?.user?.nome} - Rede Battle`}
        description={`Veja as punições do jogador ${ban?.user?.nome} na Rede Battle!`}
        url={`https://redebattle.com.br/punicoes/${ban?.id}`}
      />
      <Header />
      <div className="INDEX">
        <div className="flex justify-center lg:flex-row sm:flex-col mt-4 md:mt-8 px-12">
          <div className=" pb-4 col-span-3">
            <div className="justify-center rounded-xl">
              <div className="sm:flex sm:items-center">
                <div className='w-full h-auto'>
                  <div className='bg-dark2 p-4 rounded-lg border-b-4 border-black'>
                    <h1 className='font-bold'>Banimento #{ban.id} {parseInt(ban.active.data) === 0 && ban.removed_by_name === '#expired' && <span class="badge badge-outline text-lime-400 ml-2">Finalizado</span>}
                      {parseInt(ban.active.data) === 0 && ban.removed_by_name !== '#expired' && <span class="badge badge-outline text-yellow-600 ml-2">Revogado</span>}
                      {parseInt(ban.active.data) === 1 && <span class="badge badge-outline text-red-400 ml-2">Ativo</span>}
                      {parseInt(ban.ipban.data) === 1 && <span class="badge badge-outline text-dark ml-2">IPBan</span>}
                      {parseInt(ban.silent.data) === 1 && <span class="badge badge-outline text-gray-500 ml-2">Silenciado</span>}
                    </h1>
                  </div>
                  <div className='flex lg:flex-row lg:items-start sm:flex-col sm:justify-center sm:items-center'>
                    <div className='flex lg:flex-col sm:flex-row px-4'>
                      <div className='bg-dark2 p-3 rounded-lg m-4 h-auto w-full border-b-4 border-black'>
                        <div className='flex flex-col items-center justify-center'>
                          <h1 className='p-2 sm:text-sm'>Usuário punido:</h1>
                          <img className='p-1' src={`https://minotar.net/armor/bust/${ban.user.name}/120`}></img>
                          <h1 className='p-2 text-2xl'>{ban.user.name}</h1>
                        </div>
                      </div>
                      <div className='bg-dark2 p-4 rounded-lg m-4 h-auto w-full border-b-4 border-black'>
                        <div className='flex flex-col justify-center items-center'>
                          <h1 className='p-2'>Banido por:</h1>
                          <img className='p-1' src={`https://minotar.net/armor/bust/${ban.banned_by_name}/120`}></img>
                          <p className='text-2xl p-1'>{ban.banned_by_name}</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col w-full p-12 sm:p-1'>
                      {parseInt(ban.active.data) !== 0 && ban.removed_by_name !== '#expired' &&
                      // ATIVA
                      <div className='bg-red-400 bg-opacity-25 p-4 rounded-lg m-4 ml-10 h-auto border-b-4 border-black'>
                        <div className='flex lg:flex-row sm:flex-col lg:justify-between sm:justify-center items-center h-auto p-10'>
                          <div className='flex flex-col justify-center items-center w-96'>
                            <h1>Banido em:</h1>
                            <p className='text-lg mb-2'>{Intl.DateTimeFormat('pt-BR', {
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
                            <p className='text-2xl sm:text-lg mb-2'>{ban.reason}</p>
                          </div>
                          <div className='flex flex-col justify-center items-center'>
                            <h1>Término:</h1>
                            <p className='text-2xl sm:text-lg'>
                              {ban.until < 0 && <span class="badge badge-outline text-red-500">Permanente</span>}
                              {ban.until > 0 &&new Date(ban.until * 1).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div> ||
                      // TERMINADA
                      <div className='bg-lime-400 p-6 bg-opacity-25 p-4 rounded-lg m-4 ml-10 h-auto border-b-4 border-black'>
                        <div className='flex lg:flex-row sm:flex-col lg:justify-between sm:justify-center items-center h-auto p-10'>
                          <div className='flex flex-col justify-center items-center w-96'>
                            <h1>Banido em:</h1>
                            <p className='text-lg mb-2'>{Intl.DateTimeFormat('pt-BR', {
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
                            <p className='text-lg mb-2'>{ban.reason}</p>
                          </div>
                          <div className='flex flex-col justify-center items-center'>
                            <h1>Término:</h1>
                            <p className='text-lg'>
                              {ban.until < 0 && <span class="badge badge-outline text-red-500">Permanente</span>}
                              {ban.until > 0 &&new Date(ban.until * 1).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>}
                      {parseInt(ban.active.data) !== 1 && ban.removed_by_name !== '#expired' &&
                      // REVOGADA
                      <div className='bg-dark2 rounded-lg m-4 ml-10 w-auto h-auto border-b-4 border-black'>
                        <div className='flex lg:flex-row sm:flex-col lg:justify-between sm:justify-center items-center h-auto p-10'>
                          <div className='flex flex-col justify-center items-center w-96'>
                            <h1>Revogado em:</h1>
                            <p className='text-lg mb-2'>{Intl.DateTimeFormat('pt-BR', {
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
                            <p className='text-lg mb-2'>{ban.removed_by_reason ? ban.removed_by_reason : 'Não informado.'}</p>
                          </div>
                          <div className='flex flex-col justify-center items-center'>
                            <h1 className='pb-2'>Revogado por:</h1>
                            <img src={`https://minotar.net/armor/bust/${ban.removed_by_name}/80`}></img>
                            <p className='text-lg'>{ban.removed_by_name}</p>
                          </div>
                        </div>
                      </div>}
                    </div>
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

export async function getServerSideProps({ query }) {
  try {
    const { id } = query
    let error

    const ban = await apiWay
      .get(`https://way.redebattle.com.br/api/v1/banimentos/id/${id}`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getPunicoes', e)
        return error === true
      })

    return {
      props: { ban, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
