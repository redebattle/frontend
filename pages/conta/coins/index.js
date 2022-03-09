/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */

import { parseCookies } from 'nookies'
import { FaShoppingCart } from 'react-icons/fa'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaCoinsSidebar from '../../../components/Conta/CoinsSidebar'

export default function ContaCoins() {
  return (
    <>
      <Header />
      <title>Battle Coins | Rede Battle</title>
      <div className="flex lg:flex-row sm:flex-col">
        <ContaCoinsSidebar />
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10">
            <div className='flex items-center justify-center flex-col'>
              <FaShoppingCart className='text-3xl' />
              <h1 className="text-gray-300 lg:text-3xl sm:text-xl sm:text-center font-medium">Troque seus coins por produtos</h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <h1 className="text-gray-300 text-2xl mt-3">
                Opsssss...
              </h1>
              <h1 className="text-gray-300 text-lg mt-2">
                Nenhum produto cadastrado.
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
