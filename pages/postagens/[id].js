import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import UserAvatar from 'react-user-avatar'
import { FaArrowLeft, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/router'

import api from '../../service/api'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Manutencao from '../../components/Manutencao'
import Metadata from '../../components/Metadata'
import ErrorAPI from '../../components/ErrorAPI'


export default function Noticias({ post, manutencao, error }) {
  const [dataPost, setDataPost] = useState(null)
  const [hourPost, setHourPost] = useState(null)
  const router = useRouter();

  if (post?.createdAt) {
    useEffect(async () => {
      await setDataPost(
        Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(post?.createdAt))
      )
    }, [dataPost])
  }

  if (post?.createdAt) {
    useEffect(async () => {
      await setHourPost(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(post?.createdAt))
      )
    }, [hourPost])
  }

  if (error) {
    return (
      <ErrorAPI />
    )
  }

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
      {/* ADICIONA METADATA */}
      <Metadata title={`${post.titulo} - Rede Battle`} description={`Nova postagem da Rede Battle! Leia mais sobre: ${post.titulo}`} imgURL={post.header} url={post.link ? post.link : `https://redebattle.com.br/postagens/${post.slug}`} />
      <div className='flex lg:flex-row sm:flex-col'>
        <div className="flex flex-col items-center p-5 pt-8 lg:w-96 sm:w-full">
          <div className="p-1 w-full bg-white rounded-lg border-gray-200 dark:bg-dark2">
            <div className="p-5 flex items-center flex-col p-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {post.autor.avatar_id && <UserAvatar
                  size="60"
                  name={post.autor.nome}
                  // className="flex items-center justify-center text-gray-300 p-2 text-xl"
                  className="mx-auto lg:h-16 sm:h-14 rounded-xl flex-shrink-0 text-gray-300"
                />
                ||
                <img
                className="lg:h-16 sm:h-12 rounded-xl flex-shrink-0 mb-2 flex items-center justify-center"
                  src={`https://cravatar.eu/helmavatar/${post.autor.nome}/96`}
                  alt={post.autor.nome}
                />}
              </motion.button>
              <div className="flex flex-col w-full">
                <div className='p-1 flex flex-col items-center justify-center'>
                  <p className="lg:text-lg sm:text-sm text-gray-300 font-medium">
                    Postado por:
                  </p>
                  <p className="lg:text-lg sm:text-sm text-gray-300 font-medium">
                    {post.autor.nome}
                  </p>
                </div>
                <div className='flex flex-col justify-center items-center mb-2'>
                  <p className="text-gray-300 font-extralight lg:text-sm sm:text-xs">
                    {dataPost}
                  </p>
                  <p className="text-gray-300 font-extralight lg:text-sm sm:text-xs">
                    às {hourPost}
                  </p>
                </div>
                <div>
                  <p className='text-gray-300 font-extralight lg:text-sm sm:text-xs flex flex-row items-center justify-center'>{post.acessos} <FaEye className='ml-2' /></p>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white mb-3">
                <div className='flex flex-row items-center justify-center'><FaArrowLeft className='mr-1' /> Voltar</div>
              </button>
            </div>
          </div>
        </div>
        {/* DIV POST */}
        <div key={post.id} className="flex flex-col items-center justify-center lg:my-4 sm:my-2 mr-6 w-full sm:p-4">
          {/* IMAGE */}
          <div className="HeaderIMG w-full">
            <motion.img src={post.header} alt="" className="w-full max-h-60 rounded-t-lg" />
          </div>
          {/* CATEGORIA */}
          <div className="bg-purple-600 border-b-4 border-purple-700 p-5 w-full">
            <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
              <div class="badge text-sm sm:text-xs">{post.categoria.descricao}</div>
            </h1>
            <h1 className="text-white font-semibold text-3xl lg:sm:text-xl sm:text-sm tracking-tight">
              {post.titulo}
            </h1>
          </div>
          {/* POST */}
          <div className="bg-dark2 tracking-tight border-b-4 border-black rounded-b-lg align-middle items-center pb-3 w-full">
            <div
              className="px-3 py-5 border-current sm:text-sm text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.conteudo }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
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
      props: { post, manutencao, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
