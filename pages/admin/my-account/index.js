/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import Router from 'next/router'
import Error from 'next/error'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import UserAvatar from 'react-user-avatar'

import AdminSidebar from '../../../components/AdminSidebar'
import api from '../../../service/api'
import { AuthContext } from '../../../contexts/AuthContext'

export default function AdminMyAccount({ profile }) {
  const { user } = useContext(AuthContext)
  const avatar = user?.avatar || null
  const { addToast } = useToasts()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { avatar }
  })

  const [file, setFile] = useState(avatar && avatar.id)
  const [preview, setPreview] = useState(avatar && avatar.url)

  const delay = (amount = 1000) =>
    new Promise(resolve => setTimeout(resolve, amount))

  async function handleEditar({ nome, files }) {
    const email = (await user?.email) || null

    try {
      await api.put('/user/usuario', { nome, email })
      addToast('Perfil alterado com sucesso!', {
        appearance: 'success',
        autoDismiss: true
      })

      await delay()

      return Router.reload(window.location.pathname)
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast(
          'Falha ao editar: Ocorreu um erro ao tentar se comunicar com a API',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
      }
      addToast('Erro ao editar: ' + e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }
  return (
    <>
      <title>Minha Conta | Administração CubeBox</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-8">
          <div className="w-full pt-5 pl-3">
            <div>
              <h1 className="text-2xl font-normal font-medium text-white">
                Olá,{' '}
                {user?.nome || (
                  <SkeletonTheme
                    color="rgba(33, 33, 33, 0.2)"
                    highlightColor="rgba(255, 255, 255, 0.3)"
                  >
                    <p>
                      <Skeleton count={1} width={150} />
                    </p>
                  </SkeletonTheme>
                )}{' '}
                {user?.nome && '!'}
              </h1>

              <div className="p-10 bg-dark2 border-b-4 border-black border-opacity-60 m-2">
                <form onSubmit={handleSubmit(handleEditar)}>
                  <div className="flex items-center justify-center">
                    {(user?.avatar?.url && (
                      <img
                        src={user?.avatar?.url || '/img/no-avatar.png'}
                        alt="avatar"
                        className="rounded-md w-36 h-36 p-4"
                      />
                    )) || (
                      <UserAvatar
                        size="120"
                        name={user?.avatar?.url || user?.nome || 'Rede Battle'}
                        className="flex items-center justify-center text-gray-300 p-2 text-4xl font-medium"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="badge">
                      <span className="mb-4 px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-purple-600 bg-purple-200 rounded-full">
                        {user?.nivel}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Nome
                      </label>
                      <input
                        {...register('nome')}
                        defaultValue={user?.nome}
                        placeholder="Seu nome"
                        className="mr-4 bg-dark shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="nome"
                        type="text"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        value={user?.email}
                        defaultValue={user?.email}
                        placeholder="Seu endereço de e-mail"
                        className="bg-dark3 shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Senha atual
                      </label>
                      <input
                        {...register('senhaantiga', { minLength: '6' })}
                        className="mr-4 bg-dark shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="sehaantiga"
                        type="password"
                        placeholder="Sua senha atual"
                      />
                      {errors.senhaantiga &&
                        errors.senhaantiga.type === 'minLength' && (
                          <span className="flex flex-col items-center justify-center text-red-500">
                            Senha muito curta
                          </span>
                        )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Nova senha
                      </label>
                      <input
                        {...register('senha', { minLength: '6' })}
                        className="mr-4 bg-dark shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="senha"
                        type="password"
                        placeholder="Uma nova senha"
                      />
                      {errors.senha && errors.senha.type === 'minLength' && (
                        <span className="flex flex-col items-center justify-center text-red-500">
                          Senha muito curta
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Confirmar senha
                      </label>
                      <input
                        {...register('confirmarsenha', { minLength: 6 })}
                        className="bg-dark shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="confirmarsenha"
                        type="password"
                        placeholder="Confirme a nova senha"
                      />
                      {errors.confirmarsenha &&
                        errors.confirmarsenha.type === 'minLength' && (
                        <span className="flex flex-col items-center justify-center text-red-500">
                            Senha muito curta
                        </span>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Atualizar perfil
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <AdminSidebar />
        </div>
      </div>
    </>
  )
}
export const getServerSideProps = async ctx => {
  const { 'cubeadmin.token': token } = await parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false
      }
    }
  }
  return { props: {} }
}
