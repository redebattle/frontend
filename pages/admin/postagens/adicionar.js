/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext, useState, useEffect, useRef } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'

import dynamic from 'next/dynamic'
import { Editor, EditorState } from 'draft-js'
import { useForm, Controller } from 'react-hook-form'
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa'

import { AuthContext } from '../../../contexts/AuthContext'
import AdminSidebar from '../../../components/AdminSidebar'
import api from '../../../service/api'

export default function AdminPostagensIndex({ possuiPermissao, error }) {
  const { user } = useContext(AuthContext)

  if (error) {
    return (
      <>
        <title>Postagens | Administração CubeBox</title>
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  async function handleCreate({ titulo, link, conteudo }) {
    alert(`Título: ${titulo}, Link: ${link}, Conteudo: ${conteudo}`)
  }

  return (
    <>
      <title>Nova Postagem | Painel Rede Battle</title>
      <div>
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-dark text-gray-300">
          {(possuiPermissao && (
            <div className="ml-72 mr-8 mt-12 ">
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 w-full p-10">
                <div className="flex items-center justify-center">
                  <h1 className="text-xl pb-5">Nova postagem</h1>
                </div>
                <form onSubmit={handleSubmit(handleCreate)}>
                  <div className="grid grid-cols-2 ">
                    <input
                      {...register('titulo')}
                      type="text"
                      placeholder="Título *"
                      className="bg-dark shadow appearance-none border rounded py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline mr-3"
                    />

                    <input
                      {...register('link')}
                      type="text"
                      placeholder="Link (Opcional)"
                      className="bg-dark shadow appearance-none border rounded  py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline mr-3"
                    />
                  </div>
                  {/* <label>Banner</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    />
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <div className="flex text-sm text-gray-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-purple-500 rounded-md h-6 w-40 font-medium text-white hover:text-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Selecione uma imagem</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">ou arraste e solte aqui</p>
                    </div>
                    <p className="text-xs text-gray-300">
                      PNG, JPG, GIF | Total 10MB
                    </p>
                  </div>
                </div> */}
                  <div className="mt-4">
                    <Editor
                      {...register('conteudo')}
                      editorState={editorState}
                      onChange={setEditorState}
                    />
                  </div>
                  <div className="flex items-center justify-center mt-5">
                    <button
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )) || (
            <div className="flex flex-col items-center justify-center my-auto ml-64">
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
  const { 'battleadmin.token': token } = await parseCookies(ctx)
  let possuiPermissao = false
  let error = false

  // const postsInfo = await api
  //   .get(`/postagens/list?page=${page}&itens=10&sort=createdAt&order=desc`)
  //   .then(res => res.data)
  //   .catch(e => {
  //     console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
  //     return (error = true)
  //   })

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
      roles.role.nome === 'SITE.POSTAGENS' ||
      roles.role.nome === '*' ||
      roles.role.nome === 'SITE.*'
    ) {
      possuiPermissao = true
    }
  })

  return {
    props: { possuiPermissao, error }
  }
}
