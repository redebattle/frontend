import api from '../../../service/api'

import Manutencao from '../../../components/Manutencao'
import ErrorAPI from '../../../components/ErrorAPI'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import { FaQuestionCircle, FaShoppingCart, FaStar } from 'react-icons/fa'

export default function ServidorCategoria({error, manutencao }) {

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
        <div className="flex mt-8 px-6">
          <div className='flex flex-col h-auto'>
            <div className='w-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
                <h1 className='p-3 text-xl'>Meta mensal</h1>
                <h1 className='text-xl'>10%</h1>
                <div class="-mt-4 p-6 space-y-2 artboard phone">
                  <progress class="progress progress-primary" value="10" max="100"></progress>
                </div>
              </div>
            <div className='mt-2 w-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
              <h1 className='p-3 text-xl'>Selecione o servidor</h1>
              <div className='flex flex-col p-3'>
                <button className="bg-purple-600 border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white">
                  RankUP
                </button>
                <button className="mt-4 bg-purple-600 border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white">
                  RankUP
                </button>
              </div>
            </div>
            <div className='bg-top-donator-image bg-opacity-25 rounded-lg border-b-4 border-black flex flex-col items-center justify-center mt-2 p-4'>
              <FaStar className='text-yellow-400 text-4xl' />
              <h1 className='p-1 text-xl uppercase font-bold'>Jogador em destaque</h1>
              <p className='text-sm -mt-1'>Este e o jogador que mais contribuiu neste mês.</p>
              <p className='text-sm pt-2'>TheMito</p>
              <img className='pb-4' src='https://mc-heads.net/body/TheMito/100' />
            </div>
          </div>
          <div className='flex flex-col mr-6 w-full'>
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-4 ml-5'>
              <h1 className='flex flex-row items-center text-xl font-bold'>SERVIDOR: RANKUP</h1>
            </div>
            <div className='mt-4 w-full bg-recent-donations-image backdrop-blur-md border-b-4 border-black rounded-lg p-4 ml-5'>
              <div className='p-2'>
                <h1 className='flex flex-row items-center text-xl font-bold'>Categoria</h1>
                <p>Selecione uma categoria.</p>
              </div>
              <div className='flex flex-wrap items-center justify-center'>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img className='w-44 h-40' src="/img/sem-foto.png" />
                  <h1 className='pt-2 font-bold text-2xl uppercase'>VIP</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Acessar
                  </button>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img className='w-44 h-40' src="/img/sem-foto.png" />
                  <h1 className='pt-2 font-bold text-2xl uppercase'>Cash</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Acessar
                  </button>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img className='w-44 h-40' src="/img/sem-foto.png" />
                  <h1 className='pt-2 font-bold text-2xl uppercase'>Combo</h1>
                  <button className="mt-2 bg-purple-600 hover:bg-purple-700 border-b-4 border-purple-700 rounded-lg h-10 w-40 sm:text-sm font-medium text-white">
                    Acessar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-dark2 border-b-4 border-black m-6 ml-4 p-4 rounded-lg'>
        <div className='p-4'>
          <h1 className='text-xl text-yellow-500 flex flex-row items-center'><FaQuestionCircle className='mr-2' />Precisa de ajuda? Clique aqui.</h1>
          <p className='mt-3'>
            Aceitamos várias formas de pagamento, incluindo as principais bandeiras de cartão de crédito, boleto bancário, Pix, MercadoPago e PayPal.
          </p>
        </div>
        <div className='flex flex-row p-4 items-center justify-center'>
          <img src="/img/payment_methods.png" alt="" />
        </div>
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
