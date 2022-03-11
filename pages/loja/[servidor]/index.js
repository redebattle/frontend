import api from '../../../service/api'

import Manutencao from '../../../components/Manutencao'
import ErrorAPI from '../../../components/ErrorAPI'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import LojaServidorComponent from '../../../components/Loja/Servidor'
import LojaMetaComponent from '../../../components/Loja/Meta'
import LojaJogadorDestaqueComponent from '../../../components/Loja/Destaque'
import Payments from '../../../components/Loja/Payments'

export default function LojaServidor({
  error,
  manutencao,
  servidores,
  getServidor
}) {
  if (error) {
    return <ErrorAPI />
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
      <div className="INDEX">
        <title>Loja | Rede Battle</title>
        <div className="flex lg:flex-row sm:flex-col mt-8 px-6">
          <div className="flex flex-col h-auto">
            <LojaServidorComponent servidores={servidores} />
            <LojaMetaComponent />
            <LojaJogadorDestaqueComponent />
          </div>
          <div className="flex flex-col mr-6 w-full">
            <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-3 lg:ml-5 sm:ml-0 sm:mt-3 flex items-center">
              <img
                src="https://img.icons8.com/clouds/452/minecraft-logo.png"
                alt="icon"
                className="w-32 h-32 lg:block sm:hidden"
              />
              <div>
                <h1 className="flex flex-row items-center lg:text-xl sm:text-sm font-normal uppercase">
                  Você está em:
                </h1>
                <h1 className="flex flex-row items-center lg:text-6xl sm:text-xl font-bold uppercase">
                  {getServidor.nome}
                </h1>
              </div>
            </div>
            <div className="mt-4 w-full bg-recent-donations-image backdrop-blur-md border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3">
              <div className="p-2 flex flex-col items-center justify-center">
                <h1 className="flex flex-row items-center text-xl font-bold">
                  Categoria
                </h1>
                <p>Selecione uma categoria.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center">
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img className="w-44 h-40" src="/img/sem-foto.png" />
                  <h1 className="pt-2 font-bold text-2xl uppercase">VIP</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Acessar
                  </button>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img className="w-44 h-40" src="/img/sem-foto.png" />
                  <h1 className="pt-2 font-bold text-2xl uppercase">Cash</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Acessar
                  </button>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img className="w-44 h-40" src="/img/sem-foto.png" />
                  <h1 className="pt-2 font-bold text-2xl uppercase">Combo</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Acessar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 p-4 sm:mx-1 sm:p-2">
        <Payments />
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    let error
    const { servidor } = context.query

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return error === true
      })

    const servidores = await api
      .get('/servidores/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getServidores', e)
        return error === true
      })

    const getServidor = await api
      .get(`/servidores?nome=${servidor}`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getServidores', e)
        return error === true
      })

    if (!getServidor) {
      return {
        redirect: {
          destination: '/loja/',
          permanent: false
        }
      }
    }

    return {
      props: {
        error: false,
        manutencao,
        getServidor,
        servidores
      }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
