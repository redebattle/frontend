import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaDiscord,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa'
import { useRouter } from 'next/router'

import api from '../../../service/api'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Manutencao from '../../../components/Manutencao'
import Metadata from '../../../components/Metadata'
import ErrorAPI from '../../../components/ErrorAPI'
import Link from 'next/link'

export default function ShowPostsFromAuthor({
  autorName,
  posts,
  manutencao,
  statusCode
}) {
  const router = useRouter()

  if (statusCode?.code !== 200) {
    return <ErrorAPI statusCode={statusCode} />
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
      <title>Postagens de {autorName} - Rede Battle</title>
      {/* ADICIONA METADATA */}
      {/* <Metadata title={`Rede Battle`} description={`Nova postagem da Rede Battle! Leia mais sobre: `} imgURL={post.header} url={post.link ? post.link : `https://redebattle.com.br/postagens/${post.slug}`} /> */}
      <div className="flex lg:flex-row sm:flex-col w-full">
        <div className="lg:w-full flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center bg-dark2 lg:m-6 sm:my-5 sm:my-5 sm:mx-2 lg:p-6 sm:p-4 rounded-lg">
          <div>
            <img
              className="lg:w-44 lg:h-44 sm:w-24 sm:h-24 rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/1995/1995562.png"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="pt-2 text-4xl font-bold">{autorName}</h1>
            <p>CEO</p>
            <div className="flex flex-row text-2xl my-5">
              <a
                href="#"
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-discord border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaDiscord />
                </motion.div>
              </a>
              <a
                href="#"
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-gradient-to-b hover:from-instagram_grad_1 hover:via-instagram_grad_2 hover:via-instagram_grad_3 hover:via-instagram_grad_4 hover:via-instagram_grad_5 hover:via-instagram_grad_6 hover:to-instagram_grad_8 border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram />
                </motion.div>
              </a>
              <a
                href="#"
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-twitter border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter />
                </motion.div>
              </a>
              <a
                href="#"
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-youtube border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaYoutube />
                </motion.div>
              </a>
              <a
                href="#"
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-facebook border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebookF />
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mx-6 sm:mx-3">
        <p className="font-bold text-2xl">{posts.obs.count} POSTAGENS</p>
      </div>
      <div className="flex flex-wrap">
        {posts.obs.rows.map(post => {
          const [dataPost, setDataPost] = useState(post.createdAt)
          const [hourPost, setHourPost] = useState(post.createdAt)

          useEffect(async () => {
            await setDataPost(
              Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }).format(new Date(post.createdAt))
            )
          }, [dataPost])

          useEffect(async () => {
            await setHourPost(
              Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              }).format(new Date(post.createdAt))
            )
          }, [hourPost])

          return (
            <div className="flex flex-col lg:w-[400px] lg:h-[550px] sm:w-full sm:h-auto items-center justify-center bg-dark2 lg:m-6 sm:m-2 lg:p-6 sm:p-2 rounded-lg">
              <div
                className="lg:w-[385px] h-[190px] sm:w-full rounded-lg"
                style={{
                  backgroundImage: `url('${post.banner_url}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              >
                <div
                  className="float-right badge p-4 m-4 text-lg font-bold"
                  style={{ background: post.category.color }}
                >
                  {post.category.name}
                </div>
              </div>
              <div className="my-8 text-2xl font-bold border-b-4 border-purple-500">
                <Link href={`/postagens/${post.slug}`}>{post.title}</Link>
              </div>
              <div
                className="text-lg text-center text-gray-400"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="flex flex-row mt-5 justify-between bg-dark3 p-2 rounded-lg">
                <div className="text-gray-400 font-bold">
                  {dataPost} às {hourPost}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    let statusCode = { code: 200 }

    const { name } = context.query

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API getMaintenanceStatus', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const posts = await api
      .get(`/post/author/${name}`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API getPosts', e)
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    // if (!post) {
    //   return {
    //     notFound: true
    //   }
    // }

    return {
      props: { posts, manutencao, statusCode, autorName: name }
    }
  } catch (e) {
    return {
      props: { statusCode: e.code }
    }
  }
}
