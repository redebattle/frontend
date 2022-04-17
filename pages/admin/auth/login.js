/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { useForm } from 'react-hook-form'
import { useContext, useRef } from 'react'
import { parseCookies } from 'nookies'
import { useToasts } from 'react-toast-notifications'
import { AuthContext } from '../../../contexts/AuthContext'
import { FaCode, FaLock, FaHeart, FaCoffee } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Admin() {
  const reRef = useRef()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signIn } = useContext(AuthContext)
  const { addToast } = useToasts()

  async function handleSignIn(data) {
    addToast('Autenticando...', {
      appearance: 'info',
      autoDismiss: true
    })

    const recaptchaToken = await reRef.current.executeAsync()
    reRef.current.reset()
    await signIn(data, recaptchaToken)
  }

  return (
    <>
      <title>Login | Administração Rede Battle</title>

      <div className="flex lg:flex-row md:flex-col sm:flex-col items-center lg:justify-evenly sm:justify-center w-full h-screen p-2">
        <div className="">
          <h1 className="lg:text-5xl text-white font-bold mb-2 sm:hidden lg:flex">
            PAINEL <br />
            DE CONTROLE
          </h1>
          <h1 className="lg:hidden md:text-3xl sm:text-xl text-white font-bold mb-2">
            PAINEL DE CONTROLE
          </h1>
        </div>

        <div>
          <form
            className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-12 py-8"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              ref={reRef}
              theme="dark"
            />
            <div className="mb-4">
              <label
                className="text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              {errors.email && errors.email.type === 'required' && (
                <span className="flex flex-col items-center justify-center text-red-500">
                  Informe seu email
                </span>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <span className="flex flex-col items-center justify-center text-red-500">
                  Email informado não é válido
                </span>
              )}
              <input
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
                className="bg-dark shadow appearance-none border border-dark4 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:border-purple-500 focus:ring-0"
                id="email"
                type="email"
                placeholder="email@redebattle.com.br"
              />
            </div>
            <div className="mb-6">
              <label className=" text-white text-sm font-bold mb-2">
                Senha
              </label>
              {errors.senha && errors.senha.type === 'required' && (
                <span className="flex flex-col items-center justify-center w-auto text-red-500">
                  Informe sua senha
                </span>
              )}
              <input
                {...register('senha', { required: true })}
                className="bg-dark shadow appearance-none border border-dark4 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:border-purple-500 focus:ring-0"
                id="senha"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="flex lg:flex-row md:flex-col sm:flex-col items-center justify-between">
              <button
                className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <div className="flex items-center justify-center">
                  <FaLock className="mr-1 text-gray-300 text-xs" /> Entrar
                </div>
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800 sm:mt-3"
                href="/admin/auth/forgot-password"
              >
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-xs sm:-mt-14 p-3">
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

export const getServerSideProps = async ctx => {
  const { 'battleadmin.token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/admin/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
