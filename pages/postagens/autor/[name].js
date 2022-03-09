import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaDiscord, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useRouter } from 'next/router'

import api from '../../../service/api'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Manutencao from '../../../components/Manutencao'
import Metadata from '../../../components/Metadata'
import ErrorAPI from '../../../components/ErrorAPI'


export default function ShowPostsFromAuthor({ post, manutencao, error }) {
  const [dataPost, setDataPost] = useState(null)
  const [hourPost, setHourPost] = useState(null)
  const router = useRouter();

  // if (post?.createdAt) {
  //   useEffect(async () => {
  //     await setDataPost(
  //       Intl.DateTimeFormat('pt-BR', {
  //         day: '2-digit',
  //         month: 'long',
  //         year: 'numeric'
  //       }).format(new Date(post?.createdAt))
  //     )
  //   }, [dataPost])
  // }

  // if (post?.createdAt) {
  //   useEffect(async () => {
  //     await setHourPost(
  //       Intl.DateTimeFormat('pt-BR', {
  //         hour: '2-digit',
  //         minute: '2-digit',
  //       }).format(new Date(post?.createdAt))
  //     )
  //   }, [hourPost])
  // }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  if (error) {
    return (
      <ErrorAPI />
    )
  }

  return (
    <>
      <Header />
      <title> - Rede Battle</title>
      {/* ADICIONA METADATA */}
      {/* <Metadata title={`Rede Battle`} description={`Nova postagem da Rede Battle! Leia mais sobre: `} imgURL={post.header} url={post.link ? post.link : `https://redebattle.com.br/postagens/${post.slug}`} /> */}
      <div className='flex lg:flex-row sm:flex-col w-full'>
        <div className='lg:w-full flex lg:flex-row sm:flex-col items-center lg:justify-evenly sm:justify-center bg-dark2 lg:m-6 sm:my-5 sm:my-5 sm:mx-2 lg:p-6 sm:p-4 rounded-lg'>
          <div>
            <img className='lg:w-44 lg:h-44 sm:w-24 sm:h-24 rounded-full' src="https://cdn-icons-png.flaticon.com/512/1995/1995562.png" alt="" />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='pt-2 text-4xl font-bold'>TheMito</h1>
            <p>CEO</p>
            <div className='flex flex-row text-2xl my-5'>
              <a
                href='#'
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-discord border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaDiscord />
                </motion.div>
              </a>
              <a
                href='#'
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-gradient-to-b hover:from-instagram_grad_1 hover:via-instagram_grad_2 hover:via-instagram_grad_3 hover:via-instagram_grad_4 hover:via-instagram_grad_5 hover:via-instagram_grad_6 hover:to-instagram_grad_8 border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaInstagram />
                </motion.div>
              </a>
              <a
                href='#'
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-twitter border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaTwitter />
                </motion.div>
              </a>
              <a
                href='#'
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-youtube border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaYoutube />
                </motion.div>
              </a>
              <a
                href='#'
                className="w-8 mx-1 text-3xl hover:text-white flex items-center justify-center bg-purple-700 hover:bg-facebook border-b-2 border-black p-2 rounded-lg px-5"
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FaFacebookF />
                </motion.div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:mx-6 sm:mx-3'>
        <p className='font-bold text-2xl'>3 POSTS</p>
      </div>
      <div className='flex flex-wrap'>
        <div className='flex flex-col lg:w-[455px] lg:h-[550px] sm:w-full sm:h-auto items-center justify-center bg-dark2 lg:m-6 sm:m-2 lg:p-6 sm:p-2 rounded-lg'>
          <div className='bg-header-image lg:w-[420px] h-[190px] sm:w-full rounded-lg' >
            <div className="float-right badge bg-red-500 p-4 m-4 text-lg font-bold">Geral</div>
          </div>
          <div className='my-8 text-3xl font-bold border-b-4 border-purple-500'>Título da notícia</div>
          <div className='text-lg text-center text-gray-400'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt quae repudiandae eos iste quidem officia ducimus asperiores doloremque. Pariatur necessitatibus quae voluptatibus deserunt qui. Vitae dolores quos eligendi quam possimus?</p>
          </div>
          <div className='flex flex-row mt-5 justify-between bg-dark3 p-2 rounded-lg'>
            <div className='text-gray-400 font-bold'>00/00/0000 às 00:00</div>
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
    // const post = await api
    //   .get(`/postagens/slug/${id}`)
    //   .then(res => res.data)
    //   .catch(e => {
    //     console.log('Ocorreu um erro ao acessar a API de postagens', e)
    //   })

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return (error = true)
      })

    // if (!post) {
    //   return {
    //     notFound: true
    //   }
    // }

    return {
      props: { /*post,*/ manutencao, error: false }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
