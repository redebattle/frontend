/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'

import api from '../../service/api'
import apiWay from '../../service/apiWay'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Punicoes({ bans, name, manutencao }) {
  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  return (
    <>
      <title>Punições | Rede Battle</title>
      <Header />
      <div className="INDEX">
        <div className="flex grid grid-rows-1 mt-4 md:mt-8 px-12">
          <div className=" pb-4 col-span-3">
            <div className="justify-center  rounded-xl">
              <div className="mb-3 py-5 px-5 space-y-2 sm:py-4 sm:space-y-0 bg-dark2 rounded-lg border-b-4 border-black">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="uppercase font-bold text-4xl p-1 text-gray-300">
                    Punições
                  </h1>
                  <p className="pb-1 text-gray-300">PUNIÇÕES DE "{name}"</p>
                </div>
              </div>
              <div className="py-5 px-5 space-y-2 sm:py-4 sm:space-y-0 bg-dark2 rounded-lg border-b-4 border-black">
                {/* VERIFICA SE POSSUI VALOR */}
                {bans.length === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold p-2">YEAH!</h1>
                    <h1 className="text-xl pb-2 sm:text-center">
                      "{name}" é um jogador exemplar e nunca foi punido!
                    </h1>
                    <img className="p-2" src="/img/YEAH-punishments.png" />
                  </div>
                )}
                {bans.map(ban => {
                  const [dataBan, setDataBan] = useState(null)
                  const [hoursBan, setHoursBan] = useState(null)
                  useEffect(() => {
                    setDataBan(
                      Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).format(new Date(ban.time * 1))
                    )
                  }, [dataBan])
                  useEffect(() => {
                    setHoursBan(
                      Intl.DateTimeFormat('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(ban.time * 1))
                    )
                  }, [hoursBan])
                  return (
                    <div className="p-1">
                      <div class="collapse border rounded-box border-base-300 collapse-plus border-b-2 border-dark">
                        <input type="checkbox" />
                        <div class="collapse-title text-base font-medium flex items-center">
                          <FaClock className="mr-2 text-sm" /> {hoursBan}{' '}
                          <img
                            src={`https://minotar.net/avatar/${name}/25`}
                            className="ml-5 mr-2 rounded-md"
                          ></img>
                          {name} foi banido por {ban.reason} (#{ban.id})
                        </div>
                        <div class="collapse-content flex flex-col">
                          {(ban.active && (
                            //PUNIÇÕES ATIVAS
                            <div className="flex flex-row justify-between p-2 bg-red-600 bg-opacity-25 rounded-lg border-b-2 border-dark3">
                              <p>
                                Motivo: <br />
                                {ban.reason}
                              </p>
                              <p>
                                Término: <br />
                                {ban.until <= 0 && (
                                  <span class="badge badge-outline text-red-400 font-bold">
                                    Permanente
                                  </span>
                                )}
                                {ban.until > 0 &&
                                  new Date(ban.until * 1).toLocaleDateString(
                                    'pt-BR'
                                  )}
                              </p>
                              <p>
                                Status: <br />
                                {!ban.active &&
                                  ban.removed_by_name === '#expired' && (
                                    <span class="badge badge-outline text-lime-400 font-bold">
                                      Finalizado
                                    </span>
                                  )}
                                {!ban.active &&
                                  ban.removed_by_name !== '#expired' && (
                                    <span class="badge badge-outline text-yellow-600 font-bold">
                                      Revogado
                                    </span>
                                  )}
                                {ban.active && (
                                  <span class="badge badge-outline text-red-400 font-bold">
                                    Ativo
                                  </span>
                                )}
                                {ban.ipban && (
                                  <span class="badge badge-outline text-dark ml-2 font-bold">
                                    IPBan
                                  </span>
                                )}
                                {ban.silent && (
                                  <span class="badge badge-outline text-gray-500 ml-2 font-bold">
                                    Silenciado
                                  </span>
                                )}
                              </p>
                              <p>
                                Banido por: <br />
                                <div className="flex justify-between">
                                  <img
                                    src={`https://minotar.net/avatar/${ban.banned_by_name}/25`}
                                    className="mr-2 rounded-md"
                                  ></img>
                                  {ban.banned_by_name}
                                </div>
                              </p>
                              <p>
                                Banido em: <br />
                                {dataBan} às {hoursBan}
                              </p>
                            </div>
                          )) ||
                            (!ban.active &&
                              ban.removed_by_name === '#expired' && (
                                //PUNIÇÕES FINALIZADAS
                                <div className="flex flex-row justify-between p-2 bg-lime-600 bg-opacity-25 rounded-lg border-b-2 border-dark3">
                                  <p>
                                    Motivo: <br />
                                    {ban.reason}
                                  </p>
                                  <p>
                                    Término: <br />
                                    {ban.until <= 0 && (
                                      <span class="badge badge-outline text-red-400 font-bold">
                                        Permanente
                                      </span>
                                    )}
                                    {ban.until > 0 &&
                                      new Date(
                                        ban.until * 1
                                      ).toLocaleDateString('pt-BR')}
                                  </p>
                                  <p>
                                    Status: <br />
                                    {!ban.active &&
                                      ban.removed_by_name === '#expired' && (
                                        <span class="badge badge-outline text-lime-400 font-bold">
                                          Finalizado
                                        </span>
                                      )}
                                    {!ban.active &&
                                      ban.removed_by_name !== '#expired' && (
                                        <span class="badge badge-outline text-yellow-600 font-bold">
                                          Revogado
                                        </span>
                                      )}
                                    {ban.active && (
                                      <span class="badge badge-outline text-red-400 font-bold">
                                        Ativo
                                      </span>
                                    )}
                                    {ban.ipban && (
                                      <span class="badge badge-outline text-dark ml-2 font-bold">
                                        IPBan
                                      </span>
                                    )}
                                    {ban.silent && (
                                      <span class="badge badge-outline text-gray-500 ml-2 font-bold">
                                        Silenciado
                                      </span>
                                    )}
                                  </p>
                                  <p>
                                    Banido por: <br />
                                    <div className="flex justify-between">
                                      <img
                                        src={`https://minotar.net/avatar/${ban.banned_by_name}/25`}
                                        className="mr-2 rounded-md"
                                      ></img>
                                      {ban.banned_by_name}
                                    </div>
                                  </p>
                                  <p>
                                    Banido em: <br />
                                    {dataBan} às {hoursBan}
                                  </p>
                                </div>
                              )) || (
                              // PUNIÇÕES REVOGADAS
                              <div className="flex flex-row justify-between p-2 bg-dark2 rounded-lg border-b-2 border-black">
                                <p>
                                  Motivo: <br />
                                  {ban.reason}
                                </p>
                                <p>
                                  Término: <br />
                                  {ban.until <= 0 && (
                                    <span class="badge badge-outline text-red-400 font-bold">
                                      Permanente
                                    </span>
                                  )}
                                  {ban.until > 0 &&
                                    new Date(ban.until * 1).toLocaleDateString(
                                      'pt-BR'
                                    )}
                                </p>
                                <p>
                                  Status: <br />
                                  {!ban.active &&
                                    ban.removed_by_name === '#expired' && (
                                      <span class="badge badge-outline text-lime-400 font-bold">
                                        Finalizado
                                      </span>
                                    )}
                                  {!ban.active &&
                                    ban.removed_by_name !== '#expired' && (
                                      <span class="badge badge-outline text-yellow-600 font-bold">
                                        Revogado
                                      </span>
                                    )}
                                  {ban.active && (
                                    <span class="badge badge-outline text-red-400 font-bold">
                                      Ativo
                                    </span>
                                  )}
                                  {ban.ipban && (
                                    <span class="badge badge-outline text-dark ml-2 font-bold">
                                      IPBan
                                    </span>
                                  )}
                                  {ban.silent && (
                                    <span class="badge badge-outline text-gray-500 ml-2 font-bold">
                                      Silenciado
                                    </span>
                                  )}
                                </p>
                                <p>
                                  Banido por: <br />
                                  <div className="flex justify-between">
                                    <img
                                      src={`https://minotar.net/avatar/${ban.banned_by_name}/25`}
                                      className="mr-2 rounded-md"
                                    ></img>
                                    {ban.banned_by_name}
                                  </div>
                                </p>
                                <p>
                                  Banido em: <br />
                                  {dataBan} às {hoursBan}
                                </p>
                              </div>
                            )}
                          {
                            // REVOGAÇÃO
                            !ban.active && ban.removed_by_name !== '#expired' && (
                              <div className="flex flex-row justify-between p-3 bg-dark2 rounded-lg mt-2 border-b-2 border-black">
                                {ban.removed_by_name !== '#expired' && (
                                  <p>
                                    Revogado por: <br />{' '}
                                    <div className="flex">
                                      <img
                                        src={`https://minotar.net/avatar/${
                                          ban.removed_by_name
                                            ? ban.removed_by_name
                                            : 'herobrine'
                                        }/25`}
                                        className="mr-2 rounded-md"
                                      ></img>
                                      {ban.removed_by_name
                                        ? ban.removed_by_name
                                        : 'Não informado.'}
                                    </div>
                                  </p>
                                )}
                                {ban.removed_by_name !== '#expired' && (
                                  <p>
                                    Motivo da revogação: <br />{' '}
                                    {ban.removed_by_reason
                                      ? ban.removed_by_reason
                                      : 'Não informado.'}
                                  </p>
                                )}
                                {ban.removed_by_name !== '#expired' && (
                                  <p>
                                    Revogado em: <br />{' '}
                                    {Intl.DateTimeFormat('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric'
                                    }).format(
                                      new Date(ban.removed_by_date)
                                    )}{' '}
                                    às{' '}
                                    {Intl.DateTimeFormat('pt-BR', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    }).format(new Date(ban.removed_by_date))}
                                  </p>
                                )}
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  )
                })}
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
  const { name } = query
  let error

  const manutencao = await api
    .get('/configuracoes/manutencao/check')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
      return error === true
    })

  const bans = await api
    .get(`/banimentos/check/${name}`)
    .then(res => res.data.punicoes)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getPunicoes', e)
    })

  return {
    props: { bans, name, manutencao }
  }
}
