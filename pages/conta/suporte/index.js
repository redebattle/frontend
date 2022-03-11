/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { FaQuestionCircle, FaPlus } from 'react-icons/fa'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaSidebar from '../../../components/Conta/ContaSidebar'

export default function ContaSuporteIndex() {
  const router = useRouter()

  return (
    <>
      <Header />
      <title>Suporte | Rede Battle</title>
      <div className="flex lg:flex-row sm:flex-col">
        <ContaSidebar />
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row">
                <FaQuestionCircle className="text-yellow-400 text-3xl font-bold mr-2" />
                <h1 className="text-gray-300 text-3xl font-bold">Suporte</h1>
              </div>
              <button
                onClick={() => router.push('suporte/novo')}
                className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6"
              >
                <FaPlus className="mr-2" />
                Novo Ticket
              </button>
            </div>
            <p>
              Crie um ticket atraves do nosso discord. Use o canal{' '}
              <u className="text-yellow-400">#atendimento</u>
            </p>
          </div>
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10">
            <div className="flex flex-col items-center justify-center">
              <p>Uow!</p>
              <p>Você ainda não abriu nenhum ticket 😁</p>
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
