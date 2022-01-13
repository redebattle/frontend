import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import ErrorAPI from '../../components/ErrorAPI'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { FaGift, FaMoneyBillWave, FaMoneyBillWaveAlt, FaQuestionCircle, FaShoppingBasket, FaShoppingCart, FaStar, FaTag, FaTrash, FaTrashAlt } from 'react-icons/fa'
import Payments from '../../components/Loja/Payments'

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
        <div className="flex sm:flex-col lg:flex-row mt-8 m-3">
          <div className='flex flex-col w-full mr-6'>
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-4 lg:ml-5 sm:ml-0 sm:mt-0'>
              <h1 className='p-3 text-xl uppercase font-bold flex items-center flex-row'><FaShoppingBasket className='mr-2' />Checkout</h1>
              <p className='pl-3 pb-3 text-sm uppercase font-bold'>Você está comprando...</p>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 lg:ml-5 mb-3 sm:ml-0 sm:mt-3'>
              <div className='flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center'>
                <img className='w-20 h-20 rounded-lg' src="/img/sem-foto.png" />
                <h1 className='text-xl sm:text-sm font-bold lg:m-0 sm:mt-2'>VIP 1</h1>
                <h1 className='text-xl sm:text-sm font-bold p-1 lg:m-0 sm:mb-2'>R$ 10,00</h1>
                <div className='flex flex-row items-center'>
                  <button className="bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-b-2 border-purple-700 rounded-full font-bold text-white lg:w-9 lg:h-9 sm:w-6 sm:h-6 mr-4">-</button>
                  <h1>1</h1>
                  <button className="bg-purple-600 hover:bg-purple-800 hover:border-purple-800 border-b-2 border-purple-700 rounded-full font-bold text-white lg:w-9 lg:h-9 sm:w-6 sm:h-6 ml-4">+</button>
                  <button className="bg-red-600 hover:bg-red-900 hover:border-red-900 border-b-2 border-red-700 rounded-full font-bold text-white lg:w-9 lg:h-9 sm:w-6 sm:h-6 ml-6 flex items-center justify-center"><FaTrashAlt /></button>
                </div>
              </div>
            </div>
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mt-3 lg:ml-5 sm:ml-0 sm:mt-0'>
              <h1 className='p-1 text-xl uppercase font-bold flex flex-row items-center'><FaMoneyBillWave className='mr-2' />PAGAMENTO</h1>
            </div>
            <div className='flex flex-col items-center justify-center mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 lg:ml-5 sm:ml-0 sm:mt-3'>
              <div className='flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center p-4 text-normal'>
                <h1>Pagamentos via cartão de cédito, ou saldo em conta, geralmente, são aprovados imediatamente. Boletos podem demorar até 2 dias úteis, após o pagamento, para serem aprovados.</h1>
              </div>
              <div className='my-6 bg-dark4 p-4 rounded-lg w-64 h-auto hover:border-2 hover:border-mercadopago hover:to-mercadopago2 cursor-pointer'>
                <img className='grayscale hover:grayscale-0' src='/img/mercado-pago.svg' />
              </div>
              <div className='p-4'>
                <input type="checkbox" className="mr-2 checkbox checkbox-primary focus:border-transparent focus:ring-0" />
                Li e estou ciente dos <a className='font-bold text-roxo underline hover:text-purple-700' href='/loja/termos'>Termos de Compra</a> para os produtos que estou adquirindo.
              </div>
              <div className='p-4 mt-4'>
                <button className="flex items-center justify-center px-4 bg-purple-500 focus:outline-none hover:bg-purple-700 border-b-4 border-black rounded-lg text-base w-64 h-12">
                  Finalizar pedido
                </button>
              </div>
              <div className='text-xs'>
                Seu IP XXXXX está sendo gravado por segurança.
              </div>
            </div>
          </div>
          <div className='flex flex-col h-auto w-auto lg:ml-5 sm:ml-0 sm:mt-3'>
            <div className='bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
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
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <div className='flex flex-col items-center text-xl font-bold p-2'>
                <div className='flex flex-row items-center justify-center uppercase'>
                  <FaTag className='mr-2' />
                  <h1>Cupom de desconto</h1>
                </div>
                <div className='flex items-center justify-center text-center p-3'>
                  <p className='text-sm font-normal'>Possui um cupom? Informe-o abaixo para receber seu desconto.<br /> Caso contrário, deixe em branco.</p>
                </div>
                <div className="flex p-4">
                  <input
                    type="text"
                    id="cupom"
                    className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                    placeholder="Código do cupom..."
                  />
                  <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <div className='flex flex-col items-center text-xl font-bold p-2'>
                <div className='flex flex-row items-center justify-center uppercase'>
                  <FaGift className='mr-2' />
                  <h1>Presente</h1>
                </div>
                <div className='flex items-center justify-center text-center p-3'>
                  <p className='text-sm font-normal'>É presente? Então informe o nickname do presenteado abaixo. <br /> Caso contrário, deixe em branco.</p>
                </div>
                <div className="flex p-4">
                  <input
                    type="text"
                    id="nickname"
                    className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                    placeholder="Nickname do presenteado"
                  />
                  <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none  hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <div className='flex flex-col items-center text-xl font-bold p-2'>
                <div className='flex flex-row items-center justify-center uppercase'>
                  <FaGift className='mr-2' />
                  <h1>GIFT CARD</h1>
                </div>
                <div className='flex items-center justify-center text-center p-3'>
                  <p className='text-sm font-normal'>Possui um giftcard? Resgate-o aqui.<br /> Caso contrário, deixe em branco.</p>
                </div>
                <div className="flex p-4">
                  <input
                    type="text"
                    id="giftcard"
                    className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                    placeholder="Código do giftcard..."
                  />
                  <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none  hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <div className='flex flex-col items-center text-xl font-bold p-2'>
                <div className='flex flex-row items-center justify-center uppercase'>
                  <FaGift className='mr-2' />
                  <h1>AFILIADO</h1>
                </div>
                <div className='flex items-center justify-center text-center p-3'>
                  <p className='text-sm font-normal'>Possui um código de afiliado? Use-o aqui. <br /> Caso contrário, deixe em branco.</p>
                </div>
                <div className="flex p-4">
                  <input
                    type="text"
                    id="afiliado"
                    className="px-4 py-2 w-52 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-b-4 border-black rounded-l-lg"
                    placeholder="Código do afiliado..."
                  />
                  <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none  hover:bg-purple-700 border-b-4 border-black rounded-r-lg text-base">
                    Aplicar
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
