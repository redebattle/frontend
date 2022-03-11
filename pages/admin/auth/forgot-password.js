/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */

import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useToasts } from 'react-toast-notifications'
import { setCookie } from 'nookies'
import { FaCode, FaHeart, FaCoffee, FaArrowLeft } from 'react-icons/fa'

import api from '../../../service/api'
import router from 'next/router'
export default function AdminForgotPassword() {
  const { register, handleSubmit } = useForm()
  const { addToast } = useToasts()

  const delay = (amount = 400) =>
    new Promise(resolve => setTimeout(resolve, amount))

  async function handleForgot({ email }) {
    try {
      const res = await api.post('/auth/forgot-password', { email })

      setCookie(undefined, 'forgot-email', email, {
        maxAge: 60 * 60 * 24 // 24 hours
      })

      addToast(res.data.sucess, {
        appearance: 'success',
        autoDismiss: true
      })

      await delay()

      router.push('/admin/auth/check-email')
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast('Ocorreu um erro na conexão com a API', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      if (e.response.data.error) {
        return addToast(e.response.data.error, {
          appearance: 'error',
          autoDismiss: true
        })
      }
    }
  }

  return (
    <>
      <title>Recuperação de Senha | Rede Battle</title>
      <div className="bg-dark flex sm:flex-col lg:flex-row items-center lg:justify-evenly sm:justify-center w-full h-screen p-2">
        <div className="">
          <h1 className="lg:text-5xl text-white font-bold mb-2 sm:hidden lg:flex">
            RECUPERE <br />
            SUA SENHA
          </h1>
          <h1 className="lg:hidden md:text-3xl sm:text-xl text-white font-bold mb-2">
            RECUPERE SUA SENHA
          </h1>
          {/* <img src="/img/not-logged.jpg" /> */}
        </div>

        <form
          onSubmit={handleSubmit(handleForgot)}
          className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="pt-2 pb-3">
            <h1 className="pb-1 text-white text-xl font-medium">
              Esqueceu sua senha?
            </h1>
            <p className="text-sm text-gray-400 font-normal max-w-sm">
              Digite seu endereço de e-mail cadastrado
              <br /> para que possamos enviar um link de redefinição da sua
              senha.
            </p>
          </div>
          <div className="mb-4">
            <input
              {...register('email')}
              className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white border-dark4 leading-tight focus:outline-none focus:border-purple-500 focus:ring-0"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 mt-4"
              type="submit"
            >
              Enviar link de recuperação
            </button>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/admin">
              <button className="text-purple-500 font-normal hover:text-white -mb-4 flex flex-row items-center justify-center">
                <FaArrowLeft className=" mr-1" /> Voltar
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-xs -mt-16">
        <div className="flex items-center justify-center">
          <FaCode className="mr-1" />
          Development by Filipe Moreno
        </div>
        <div className="flex items-center justify-center">
          Feito com
          <FaHeart className="text-red-500 mx-1" />
          e <FaCoffee className="mx-1" />
        </div>
      </div>
    </>
  )
}
