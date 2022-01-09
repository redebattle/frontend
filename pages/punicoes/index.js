/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { FaSearch } from 'react-icons/fa'
import api from '../../service/api'
import apiWay from '../../service/apiWay'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default function Punicoes({ bans, estatisticas }) {
  return (
    <>
      <title>Punições | Rede Battle</title>
      <Header />
      <div className="INDEX">
        <div className="flex grid grid-rows-1 grid-cols-4 mt-4 md:mt-8 px-12">
          <div className=" pb-4 col-span-3">
            <div className="justify-center  rounded-xl">
              <div className="py-5 px-5 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <table className="bg-dark2 border-b-4 border-black border-opacity-60 table-auto w-full justify-center align-middle items-center">
                  <thead>
                    <tr className="bg-purple-600 text-white font-medium text-xl border-b-4 border-purple-700">
                      <th className="pl-2 pt-3 pb-3">Jogador</th>
                      <th className="pr-3 pt-3 pb-3">Motivo</th>
                      <th className="pr-3 pt-3 pb-3">Autor</th>
                      <th className="pr-3 pt-3 pb-3">Data</th>
                      <th className="pr-3 pt-3 pb-3">Duração</th>
                      <th className="pr-3 pt-3 pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {bans.map(ban => {
                      const [dataBan, setDataBan] = useState(null)
                      useEffect(() => {
                        setDataBan(
                          Intl.DateTimeFormat('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }).format(new Date(ban.time * 1))
                        )
                      }, [dataBan])
                      return (
                        <tr key={ban.id} className="">
                          <td className="p-3 text-gray-300">
                            <div className="flex items-center">
                              <img src={ban.user.avatar} className="p-2" />
                              <Link href={`punicoes/${ban.id}`}>
                                {ban.user.name}
                              </Link>
                            </div>
                          </td>
                          <td className="p-3 text-gray-300">{ban.reason}</td>
                          <td className="p-3 text-gray-300">
                            {ban.banned_by_name}
                          </td>
                          <td className="p-3 text-gray-300">{dataBan}</td>
                          <td className="p-3 text-gray-300">
                            {ban.until < 0 && 'Permanente'}{' '}
                            {ban.until > 0 &&
                              new Date(ban.until * 1).toLocaleDateString(
                                'pt-BR'
                              )}
                          </td>
                          <td className="p-3 text-gray-300">
                            {ban.active === 0 && 'Revogado'}
                            {ban.active !== 0 && 'Ativo'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="Sidebar">
            <div className="pl-10 max-w-md">
              <div className="COMECA AQUI p-3">
                <div className="flex items-center justify-center">
                  <div className="flex">
                    <input
                      type="text"
                      className="px-4 py-2 w-60 bg-dark2 text-gray-200 focus:outline-none"
                      placeholder="Buscar usuário..."
                    />
                    <Link href="?user=">
                      <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none hover:bg-purple-700">
                        <FaSearch className="text-gray-200" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="COMECA AQUI p-3">
                <div className="justify-center">
                  <div className="bg-dark2 border-b-4 border-black border-opacity-60">
                    <h1 className="pt-5 font-semibold text-gray-200 text-center text-xl tracking-tight">
                      Estatísticas
                    </h1>
                    <div className="pt-5 pb-5">
                      <h2 className="text-md text-center text-gray-300 font-light tracking-tight">
                        Punições aplicadas: {estatisticas.total}
                      </h2>

                      <h2 className="text-md text-center text-gray-300 font-light tracking-tight">
                        Usuários punidos: {estatisticas.usuarios}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="COMECA AQUI p-3">
                <div className="justify-center">
                  <div className="bg-dark2 border-b-4 border-black border-opacity-60">
                    <h1 className="pt-5 font-semibold text-white text-center text-xl tracking-tight">
                      Evite punições, conheça as regras!
                    </h1>
                    <div className="flex pt-5 pb-5 items-center justify-center">
                      <Link href="#">
                        <button className="bg-purple-600 border-b-4 border-purple-700 transform hover:scale-110 transition delay-60 duration-300 ease-in-out h-10 w-32 font-semibold text-white">
                          Leia mais
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="COMECA AQUI p-3">
                <div className="justify-center">
                  <div className="bg-dark2 border-b-4 border-black border-opacity-60">
                    <h1 className="pt-5 font-semibold text-white text-center text-xl tracking-tight">
                      Contribua com nossa comunidade! Denuncie infratores!
                    </h1>
                    <div className="flex pt-5 pb-5 items-center justify-center">
                      <Link href="#">
                        <button className="bg-purple-600 border-b-4 border-purple-700 transform hover:scale-110 transition delay-60 duration-300 ease-in-out h-10 w-32 font-semibold text-white">
                          Denunciar
                        </button>
                      </Link>
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
  const page = query.pagina || 1

  const bans = await apiWay
    .get('https://way.redebattle.com.br/api/v1/banimentos/all')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getPunicoes', e)
    })

  const estatisticas = await apiWay
    .get('https://way.redebattle.com.br/api/v1/banimentos/estatisticas')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de getEstatisticas', e)
    })

  if (!bans) {
    return (
      <div>
        <h1>Nenhuma punição foi encontrado.</h1>
      </div>
    )
  }
  return {
    props: { bans, estatisticas }
  }
}
