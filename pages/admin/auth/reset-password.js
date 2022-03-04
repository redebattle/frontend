/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { FaCode, FaHeart, FaCoffee } from 'react-icons/fa'

import { destroyCookie } from 'nookies'
import api from '../../../service/api'

export default function AdminResetPassword() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const { addToast } = useToasts()

  const { email, token: resetToken } = router.query

  const senhaValida = false

  async function checkPassword(senha, confirmarsenha) {
    if (senha !== confirmarsenha) {
      addToast('As senhas não são iguais', {
        appearance: 'error',
        autoDismiss: true
      })
      if (email === null) {
        addToast('Email não encontrado', {
          appearance: 'error',
          autoDismiss: true
        })
      }

      if (resetToken === null) {
        addToast('Token não encontrado', {
          appearance: 'error',
          autoDismiss: true
        })
      }
    }
  }

  const delay = (amount = 300) =>
    new Promise(resolve => setTimeout(resolve, amount))

  async function handleResetPassword({ senha, confirmarsenha }) {
    if (router.query.token === undefined) {
      return addToast('Token não encontrado', {
        appearance: 'error',
        autoDismiss: true
      })
    }

    if (router.query.email === undefined) {
      return addToast('Email não encontrado', {
        appearance: 'error',
        autoDismiss: true
      })
    }
    try {
      await checkPassword(senha, confirmarsenha)

      const res = await api.post('/auth/reset-password', {
        email: router.query.email,
        senha,
        confirmarsenha,
        token: router.query.token
      })

      addToast(res.data.sucess, {
        appearance: 'success',
        autoDismiss: true
      })

      await delay()

      destroyCookie({}, 'forgot-email')

      router.push('/admin')
    } catch (e) {
      return addToast(e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  return (
    <>
      <title>Redefina sua Senha | Rede Battle</title>
      <div className="bg-dark flex lg:flex-row sm:flex-col items-center sm:justify-center lg:justify-evenly p-2 lg:w-full h-full">
        <div className="">
          <h1 className="lg:text-5xl text-white font-bold mb-2 sm:hidden lg:flex">
            REDEFINA <br />
            SUA SENHA!
          </h1>
          <h1 className="lg:hidden md:text-3xl sm:text-xl text-white font-bold mb-2">
            REDEFINA SUA SENHA!
          </h1>
          {/* <img src="/img/not-logged.jpg" /> */}
        </div>

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-8 pt-6 pb-8"
        >
          <div className="pt-2 pb-3">
            <h1 className="pb-1 text-white text-xl font-medium">
              Crie uma nova senha!
            </h1>
            <p className="text-sm text-gray-400 font-normal">
              Informe os seus dados abaixo para confirmar a alteração da senha.
            </p>
          </div>
          <div className="mb-4">
            <input
              {...register('email')}
              className="bg-dark3 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder={email || 'Email'}
              disabled
            />
          </div>
          <div className="mb-4">
            <input
              {...register('senha')}
              className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="senha"
              type="password"
              placeholder="Senha *"
              minLength="6"
              required
            />
          </div>
          <div className="mb-4">
            <input
              {...register('confirmarsenha')}
              className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="confirmarsenha"
              type="password"
              placeholder="Confirmar nova senha *"
              minLength="6"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Redefinir
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-xs -mt-20">
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
