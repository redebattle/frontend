import api from '../../../../service/api'

import Manutencao from '../../../../components/Manutencao'
import ErrorAPI from '../../../../components/ErrorAPI'
import Footer from '../../../../components/Footer'
import Header from '../../../../components/Header'
import { FaQuestionCircle, FaShoppingCart, FaStar } from 'react-icons/fa'
import Payments from '../../../../components/Loja/Payments'
import ServidorCategoria from '..'
import LojaServidorComponent from '../../../../components/Loja/Servidor'
import LojaMetaComponent from '../../../../components/Loja/Meta'
import LojaCategoriaComponent from '../../../../components/Loja/Categoria'

export default function LojaProdutos({error, manutencao }) {

  if (error) {
    return (
      <ErrorAPI />
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
      <div className="INDEX">
        <title>Loja | Rede Battle</title>
        <div className="flex lg:flex-row sm:flex-col mt-8 px-6">
          <div className='flex flex-col h-auto'>
            <LojaCategoriaComponent />
            <LojaServidorComponent />
          </div>
          <div className='flex flex-col mr-6 w-full'>
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3'>
              <h1 className='flex flex-row items-center text-xl font-bold'>SERVIDOR: RANKUP</h1>
            </div>
            <div className='mt-4 w-full bg-recent-donations-image backdrop-blur-md border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3'>
              <div className='p-2 flex flex-col items-center justify-center'>
                <h1 className='flex flex-row items-center text-xl font-bold'>VIPS</h1>
                <p>Uma descrição para a categoria.</p>
              </div>
              <div className='flex flex-wrap items-center justify-center'>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
                  <img className='w-44 h-40' src="/img/sem-foto.png" />
                  <h1 className='pt-2 font-bold text-2xl'>VIP</h1>
                  <h1 className='text-xl text-lime-500 font-bold'>R$ 10,00</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Detalhes
                  </button>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Adicionar ao carrinho
                  </button>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
                  <div class="badge bg-youtube badge-lg -mt-5 mb-3 p-4 font-bold">
                    10% OFF
                  </div>
                  <img className='w-44 h-40' src="/img/sem-foto.png" />
                  <h1 className='pt-2 font-bold text-2xl'>VIP</h1>
                  <h1 className='text-xs text-white font-bold'><s>R$ 10,00</s></h1>
                  <h1 className='text-2xl text-yellow-500 font-bold'>R$ 9,00</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Detalhes
                  </button>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-6 p-4 sm:mx-1 sm:p-2'>
        <Payments />
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const manutencao = await api
    .get('/configuracoes/manutencao/check')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
      return error === true
    })
  return {
    props: {
      error: false,
      manutencao
    }
  }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
