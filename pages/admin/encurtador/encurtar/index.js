/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */

import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import AdminSidebar from '../../../../components/AdminSidebar'
import api from '../../../../service/api'

export default function AdminEncurtadorCreate({ error, possuiPermissao }) {
  const router = useRouter()
  const { addToast } = useToasts()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  async function handleShort({ url, slug }) {
    try {
      addToast('Encurtando...', {
        appearance: 'info',
        autoDismiss: true
      })
      const res = await api.post('/encurtador', { url, slug })

      addToast(res.data.shortUrl, {
        appearance: 'success',
        autoDismiss: true
      })

      return router.push(
        `/admin/encurtador/encurtar/feito?slug=${res.data.slug}`
      )
    } catch (e) {
      return addToast(e.response?.data?.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

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
              </h1>
            </div>

            <AdminSidebar />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <title>Encurtador | Administração Rede Battle </title>

      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-800 ml-72 mr-10 pt-10">
          {(possuiPermissao && (
            <div className="w-full pt-5 pl-3">
              <div>
                <h1 className="text-4xl font-normal font-medium text-white">
                  Encurtador
                </h1>

                <p className="text-sm text-white mb-3">Encurte suas URLs :)</p>
              </div>

              <form
                onSubmit={handleSubmit(handleShort)}
                className="bg-dark2 border-b-4 border-black border-opacity-60 shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    URL
                  </label>
                  {errors.url && errors.url.type === 'required' && (
                    <span className="flex flex-col items-center justify-center text-red-500">
                      Você precisa inserir uma URL
                    </span>
                  )}
                  <input
                    {...register('url', { required: true, pattern: URL })}
                    className={
                      (errors.url &&
                        errors.url.type === 'required' &&
                        'bg-dark shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline') ||
                      'bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                    }
                    id="url"
                    type="url"
                    placeholder="https://"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Personalize
                  </label>
                  <input
                    {...register('slug')}
                    className="bg-dark shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="slug"
                    type="text"
                    placeholder="Deseja uma url personalizada?"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Encurtar
                  </button>
                </div>
              </form>
            </div>
          )) || (
            <div className="flex flex-col items-center justify-center my-auto">
              <h1 className="text-9xl font-bold text-gray-300 text-center">
                403
              </h1>
              <h1 className="text-3xl text-gray-300 font-medium text-center">
                Permissão insuficiente
              </h1>
              <h1 className="text-gray-300 text-center">
                Você não possuí permissão para acessar esta página.
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
  const { 'battleadmin.token': token } = parseCookies(ctx)
  let possuiPermissao = false
  let error = false

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

  return {
    props: { error, possuiPermissao }
  }
}
