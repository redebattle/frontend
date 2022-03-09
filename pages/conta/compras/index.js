/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'
import { FaShoppingCart } from 'react-icons/fa'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaSidebar from '../../../components/Conta/ContaSidebar'

export default function ContaCompasIndex() {
  return (
    <>
      <Header />
      <title>Minhas Compras | Rede Battle</title>
      <div className="flex lg:flex-row sm:flex-col">
        <ContaSidebar />
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10">
            <div className='flex items-center justify-center flex-col'>
              <FaShoppingCart className='text-3xl' />
              <h1 className="text-gray-300 text-3xl font-medium">Meus Pedidos</h1>
            </div>
            <div className='flex items-center justify-center'>
              <h1 className="text-gray-300 text-sm mt-3">
                Você ainda não teve nenhuma compra aprovada.
              </h1>
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
