import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import ErrorAPI from '../../components/ErrorAPI'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { FaQuestionCircle, FaShoppingCart, FaStar } from 'react-icons/fa'

export default function LojaCarrinho({error, manutencao }) {

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
        <title>Carrinho | Rede Battle</title>
        <div className="flex mt-8 px-6">
          <div className='flex flex-col mr-6 w-full'>
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <h1 className='p-3 text-xl uppercase font-bold'>Checkout</h1>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <div className='flex flex-row items-center justify-evenly'>
                <img className='w-20 h-20 rounded-lg' src="/img/sem-foto.png" />
                <h1 className='text-xl font-bold'>VIP 1</h1>
                <h1 className='text-xl font-bold'>R$ 10,00</h1>
                <div className='flex flex-row items-center'>
                  <button className="bg-purple-600 hover:bg-purple-700 border-b-2 border-purple-700 rounded-full font-bold text-white w-9 h-9 mr-4">-</button>
                  <h1>1</h1>
                  <button className="bg-purple-600 hover:bg-purple-700 border-b-2 border-purple-700 rounded-full font-bold text-white w-9 h-9 ml-4">+</button>
                  <button className="bg-red-600 hover:bg-red-700 border-b-2 border-red-700 rounded-full font-bold text-white w-9 h-9 ml-6">X</button>
                </div>
              </div>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <div className='flex flex-col items-center'>
                <div>
                  <h1>Possui um cupom?</h1>
                  <input
                      type="text"
                      id="cupom"
                      className="px-4 py-2 w-60 bg-dark text-gray-200 focus:outline-none border-none rounded-lg"
                      placeholder="Código do cupom"
                    />
                </div>
                <div>
                  <h1>Código de referência?</h1>
                  <input
                      type="text"
                      id="cupom"
                      className="px-4 py-2 w-60 bg-dark text-gray-200 focus:outline-none border-none rounded-lg"
                      placeholder="Código do cupom"
                    />
                </div>
              </div>
            </div>
          </div>
            <div className='flex flex-col h-auto w-96'>
              <div className='mw-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
                <h1 className='p-3 text-xl uppercase font-bold'>Detalhes</h1>
              </div>
              <div className='bg-dark2 rounded-lg border-b-4 border-black flex flex-col items-center justify-center mt-2 p-4'>
                <div className='flex flex-col items-center justify-between'>
                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-lg'>Subtotal:</h1>
                    <h1 className='font-bold text-2xl'>R$ 10,00</h1>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-lg'>Desconto:</h1>
                    <h1 className='font-bold text-2xl text-red-500'>- R$ 10,00</h1>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold text-lg'>Valor total:</h1>
                    <h1 className='font-bold text-2xl text-lime-500'>R$ 10,00</h1>
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
