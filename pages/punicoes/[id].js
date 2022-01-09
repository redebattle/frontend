/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '../../service/api'
import apiWay from '../../service/apiWay'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default function Punicoes({ ban, error }) {
  console.log('ERROR:::' + error)
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
      <title>Punições | Rede Battle</title>
      <Header />
      <div className="INDEX">
        <div className="flex grid grid-rows-1 mt-4 md:mt-8 px-12">
          <div className=" pb-4 col-span-3">
            <div className="justify-center  rounded-xl">
              <div className="py-5 px-5 space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                {(!ban && (
                  <div className="bg-dark2 p-10 text-center w-full">
                    <h1 className="text-gray-300 text-xl font-medium">
                      Punição não encontrada.
                    </h1>
                  </div>
                )) || (
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
                      <tr key={ban?.id} className="">
                        <td className="p-3 text-gray-300">
                          <div className="flex items-center">
                            <img
                              src={`https://cravatar.eu/helmavatar/${ban?.user?.name}/40`}
                              className="p-2"
                            />
                            {ban?.user?.name}
                          </div>
                        </td>
                        <td className="p-3 text-gray-300">{ban?.reason}</td>
                        <td className="p-3 text-gray-300">
                          {ban?.banned_by_name}
                        </td>
                        <td className="p-3 text-gray-300">{dataBan}</td>
                        <td className="p-3 text-gray-300">
                          {ban?.until < 0 && 'Permanente'}{' '}
                          {ban?.until > 0 &&
                            new Date(ban.until * 1).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="p-3 text-gray-300">
                          {ban?.active === 0 && 'Revogado'}
                          {ban?.active !== 0 && 'Ativo'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

    return {
      props: { ban, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
