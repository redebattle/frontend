import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import ErrorAPI from '../../components/ErrorAPI'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Metadata from '../../components/Metadata'
import Payments from '../../components/Loja/Payments'
import MetaLoja from '../../components/Loja/Meta'
import LojaMetaComponent from '../../components/Loja/Meta'
import LojaJogadorDestaqueComponent from '../../components/Loja/Destaque'
import LojaServidorComponent from '../../components/Loja/Servidor'

import { FaShoppingCart } from 'react-icons/fa'

export default function Loja({ error, manutencao, servidores }) {
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
        {/* METADATA */}
        <Metadata
          title={'Rede Battle'}
          description={'Site oficial da Rede Battle!'}
          imgURL={'https://redebattle.com.br/img/last-purchases-bg.jpg'}
        />
        <div className="flex lg:flex-row sm:flex-col mt-8 px-6">
          <div className="flex flex-col h-auto">
            <LojaServidorComponent servidores={servidores} />
            <LojaMetaComponent />
            <LojaJogadorDestaqueComponent />
          </div>
          <div className="flex flex-col mr-6 w-full">
            <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3">
              <a href="###">
                <img
                  className="rounded-lg"
                  src="https://i.imgur.com/kg3htGc.png"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full bg-dark2 border-b-4 border-black rounded-lg p-6 lg:ml-5 sm:ml-0 sm:mt-3">
              <div class="alert alert-error mb-3">
                <div class="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 mx-2 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    ></path>
                  </svg>
                  <label>Atenção! Leia os termos antes da compra.</label>
                </div>
              </div>
              <text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                ut, placeat corrupti eum autem eligendi excepturi id ipsum
                explicabo deleniti, cumque maxime? Vero delectus dolore
                explicabo distinctio quaerat sequi! Officia?
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                ut, placeat corrupti eum autem eligendi excepturi id ipsum
                explicabo deleniti, cumque maxime? Vero delectus dolore
                explicabo distinctio quaerat sequi! Officia?
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                ut, placeat corrupti eum autem eligendi excepturi id ipsum
                explicabo deleniti, cumque maxime? Vero delectus dolore
                explicabo distinctio quaerat sequi! Officia?
                <br />
                <br />
              </text>
            </div>
            <div className="mt-4 w-full bg-recent-donations-image backdrop-blur-md border-b-4 border-black rounded-lg p-4 lg:ml-5 sm:ml-0 sm:mt-3">
              <div className="p-2">
                <h1 className="flex flex-col items-center lg:text-xl sm:text-lg font-bold">
                  <FaShoppingCart className="lg:text-4xl sm:text-2xl" />
                  ÚLTIMAS COMPRAS
                </h1>
                <p className="text-center lg:text-base sm:text-sm">
                  Estes são os últimos jogadores que adquiriram produtos em
                  nossa loja.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center">
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
                </div>
                <div className="m-3 p-3 bg-dark3 border-b-4 border-black rounded-lg w-48 flex flex-col items-center justify-center">
                  <img src="https://minotar.net/bust/TheMito/80.png" />
                  <h1>TheMito</h1>
                  <h1>[VIP]</h1>
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

export async function getServerSideProps({ query }) {
  try {
    let error
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

    return {
      props: {
        error: false,
        manutencao,
        servidores
      }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
