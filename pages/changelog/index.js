/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'

import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ErrorAPI from '../../components/ErrorAPI'

export default function Changelog({
  changelogs,
  changelogsCategories,
  statusCode,
  manutencao
}) {
  if (statusCode?.code !== 200) {
    return <ErrorAPI statusCode={statusCode} />
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
      <div className="container">
        <div className="flex lg:flex-row sm:flex-col mt-8 px-2">
          <div className="flex flex-col h-auto">
            <div className="mt-3 ml-4 flex flex-col items-center justify-center bg-dark2 rounded-lg p-2">
              <h1 className="p-3 text-lg font-medium">Categorias</h1>
              <div className="flex flex-col p-3 mb-3">
                {changelogsCategories.map(category => {
                  return (
                    <div className="flex flex-row w-52 justify-center">
                      <button className="flex flex-row w-full hover:bg-dark5 hover:rounded-lg hover:bg-opacity-20 p-2 font-medium text-sm">
                        <div
                          className="mx-2 w-2 h-full rounded-lg"
                          style={{ background: category.color }}
                        />
                        {category.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {(changelogs.length === 0 && (
              <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3">
                <h1>Nenhuma atualização foi encontrada.</h1>
              </div>
            )) ||
              changelogs.map(changelog => {
                const [dataChangelog, setDataChangelog] = useState(
                  changelog.createdAt
                )
                const [horaChangelog, sethoraChangelog] = useState(
                  changelog.createdAt
                )
                useEffect(() => {
                  setDataChangelog(
                    Intl.DateTimeFormat('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }).format(new Date(changelog.createdAt))
                  )
                }, [dataChangelog])
                useEffect(() => {
                  sethoraChangelog(
                    Intl.DateTimeFormat('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(changelog.createdAt))
                  )
                }, [horaChangelog])
                return (
                  <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3">
                    <div className="flex flex-col w-full">
                      <div id="equipe" key={changelog.id}>
                        <div className="flex justify-between px-4 py-1">
                          <div className="flex flex-row items-center justify-center">
                            {changelog.categories.map(category => {
                              return (
                                <div
                                  className="mx-2 badge badge-outline text-gray-300 border-transparent rounded-lg p-4 text-xs font-bold uppercase"
                                  style={{
                                    backgroundColor: category.color
                                  }}
                                >
                                  {category.name}
                                </div>
                              )
                            })}
                          </div>
                          <div className="text-sm">
                            {dataChangelog} às {horaChangelog}
                          </div>
                        </div>
                        <div className="p-4">
                          <h1 className="text-white font-bold text-2xl my-1">
                            {changelog.title}
                          </h1>
                          <div
                            className="flex my-4"
                            dangerouslySetInnerHTML={{
                              __html: changelog.content
                            }}
                          ></div>
                          <div className="flex items-center mt-6">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={`https://cravatar.eu/helmavatar/${changelog.author.username}/96`}
                              alt="Avatar"
                            />
                            <p className="mx-2 text-textPrimary">
                              {changelog.author.username}
                            </p>
                          </div>
                          <div className="flex items-center justify-center mt-8">
                            <div className="rounded-full bg-yellow-400 bg-opacity-80 w-8 h-8 mx-1 hover:w-9 hover:h-9 hover:bg-opacity-100" />
                            <div className="rounded-full bg-yellow-400 bg-opacity-80 w-8 h-8 mx-1 hover:w-9 hover:h-9 hover:bg-opacity-100" />
                            <div className="rounded-full bg-yellow-400 bg-opacity-80 w-8 h-8 mx-1 hover:w-9 hover:h-9 hover:bg-opacity-100" />
                            <input
                              type="text"
                              className="bg-dark4 rounded-lg mx-1 text-sm border-none w-[450px] focus:ring-purple-500"
                              placeholder="Escreva um comentário..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    let statusCode = { code: 200 }
    const page = query.pagina || 1

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const changelogs = await api
      .get('/changelog/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const changelogsCategories = await api
      .get('/changelog/categories')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    return {
      props: { changelogs, changelogsCategories, statusCode, manutencao }
    }
  } catch (e) {
    return {
      props: { statusCode: e }
    }
  }
}
