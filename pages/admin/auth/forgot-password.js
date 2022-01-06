/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */

import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useToasts } from 'react-toast-notifications'
import { setCookie } from 'nookies'
import { FaCode, FaHeart, FaCoffee } from 'react-icons/fa'

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
      return addToast(e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  return (
    <>
      <title>Recuperação de Senha | Rede Battle</title>
      <div className="bg-dark flex items-center justify-between w-full h-screen px-60">
        <div className="">
          <h1 className="text-5xl p-2 flex text-white">
            RECUPERE <br />
            SUA SENHA
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
              className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
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
              <button className=" text-purple-500 font-normal hover:text-white -mb-4">
                Voltar
              </button>
            </Link>
          </div>
          <div className="fixed  text-white text-xs mt-10 ml-28">
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
        </form>
      </div>
    </>
  )
}
