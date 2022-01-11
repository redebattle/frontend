/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import api from '../../service/api'
import { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Manutencao from '../../components/Manutencao'
import UserAvatar from 'react-user-avatar'
import { FaEye } from 'react-icons/fa'

export default function Noticias({ post, manutencao }) {
  const [dataPost, setDataPost] = useState(post.createdAt)
  useEffect(() => {
    api.get('').then(response =>
      setDataPost(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(post.createdAt))
      )
    )
  }, [dataPost])

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  return (
    <>
      <Header />
      <title>{post.titulo} - Rede Battle</title>

      <div key="TheMito" className="p-20">
        <div className="justify-center shadow-md sm:w-full bg-dark2 rounded-lg">
          <div className="py-5 px-5 space-y-2 sm:space-x-3 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 sm:w-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <UserAvatar
                size="60"
                name={post.autor.nome}
                // className="flex items-center justify-center text-gray-300 p-2 text-xl"
                className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14 text-gray-300 text-xl"
              />

              {/* <img
                className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14"
                src="/img/no-avatar.png"
                // src={`https://cravatar.eu/helmavatar/${post.autor.nome}/96`}
                alt={post.autor.nome}
              /> */}
            </motion.button>

            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-gray-300 font-medium">
                  Postado por {post.autor.nome}
                </p>
                <p className="text-gray-300 font-extralight text-sm">
                  {dataPost}
                </p>
                <p className='text-gray-300 font-extralight text-sm flex flex-row items-center'>{post.acessos} <FaEye className='ml-2' /></p>
              </div>
            </div>
          </div>
          <div className="HeaderIMG">
            <motion.img src={post.header} alt="" className="w-full max-h-60" />
          </div>
          <div className="bg-purple-600 border-b-4 border-purple-700 p-5">
            <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
              <div class="badge">{post.categoria.descricao}</div>
            </h1>
            <h1 className="text-white font-semibold text-3xl sm:text-xl tracking-tight">
              {post.titulo}
            </h1>
          </div>
          <div className="bg-dark2 tracking-tight border-b-4 border-black rounded-b-lg align-middle items-center pb-3">
            <p
              className="px-3 py-5 border-current sm:text-sm text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.conteudo }}
            ></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const post = await api
    .get(`/postagens/slug/${id}`)
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de postagens', e)
    })

  const manutencao = await api
    .get('/configuracoes/manutencao/check')
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
      return (error = true)
    })

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: { post, manutencao }
  }
}
