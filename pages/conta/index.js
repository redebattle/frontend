/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'
import { FaShoppingCart } from 'react-icons/fa'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ContaSidebar from '../../components/Conta/ContaSidebar'

export default function ContaIndex() {
  return (
    <>
      <Header />
      <title>Minha Conta | Rede Battle</title>
      <div className="flex lg:flex-col xl:flex-row sm:flex-col">
        <ContaSidebar />
        <div className="flex flex-col">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-2 max-w-4xl p-10">
            <div>
              <h1 className="text-gray-300 text-3xl ">Olá, TheMito!</h1>
            </div>
            <div>
              <h1 className="text-gray-300 text-lg mt-3">
                Este é o seu painel. Aqui você pode visualizar todas as
                compras efetuadas (sejam elas aprovadas, pendentes ou
                recusadas). Tem alguma dúvida? Entre em contato conosco pelo
                e-mail: <u className='text-discord'>suporte@redebattle.com.br</u> ou criando um ticket no
                <a href="https://redebattle.com.br/discord" className='ml-2 text-discord hover:text-opacity-60'><u>discord</u></a>.
              </h1>
            </div>
            <div>
              <h1 className="text-gray-300 text-3xl mt-6">
                Cadastre seu email!
              </h1>
            </div>
            <div>
              <h1 className="text-gray-300 text-lg mt-3">
                Registrando um e-mail sua conta fica mais segura e pode ser
                recuperada sem dificuldades posteriormente!
              </h1>
            </div>
            <div className='flex lg:flex-row sm:flex-col'>
              <div>
                <form>
                  <input
                    className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </form>
              </div>
              <div>
                <button
                  className="m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
                  type="submit"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-2 max-w-sm p-10">
            <div className='flex flex-row items-center justify-center'>
              <div className='bg-lime-600 p-6 rounded-lg'>
                <FaShoppingCart className='text-4xl' />
              </div>
              <div>
                <h1 className="text-gray-300 text-lg p-3">
                  Total de suas doações:
                </h1>
                <h1 className="text-gray-300 text-lg font-bold -mt-6 p-3">
                  R$ 0,00
                </h1>
                <h1 className="text-gray-300 text-sm -mt-6 p-3">
                  0 doações
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'redebattle.token': token } = await parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: '/conta/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
