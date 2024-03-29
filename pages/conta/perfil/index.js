/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaSidebar from '../../../components/Conta/ContaSidebar'

export default function ContaPerfilIndex() {
  return (
    <>
      <Header />

      <title>Perfil | Rede Battle</title>

      <div className="container">
        <div className="content">
          <div className="flex flex-row">
            <ContaSidebar />
            <div className="flex flex-col ">
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-10 max-w-4xl p-10 ">
                <div>
                  <h1 className="text-gray-300 text-3xl ">Perfil</h1>
                </div>
                <div>
                  <h1 className="text-gray-300 text-lg mt-3 ">
                    Seu perfil bonito :)
                  </h1>
                </div>
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
