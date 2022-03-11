/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'

import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ErrorAPI from '../../components/ErrorAPI'

export default function Changelog({ changelogs, error, manutencao }) {
  console.log(`Changelog: ${changelogs}`)

  if (error === true) {
    return (
      <>
        <ErrorAPI />
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
      {(changelogs.isEmpty && (
        <div>
          <h1>Teste</h1>
        </div>
      )) ||
        changelogs.map(changelog => {
          const [dataChangelog, setDataChangelog] = useState(
            changelog.createdAt
          )
          useEffect(() => {
            setDataChangelog(
              Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }).format(new Date(changelog.createdAt))
            )
          }, [dataChangelog])
          return (
            // eslint-disable-next-line react/jsx-key
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
    let error
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
