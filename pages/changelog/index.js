/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import { format, intlFormat, isToday } from 'date-fns'
import { useEffect, useState, useMemo } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import Error from 'next/error'
import Link from 'next/link'
import Router from 'next/router'

import Manutencao from '../../components/Manutencao'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import api from '../../service/api'
const News = ({ id, titulo, topicos, categoria, data }) => {
  const [dataAtt, setDataAtt] = useState(data)
  useEffect(() => {
    api.get('').then(response =>
      setDataPost(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(data))
      )
    )
  }, [dataAtt])

  return (
    <div className="justify-center shadow-md sm:w-full bg-dark2 ">
      <div className="py-5 px-5 space-y-2 sm:space-x-3 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 sm:w-full border border-dark3">
        <div className="bg-purple-600 border-b-4 border-purple-700 p-5">
          <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
            {categoria}
          </h1>
          <h1 className="text-white font-semibold text-3xl sm:text-xl tracking-tight">
            {titulo}
          </h1>
        </div>
        <div className="bg-dark2 tracking-tight border border-dark3 align-middle items-center pb-3 mb-6">
          <p
            className="px-3 py-5 border-current sm:text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: topicos }}
          ></p>
        </div>
      </div>
    </div>
  )
}

export default function Changelog({ changelogs, error, manutencao }) {
  console.log(`Changelog: ${changelogs}`)

  if (error === true) {
    return (
      <>
        <Header />
        <Error
          statusCode="503"
          title="Não foi possível realizar a conexão com a API"
        />
        <Footer />
      </>
    )
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
      <title>Changelog | Rede Battle</title>
      {changelogs.map(changelog => {
        const [dataChangelog, setDataChangelog] = useState(changelog.createdAt)
        useEffect(() => {
          api.get('').then(response =>
            setDataChangelog(
              Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }).format(new Date(changelog.createdAt))
            )
          )
        }, [dataChangelog])
        return (
          <div className="container">
            <div className="content">
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-full">
                  <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-10 p-10">
                    <div id="equipe" key={changelog.id}>
                      <div>
                        <h1 className="text-red-600 text-3xl ">
                          {changelog.titulo}
                        </h1>
                      </div>
                      <div className="p-4 flex">{changelog.topicos}</div>
                      <div className="p-4 flex">{dataChangelog}</div>
                      <div className="p-4 flex">{changelog.categoria}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const page = query.pagina || 1

    const changelogs = await api
      .get('/changelog/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
        return (error = true)
      })

    console.log(changelogs)

    if (!changelogs) {
      return (
        <div>
          <h1>Nenhuma atualização foi encontrada.</h1>
        </div>
      )
    }

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return (error = true)
      })

    return {
      props: { changelogs, error: false, manutencao }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
