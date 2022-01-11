import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import ErrorAPI from '../../components/ErrorAPI'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { FaBarcode, FaCarAlt, FaCartPlus, FaCcMastercard, FaCcVisa, FaChartLine, FaQrcode, FaQuestion, FaQuestionCircle, FaShoppingCart, FaStar } from 'react-icons/fa'
import Payments from '../../components/Payments'

export default function Loja({error, manutencao }) {

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
                <h1 className='p-3 text-xl flex flex-row items-center'>Meta mensal <FaChartLine className='ml-2' /></h1>
                <div className='flex flex-row justify-between items-center'>
                  <h1 className='text-xl'>R$ 1,00 / R$ 10,00</h1>
                  <div class="badge ml-2 bg-roxo">10%</div>
                </div>
                <div class="-mt-4 p-6 space-y-2 artboard phone">
                  <progress class="progress progress-primary" value="10" max="100"></progress>
                </div>
              </div>
            <div className='mt-2 w-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
              <h1 className='p-3 text-xl'>Selecione o servidor</h1>
              <div className='flex flex-col p-3 mb-3'>
                <button className="bg-purple-600 border-b-4 border-purple-700 rounded-lg h-16 w-56 sm:text-sm font-medium text-white">
                  <div className='flex flex-col items-center'>
                  Lobby
                  <div class="badge bg-youtube font-bold">10% OFF</div>
                  </div>
                </button>
                <button className="mt-4 bg-purple-600 border-b-4 border-purple-700 rounded-lg h-16 w-56 sm:text-sm font-medium text-white">
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
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-6 ml-5'>
              <div class="alert alert-error mb-3">
                <div class="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                  <label>Atenção! Leia os termos antes da compra.</label>
                </div>
              </div>
              <text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nobis ut, placeat corrupti eum autem eligendi excepturi id ipsum explicabo deleniti, cumque maxime?
                Vero delectus dolore explicabo distinctio quaerat sequi! Officia?<br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nobis ut, placeat corrupti eum autem eligendi excepturi id ipsum explicabo deleniti, cumque maxime?
                Vero delectus dolore explicabo distinctio quaerat sequi! Officia?<br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nobis ut, placeat corrupti eum autem eligendi excepturi id ipsum explicabo deleniti, cumque maxime?
                Vero delectus dolore explicabo distinctio quaerat sequi! Officia?<br /><br />
              </text>
            </div>
            <div className='mt-4 w-full bg-recent-donations-image backdrop-blur-md border-b-4 border-black rounded-lg p-4 ml-5'>
              <div className='p-2'>
                <h1 className='flex flex-row items-center text-xl font-bold'><FaShoppingCart className='mr-1' />ÚLTIMAS COMPRAS</h1>
                <p>Estes são os últimos jogadores que adquiriram produtos em nossa loja.</p>
              </div>
              <div className='flex flex-wrap items-center justify-center'>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className='m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center'>
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Payments />
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
