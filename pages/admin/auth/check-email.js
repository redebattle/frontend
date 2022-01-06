/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { useToasts } from 'react-toast-notifications'
import { parseCookies } from 'nookies'
import { FaCode, FaLock, FaHeart, FaCoffee } from 'react-icons/fa'

import api from '../../../service/api'

export default function AdminAuthEmailSending() {
  const { addToast } = useToasts()

  async function handleResendMail() {
    const { 'forgot-email': email } = parseCookies()

    try {
      const res = await api.post('/auth/resend-email', { email })
      addToast(res.data.sucess, {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (e) {
      addToast(e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }

    console.log(email)
  }
  return (
    <>
      <title>Pedido de recuperação enviado | Rede Battle</title>
      <div className="bg-dark flex items-center justify-center w-full h-screen px-60">
        <div className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-8 pt-6 pb-8">
          <div className="flex items-center justify-center">
            <img src="/img/send-email.jpg" className="h-60 rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-5xl p-2 text-white">Verifique seu Email!</h1>
          </div>
          <div className="flex items-center justify-center max-w-lg">
            <h1 className="text-gray-400 text-center">
              Um email foi enviado contendo um link no qual você pode clicar
              para redefinir sua senha. Esse link irá expirar em 1 hora.
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-400 font-normal mt-4">
              Não recebeu o email? Verifique sua caixa de spam ou{' '}
              <button
                className="hover:text-purple-500"
                onClick={handleResendMail}
              >
                {' '}
                reenvie o email
              </button>
            </p>
          </div>
          <div className="fixed  text-white text-xs mt-10 ml-40">
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
        </div>
      </div>
    </>
  )
}
