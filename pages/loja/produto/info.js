import api from '../../../service/api'

import Manutencao from '../../../components/Manutencao'
import ErrorAPI from '../../../components/ErrorAPI'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Payments from '../../../components/Loja/Payments'

import { FaStar } from 'react-icons/fa'

export default function InfoProdutos({error, manutencao }) {

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
      <title>Produto | Rede Battle</title>
      <Header />
      <div className="INDEX">
        <div className="flex lg:flex-row sm:flex-col mt-8 px-6">
          <div className='flex flex-col mr-6 w-full'>
            <div className='w-full bg-dark2 border-b-4 border-black rounded-lg p-4 mr-5'>
              <h1 className='p-3 text-xl uppercase font-bold'>Descrição do produto</h1>
            </div>
            <div className='mt-3 w-full bg-dark2 border-b-4 border-black rounded-lg p-5 mr-5 mb-3'>
              <text>
                - Tag [Lorde] no CHAT e TAB do servidor. <br />
                - Vaga reservada caso o servidor esteja lotado. <br />
                - Não perde XP ao morrer. <br />
                - Bônus de 1.50x em todas as habilidades do MCMMO. <br />
                - Limite de homes é 20 (players = 10) <br />
                - Colocar blocos na cabeça com /hat <br />
                - Pode escrever colorido no chat. <br />
                - Pode voar no Mundo TERRENO. <br />
                - Pode criar no maximo 3 terreno (players = 1) <br />
                - Pode vender até 2 itens no mercado! (players = 1) <br />
                - Kit Lorde Diario. <br />
                - Kit Lorde Semanal. <br />
                - Kit Lorde Mensal. <br />
                - Acesso á mina VIP com ( /warp minavip ) <br />
                - Acesso á /loja com 10% de desconto na compra de itens. <br />
                - Acesso ao comando /craft para crafta onde quiser. <br />
                - Acesso ao comando /pot para agrupar poções. <br />
                - Acesso ao comando /sellheads com delay de 3s. <br />
                - Acesso á 10% de desconto no /spawners <br />
                - Acesso á receber 10% a mais de coins em drop da maquina. <br />
                - Acesso ao comando /armazem para ver informações da sua maquina sem ir nela. <br />
                - Acesso ao shift sem delay no /vender (players sem VIP possuem entre 15s - 5s de delay) <br />
              </text>
            </div>
          </div>
          <div className='flex flex-col h-auto'>
            <div className='mw-80 bg-dark2 border-b-4 border-black rounded-lg flex flex-col items-center justify-center'>
              <h1 className='p-3 text-xl uppercase font-bold'>Detalhes</h1>
            </div>
            <div className='bg-top-donator-image bg-opacity-25 rounded-lg border-b-4 border-black flex flex-col items-center justify-center mt-2 p-4 mb-3'>
              <FaStar className='text-yellow-400 text-4xl' />
              <h1 className='p-1 text-xl uppercase font-bold'>VIP CUBE</h1>
              <p className='text-3xl -mt-1 font-bold text-whatsapp'>R$ 10,00</p>
              <img className='w-56 h-56 p-3' src='/img/sem-foto.png'></img>
              <button className="uppercase mt-4 bg-purple-600 border-b-4 border-purple-700 rounded-lg h-10 w-52 sm:text-sm font-medium text-white">
                  Adicionar ao carrinho
              </button>
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
