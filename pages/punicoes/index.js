import { useEffect, useState } from 'react'

import apiWay from '../../service/apiWay'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PunicoesSidebar from '../../components/Punicoes/PunicoesSidebar'
import PunicoesIndex from '../../components/Punicoes'
import MetadataComponent from '../../components/Metadata'
import ErrorAPI from '../../components/ErrorAPI'

export default function Punicoes({ bans, estatisticas, error, manutencao }) {

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  if (error) {
    return (
      <ErrorAPI />
    )
  }

  return (
    <>
      <title>Punições | Rede Battle</title>
      <MetadataComponent
        title={`Punições - Rede Battle`}
        description={`Veja todas as punições de jogadores da Rede Battle!`}
        url={`https://redebattle.com.br/punicoes`}
      />
      <Header />
      <div className="INDEX">
        <div className="mt-8 mb-3 mx-6 p-5 space-y-2 sm:py-4 sm:space-y-0 bg-dark2 rounded-lg border-b-4 border-black">
          <div className='flex flex-col items-center justify-center'>
            <h1 className='uppercase font-bold lg:text-4xl p-1 text-gray-300 sm:text-xl'>Punições</h1>
            <p className='pb-1 text-gray-300 sm:text-sm lg:text-base'>REGISTRO GERAL DE PUNIÇÕES</p>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-col mt-8 px-6">
          <div className='flex flex-col mr-6 w-full'>
            <div className="py-5 px-5 space-y-2 sm:py-4 sm:space-y-0 bg-dark2 rounded-lg border-b-4 border-black">
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
                      minute: '2-digit',
                    }).format(new Date(ban.time * 1))
                  )
                }, [hoursBan])
                return (
                  <PunicoesIndex
                    id={ban.id}
                    data={dataBan}
                    horario={hoursBan}
                    autor={ban.banned_by_name}
                    nome={ban.user.name}
                    motivo={ban.reason}
                    termino={ban.until}
                    revogacao_autor={ban.removed_by_name}
                    revogacao_motivo={ban.removed_by_reason}
                    revogacao_data={ban.removed_by_date}
                    ipban={ban.ipban.data}
                    ativo={ban.active.data}
                    silenciado={ban.silent.data}
                  />
                )
              })}
            </div>
          </div>
          <div className='flex flex-col h-auto'>
            <PunicoesSidebar estatisticas={estatisticas} />
          </div>
        </div>
      </div>
      <Footer />
    </>
)
}

export async function getServerSideProps({ query }) {
  try {
    const page = query.pagina || 1

    const bans = await apiWay
      .get('https://way.redebattle.com.br/api/v1/banimentos/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getPunicoes', e)
        return (error = true)
      })

    const estatisticas = await apiWay
      .get('https://way.redebattle.com.br/api/v1/banimentos/estatisticas')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getEstatisticas', e)
        return (error = true)
      })

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return error === true
      })

    if (!bans) {
      return (
        <div>
          <h1>Nenhuma punição foi encontrado.</h1>
        </div>
      )
    }
    return {
      props: { bans, estatisticas, error: false, manutencao }
    }
  } catch (e) {
    return {
      props: { error: true}
    }
  }
}
