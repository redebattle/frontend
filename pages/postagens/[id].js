import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import UserAvatar from 'react-user-avatar'
import { useRouter } from 'next/router'

import api from '../../service/api'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Manutencao from '../../components/Manutencao'
import Metadata from '../../components/Metadata'
import ErrorAPI from '../../components/ErrorAPI'

import { BsPatchCheckFill, BsHeart, BsHeartFill, BsArrowReturnLeft } from 'react-icons/bs'
import { GoCommentDiscussion } from 'react-icons/go'
import { BiCommentX, BiCommentAdd } from 'react-icons/bi'
import { IoSend } from 'react-icons/io5'
import { GoPrimitiveDot } from 'react-icons/go'
import { FaEye, FaShareAlt } from 'react-icons/fa'

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

  function getMedails(medails) {
    return (
      <div className="flex flex-wrap items-center justify-center bg-dark3 rounded-lg p-2 m-1">
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="VIP">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/786093121757904927/7726_cs_master.png" alt="" />
        </div>
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="Staff">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/786093123965157376/2850_DiscordStaff.png" alt="" />
        </div>
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="Sobrevivente">
          <img src="https://media.discordapp.net/attachments/721741385870344232/794259132487827456/coronavirus.png" alt="" />
        </div>
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="Eleitor">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/818901476721819648/vote.png" alt="" />
        </div>
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="VIP">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/786093120416776192/5129_cs_platinum.png" alt="" />
        </div>
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="Evento de Pascoa">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/828416274584961034/easter-egg_1.png" alt="" />
        </div>
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="Evento de Natal">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/791447804807086090/oie_1Z1WwBrgElcu-min.png" alt="" />
        </div>
      </div>
    );
  }
  function getMedails2(medails) {
    return (
      <div className="flex flex-wrap items-center justify-center bg-dark3 rounded-lg p-2 m-1">
        <div className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open" data-tip="VIP">
          <img src="https://cdn.discordapp.com/attachments/656500951762337793/786093121757904927/7726_cs_master.png" alt="" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <title>{post.titulo} - Rede Battle</title>
      {/* ADICIONA METADATA */}
      <Metadata title={`${post.titulo} - Rede Battle`} description={`Nova postagem da Rede Battle! Leia mais sobre: ${post.titulo}`} imgURL={post.header} url={post.link ? post.link : `https://redebattle.com.br/postagens/${post.slug}`} />
      <div className='flex lg:flex-row sm:flex-col'>
        <div className="flex flex-col items-center mt-3 lg:p-4 sm:p-3 lg:mb-0 sm:-mb-8 lg:w-96 sm:w-full">
          <div className="p-1 w-full bg-white lg:rounded-lg sm:rounded-t-lg border-gray-200 dark:bg-dark2">
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
                  {/* <p className="lg:text-sm sm:text-sm text-gray-300 font-medium">
                    Postado por:
                  </p> */}
                  <p className="lg:text-2xl sm:text-sm text-gray-300 font-bold flex items-center justify-center">
                    <GoPrimitiveDot className='text-success' />{post.autor.nome} <BsPatchCheckFill className='ml-1 lg:text-lg sm:text-xs text-facebook' />
                  </p>
                </div>
                <div className='flex flex-wrap lg:flex-row sm:flex-col items-center justify-center my-1'>
                  <span class="badge badge-outline text-yellow-400 font-bold lg:mr-1">CEO</span>
                </div>
                <h1 className='font-bold mt-2 text-center'>Medalhas</h1>
                 {getMedails()}
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-12 w-40 sm:text-sm font-medium text-white mb-3">
                <div className='flex flex-row items-center justify-center'><BsArrowReturnLeft className='mr-1' /> Voltar</div>
              </button>
            </div>
          </div>
        </div>
        {/* DIV POST */}
        <div key={post.id} className="flex flex-col items-center lg:my-4 sm:my-2 mr-6 w-full sm:p-3">
          <div className='flex flex-row items-center bg-dark2 w-full lg:rounded-t-lg sm:rounded-none p-3 justify-between'>
            <div className='flex justify-center items-center text-sm p-2 w-auto rounded-lg'>
              <p className='text-gray-300 font-bold lg:text-lg sm:text-xs flex flex-row items-center justify-center'><FaEye className='mr-2 text-purple-500 text-xl' /> {post.acessos} views</p>
            </div>
            <div className='bg-dark3 p-2 w-40 rounded-lg flex items-center justify-center'>
              <a href='#'>
                <p>battle.go/p/1234</p>
              </a>
            </div>
          </div>
          {/* IMAGE */}
          <div className="HeaderIMG w-full">
            <motion.img src={post.header} alt="" className="w-full max-h-60" />
          {/* CATEGORIA */}
            <div className="p-5 w-full -mt-28 drop-shadow-lg">
              <h1 className="text-white font-bold tracking-tight">
                <div class="badge lg:text-lg lg:p-3 sm:text-xs">{post.categoria.descricao}</div>
              </h1>
              <h1 className="text-white drop-shadow-lg shadow-dark font-bold lg:text-3xl sm:text-2xl tracking-tight">
                {post.titulo}
              </h1>
            </div>
          </div>
          {/* POST */}
          <div className="bg-dark2 tracking-tight border-b-4 border-black rounded-b-lg align-middle items-center pb-3 w-full">
            <div
              className="px-3 py-5 border-current sm:text-sm text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.conteudo }}
            />
            <div className='flex justify-end mr-3 items-center text-gray-500'>
              <BsHeart className='mr-2 text-2xl cursor-pointer font-bold' /><h1 className='flex items-center justify-center text-xl font-bold'>10</h1>
            </div>
            <div className='flex justify-end mr-3 items-center text-red-500'>
              <BsHeartFill className='mr-2 text-2xl cursor-pointer font-bold' /><h1 className='flex items-center justify-center text-xl font-bold'>11</h1>
            </div>
            <div className='mt-3 border-t border-dark3 p-3 mx-3'>
              <div className='float-left flex flex-row lg:mb-0 sm:mb-8 sm:float-none lg:justify-start sm:justify-center items-center'>
                <p className='-mb-9 text-sm'>12 de janeiro de 2022 às 20:01</p>
              </div>
              <div className='float-right flex flex-row sm:float-none sm:justify-center lg:justify-end items-center'>
                <h1 className='hover:text-purple-500 cursor-pointer rounded-lg p-1'>Denunciar</h1>
                <FaShareAlt className='ml-2 hover:text-facebook cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='bg-dark2 border-b-4 border-black p-4 lg:mx-12 sm:mx-3 my-6 rounded-lg'>
          <h1 className='font-bold text-2xl uppercase p-3 flex flex-row items-center'><GoCommentDiscussion className='mr-2' />Respostas (0)</h1>
          <p className='px-3'>Ainda não há respostas. Seja o primeiro a criar uma!</p>
          <div className='bg-red-500 p-4 my-6 rounded-lg sm:w-full'>
            <p className='flex flex-row items-center justify-center lg:text-base sm:text-sm font-bold'><BiCommentX className='mr-2' />Você precisa estar logado para comentar.</p>
          </div>
          <div className='bg-red-500 p-4 my-6 rounded-lg sm:w-full'>
            <p className='flex flex-row items-center justify-center lg:text-base sm:text-sm font-bold'><BiCommentX className='mr-2' />Essa postagem não permite comentários.</p>
          </div>
          <div className=''>
            <div className='flex lg:flex-row sm:flex-col p-3 lg:h-full sm:w-full bg-dark rounded-lg mb-3'>
              <div className='flex lg:w-[300px] sm:w-full flex-col p-3 items-center justify-center bg-dark2 lg:rounded-lg sm:rounded-t-lg'>
                <img className='w-14 h-14 rounded-lg' src="https://cravatar.eu/helmavatar/Steve/96" alt="Avatar" />
                <div>
                  <p className='font-bold text-xl my-2'>Usuário</p>
                </div>
                <div className='flex flex-wrap lg:flex-row sm:flex-col items-center justify-center'>
                  <span class="badge badge-outline text-mercadopago font-bold lg:mr-1">VIP</span>
                </div>
                <div className='sm:hidden lg:block'>
                  <h1 className='font-bold mt-2 text-center'>Medalhas</h1>
                  {getMedails2()}
                </div>
              </div>
              <div className='w-full h-full flex flex-col'>
                <div className='bg-dark2 lg:mx-2 sm:mx-0 p-6 lg:rounded-t-lg sm:rounded-b-lg'>
                  <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste minima iure eligendi placeat perspiciatis, dignissimos, facere totam officiis provident libero exercitationem autem. Repellat ex pariatur aspernatur accusantium neque nam velit.</h1>
                </div>
                <div className='float-right -mt-3 bg-dark2 lg:mx-2 sm:mx-0 lg:rounded-b-lg p-4'>
                  <div className='flex lg:justify-end sm:justify-center mr-3 items-center text-red-500'>
                    <BsHeartFill className='mr-2 text-2xl cursor-pointer font-bold' /><h1 className='flex items-center justify-center text-xl font-bold'>11</h1>
                  </div>
                  <div className='mt-3 border-t border-dark3 p-3'>
                    <div className='float-left flex flex-row lg:mb-0 sm:mb-8 sm:float-none lg:justify-start sm:justify-center items-center'>
                      <p className='-mb-9 text-sm'>12 de janeiro de 2022 às 20:01</p>
                    </div>
                    <div className='float-right flex flex-row sm:float-none sm:justify-center lg:justify-end items-center'>
                      <h1 className='hover:text-purple-500 cursor-pointer rounded-lg p-1'>Denunciar</h1>
                      <FaShareAlt className='ml-2 hover:text-facebook cursor-pointer' />
                      <p className='ml-3 mr-2'>#1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-dark2 border-b-4 border-black p-4 lg:mx-12 sm:mx-3 my-6 rounded-lg'>
          <h1 className='font-bold lg:text-2xl sm:text-lg uppercase p-3 flex flex-row items-center'><BiCommentAdd className='mr-2' />Responder postagem</h1>
          <form className=''>
            <textarea
              placeholder='Sua resposta...'
              className="px-4 py-2 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-transparent focus:border-purple-500 rounded-lg lg:w-[1385px] sm:w-full"
            />
            <div className='mt-4 flex items-center justify-center'>
              <button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-12 w-40 sm:text-sm font-medium text-white mb-3">
                <div className='flex flex-row items-center justify-center'>Responder <IoSend className='ml-2' /></div>
              </button>
            </div>
          </form>
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
