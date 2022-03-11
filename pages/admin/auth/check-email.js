/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { useToasts } from 'react-toast-notifications'
import { parseCookies } from 'nookies'
import { FaCode, FaHeart, FaCoffee } from 'react-icons/fa'

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
      if (e.toJSON().message === 'Network Error') {
        return addToast('Ocorreu um erro na conexão com a API', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      if (e.response.data.error) {
        addToast(e.response.data.error, {
          appearance: 'error',
          autoDismiss: true
        })
      }
    }

    console.log(email)
  }
  return (
    <>
      <title>Pedido de recuperação enviado | Rede Battle</title>
      <div className="bg-dark flex items-center justify-center w-full h-screen p-2">
        <div className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-8 pt-6 pb-8">
          <div className="flex items-center justify-center">
            <img
              src="/img/send-email.jpg"
              className="lg:h-60 sm:h-32 md:h-44 rounded-full"
            />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="lg:text-5xl sm:text-xl md:text-2xl p-6 text-white">
              Verifique seu Email!
            </h1>
          </div>
          <div className="flex items-center justify-center max-w-lg">
            <h1 className="text-gray-400 sm:text-xs md:text-sm lg:text-base">
              Um email foi enviado contendo um link no qual você pode clicar
              para redefinir sua senha. Esse link irá expirar em 1 hora.
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-400 font-normal mt-4 sm:text-xs lg:text-base">
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
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-xs -mt-24">
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
