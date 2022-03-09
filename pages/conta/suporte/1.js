/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { useRouter } from 'next/router'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'

export default function VisualizarTicket() {
  const router = useRouter();
  return (
    <>
      <Header />
      <title>Detalhes do ticket | Rede Battle</title>
      <div className='flex flex-row items-center justify-between bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-4'>
        <div className='flex flex-row items-center'>
          <h1 className='font-bold text-2xl p-2'>Ticket #0001</h1>
          <span class="ml-2 badge badge-outline text-lime-500 font-bold">Aberto</span>
          <span class="ml-2 badge badge-outline text-instagram_grad_8 font-bold">Baixo</span>
        </div>
        <button onClick={() => router.back()} className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-6">
          <BsArrowReturnLeft className='mr-2' />Voltar
        </button>
      </div>
      <div className="flex lg:flex-row sm:flex-col">
        <div className="flex flex-col max-w-lg">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-4">
            <h1 className='text-center font-bold text-xl p-2'>Detalhes do ticket</h1>
            <hr className='opacity-10' />
            <p className='p-3'><b>Status:</b> Respondido</p>
            <p className='p-3 flex flex-col'><b>Última atualização:</b> 00/00/0000 às 00:00:00</p>
            <p className='p-3 flex flex-col'><b>Criado em:</b> 00/00/0000 às 00:00:00</p>
          </div>
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-4">
            <h1 className='text-center font-bold text-xl p-2'>Arquivos anexados</h1>
            <hr className='opacity-10' />
            <p className='p-3'>Clique ou arraste os arquivos para upload<br />
                               Você pode arrastar um ou mais arquivos. <br />
                               Não é necessário responder o ticket, o upload é automático.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3 p-10">
            <div className='bg-dark flex flex-row items-center p-4 -mt-4 rounded-lg'>
              <h1 className='font-bold text-xl'>Assunto do ticket</h1>
            </div>
            <div className='p-2 my-4'>
              <div className="flex justify-end rounded-lg p-5">
                <div className='flex flex-col'>
                  <div className='flex flex-row items-center justify-end m-1'>
                    <p className='mr-2'>Nome do cliente</p>
                    <span class="mr-16 badge badge-outline text-instagram_grad_9 font-bold text-2xs">VIP</span>
                  </div>
                  <div className='flex flex-row'>
                    <div className='bg-roxo p-4 rounded-lg'>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, facere maxime! Expedita illo ipsam veniam possimus architecto, optio ea eaque aspernatur totam, vitae culpa aliquid quo incidunt! Assumenda, ipsum porro.</p>
                    </div>
                    <img className='w-12 h-12 m-2' src="/img/no-avatar.png" alt="Avatar" />
                  </div>
                  <p className='text-right mr-16 pr-1 text-xs p-1 text-gray-300'>00/00/0000 às 00:00:00</p>
                </div>
              </div>
              <div className="flex justify-start rounded-lg p-5">
                <div className='flex flex-col'>
                  <div className='flex flex-row items-center m-1'>
                    <p className='ml-16 pl-1'>Nome do atendente</p>
                    <span class="ml-2 badge badge-outline text-green-500 font-bold text-2xs">Moderador</span>
                  </div>
                  <div className='flex flex-row'>
                    <img className='w-12 h-12 m-2' src="/img/no-avatar.png" alt="Avatar" />
                    <div className='bg-mercadopago2 p-4 rounded-lg'>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, facere maxime! Expedita illo ipsam veniam possimus architecto, optio ea eaque aspernatur totam, vitae culpa aliquid quo incidunt! Assumenda, ipsum porro.</p>
                    </div>
                  </div>
                  <p className='text-left ml-16 pr-1 text-xs p-1 text-gray-300'>00/00/0000 às 00:00:00</p>
                </div>
              </div>
            </div>
            <hr className='m-3 opacity-10' />
            <form>
              <label className='font-medium text-lg'>Envie uma resposta</label>
              <textarea
                className="shadow bg-dark appearance-none border-b-2 border-black rounded py-3 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-5 mb-5 text-lg font-medium h-32 w-full"
                id="mensagem"
              />
              <button className="flex flex-row items-center justify-center m-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Responder
              </button>
            </form>
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
