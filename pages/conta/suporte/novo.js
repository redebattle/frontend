/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { BsArrowReturnLeft } from 'react-icons/bs'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import ContaSidebar from '../../../components/Conta/ContaSidebar'

export default function NovoTicket() {
  const router = useRouter();
  return (
    <>
      <Header />
      <title>Novo ticket | Rede Battle</title>
      <div className="flex lg:flex-row sm:flex-col">
        <ContaSidebar />
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10 ">
            <div className='flex flex-row items-center justify-between'>
              {/* <FaQuestionCircle className='text-yellow-400 text-3xl font-bold mr-2' /> */}
              <h1 className="text-gray-300 text-3xl font-bold">Novo Ticket</h1>
              <button onClick={() => router.back()} className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6">
                <BsArrowReturnLeft className='mr-2' />Voltar
              </button>
            </div>
            <p>Preencha os campos para abrir o ticket</p>
            <div className="flex justify-center rounded-lg">
              <form className='flex flex-col w-full p-6'>
                <label className='-mb-4 font-medium text-lg'>Categoria *</label>
                <select
                  className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 text-lg font-medium"
                  id="categoria"
                >
                  <option className='font-medium text-lg'>Selecione uma categoria</option>
                  <option className='font-medium text-lg'>Dúvidas</option>
                  <option className='font-medium text-lg'>Compras</option>
                  <option className='font-medium text-lg'>Suporte técnico</option>
                  <option className='font-medium text-lg'>Denúncias</option>
                  <option className='font-medium text-lg'>Revisão de punições</option>
                  <option className='font-medium text-lg'>Reporte de Bugs</option>
                  <option className='font-medium text-lg'>Programa de parceiros</option>
                </select>
                <label className='-mb-4 font-medium text-lg'>Assunto *</label>
                <input
                  className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 text-lg font-medium"
                  id="assunto"
                  type="text"
                />
                <label className='-mb-4 font-medium text-lg'>Mensagem *</label>
                <textarea
                  className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 text-lg font-medium h-52"
                  id="mensagem"
                />
                <label className='-mb-4 font-medium text-lg'>Adicionar arquivo</label>
                <input
                  className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 text-lg font-medium"
                  id="upload"
                  type="file"
                  type="file"
                  accept="image/*"
                  multiple="false"
                />

                <button className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Enviar
                </button>
              </form>
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
