/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import { parseCookies } from 'nookies'
import { FaLink } from 'react-icons/fa'
import QRCode from 'qrcode.react'
import { useToasts } from 'react-toast-notifications'

import AdminSidebar from '../../../../components/AdminSidebar'
import api from '../../../../service/api'
export default function AdminEncurtadorCreate({ info, error, errorMessage }) {
  const { addToast } = useToasts()

  if (error) {
    return (
      <>
        <title>Encurtador | Administração CubeBox</title>
        <div>
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-8">
            <div className="flex flex-col items-center justify-center my-auto">
              <h1 className="text-9xl font-bold text-gray-300 text-center">
                ERRO!
              </h1>
              <h1 className="text-3xl text-gray-300 font-medium text-center">
                Ocorreu um erro.
              </h1>
              <h1 className="text-gray-300 text-center">
                Não foi possível realizar a conexão com a API.
                {errorMessage}
              </h1>
            </div>

            <AdminSidebar />
          </div>
        </div>
      </>
    )
  }

  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = `${info.short_url}`
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    addToast('Copiado!', {
      appearance: 'info',
      autoDismiss: true
    })
  }
  return (
    <>
      <title>Encurtado! | Administração CubeBox</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-10">
          {(info.short_url && (
            <div className="w-full pt-5 pl-3">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-normal font-medium text-white uppercase mb-2">
                  Link Encurtado!
                </h1>
                <p className="text-sm text-white mb-3">
                  Copie o link encurtado e compartilhe em mensagens, textos,
                  publicações, sites e outros locais.
                </p>
              </div>
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex items-center justify-center">
                  <FaLink className="text-gray-300 text-6xl p-2 mr-3" />
                  <input
                    className="bg-dark shadow appearance-none border rounded hover:border-purple-500 w-full py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="url"
                    type="url"
                    placeholder="https://"
                    defaultValue={info.short_url}
                    disabled
                  />

                  <button
                    onClick={copyToClipboard}
                    className="p-2 ml-2 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Copiar
                  </button>
                </div>

                <div className="text-gray-300 p-4 flex flex-row justify-around items-center">
                  <div className="flex flex-col items-center mt-2">
                    <div className="mb-1">
                      URL longa:{' '}
                      <a
                        href={info.original_url}
                        className="hover:text-purple-500"
                      >
                        {info.original_url}
                      </a>
                    </div>
                    <div className="flex flex-col items-center">
                      Total de cliques:
                      <div className="mt-1 items-center bg-purple-500 border-b-2 border-purple-700 font-bold px-3 py-1 ml-2 rounded-full hover:text-gray-400 cursor-pointer">
                        {info.acess}
                      </div>
                    </div>
                  </div>

                  <div id="QRCode" className="flex flex-row items-center">
                    <div className="mr-10">
                      <QRCode
                        value={info.short_url}
                        renderAs="canvas"
                        bgColor="#121212"
                        fgColor="#FFF"
                      />
                    </div>
                    <div className="max-w-xs text-center">
                      Se preferir, aponte a camêra do seu celular no QRCode ao
                      lado.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="flex flex-col items-center justify-center my-auto">
              <h1 className="text-9xl font-bold text-gray-300 text-center">
                404
              </h1>
              <h1 className="text-3xl text-gray-300 font-medium text-center">
                Página não encontrada
              </h1>
              <h1 className="text-gray-300 text-center">
                A página que você procura não existe ou não está disponível no
                momento.
              </h1>
            </div>
          )}

          <AdminSidebar />
        </div>
      </div>
    </>
  )
}
export const getServerSideProps = async ctx => {
  const { 'cubeadmin.token': token } = parseCookies(ctx)
  let error = false
  let possuiPermissao = false

  const slug = ctx.query.slug

  if (!token) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false
      }
    }
  }

  const getUserRoles = await api
    .get('/roles/admin/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data.permissoes)
    .catch(e => {
      console.log('Ocorreu um erro ao realizar a conexão getRoles')
      error = true
    })

  getUserRoles.map(roles => {
    if (
      roles.role.nome === 'SITE.ENCURTADOR' ||
      roles.role.nome === '*' ||
      roles.role.nome === 'SITE.*'
    ) {
      possuiPermissao = true
    }
  })

  const info = await api
    .get(`/encurtador/${slug}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API', e)
      error = true
      return { error, errorMessage: e.response.data }
    })

  return {
    props: { info, error, possuiPermissao }
  }
}
