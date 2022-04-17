import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ErrorAPI from '../../components/ErrorAPI'
import { parseCookies } from 'nookies'
import Router from 'next/router'

export default function Livestream({ statusCode, manutencao }) {
  const { 'twitch.live': userLive } = parseCookies()

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
      <title>Live | Rede Battle</title>
      <div className="bg-dark2 border-b-4 border-black rounded-lg p-6 m-4">
        <script
          type="module"
          src="https://unpkg.com/twitch-stream-embed"
        ></script>
        <twitch-stream
          width="100%"
          channel={userLive}
          muted
          chat
          playing
        ></twitch-stream>
        <div className="flex items-center justify-center">
          <button onClick={() => Router.back()}>Voltar</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    let statusCode = { code: 200 }

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

    return {
      props: { statusCode, manutencao }
    }
  } catch (e) {
    return {
      props: { statusCode: e }
    }
  }
}
