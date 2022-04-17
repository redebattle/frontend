import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import UserAvatar from 'react-user-avatar'
import { useRouter } from 'next/router'

import api from '../../service/api'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Manutencao from '../../components/Manutencao'
import Metadata from '../../components/Metadata'
import ErrorAPI from '../../components/ErrorAPI'

import {
  BsPatchCheckFill,
  BsHeart,
  BsHeartFill,
  BsArrowReturnLeft
} from 'react-icons/bs'
import { GoCommentDiscussion } from 'react-icons/go'
import { BiCommentX, BiCommentAdd } from 'react-icons/bi'
import { IoSend } from 'react-icons/io5'
import { GoPrimitiveDot } from 'react-icons/go'
import { FaEye, FaShareAlt } from 'react-icons/fa'
import { parseCookies } from 'nookies'
import Swal from 'sweetalert2'
import MedalsComponent from '../../components/Medals'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { AuthContext } from '../../contexts/AuthContext'
import nookies from 'nookies'
import axios from 'axios'

export default function Noticias({
  post,
  comments,
  manutencao,
  error,
  reactions,
  reacted
}) {
  const copyToClipboard = data => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 4500,
      timerProgressBar: true
    })

    const textField = document.createElement('textarea')
    textField.innerText = data
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    Toast.fire({
      icon: 'success',
      background: '#49872a',
      color: 'white',
      title: 'O link da publicação foi copiado!'
    })
  }
  const [dataPost, setDataPost] = useState(null)
  const [hourPost, setHourPost] = useState(null)
  const [countReactions, setCountReactions] = useState(reactions.count)
  const [reaction, setReaction] = useState(reacted)

  const router = useRouter()
  const { addToast } = useToasts()

  const { user, isAuthenticated } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  if (post?.createdAt) {
    useEffect(async () => {
      await setDataPost(
        Intl.DateTimeFormat('pt-BR', {
          weekday: 'long',
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
          minute: '2-digit'
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
    return <ErrorAPI />
  }

  async function reactionPost({ id }) {
    const reactionInfo = reaction
    if (isAuthenticated) {
      if (reactionInfo) {
        await api
          .post(`/posts/reactions/${id}`)
          .then(res => res.data)
          .catch(e => {
            console.log('Ocorreu um erro ao acessar a API de reactionsPost', e)
            return (error = true)
          })
        setReaction(false)
        setCountReactions(countReactions - 1)
      } else {
        await api
          .post(`/posts/reactions/${id}`)
          .then(res => res.data)
          .catch(e => {
            console.log('Ocorreu um erro ao acessar a API de reactionsPost', e)
            return (error = true)
          })
        setReaction(true)
        setCountReactions(countReactions + 1)
      }
    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para curtir a publicação.',
        background: '#1b1b1b',
        color: 'white'
      })
    }
  }

  async function handleNewComment({ content }) {
    if (!isAuthenticated) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para comentar.',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 4500,
      timerProgressBar: true
    })
    if (content === '') {
      return await Toast.fire({
        icon: 'error',
        background: '#ff4141',
        color: 'white',
        title: 'Ei... <br/> Você não pode fazer um comentário em branco...'
      })
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Você não pode comentar em branco.'
      // })
    }
    const res = await api.post('/posts/comments', { post_id: post.id, content })
    Swal.fire({
      icon: 'success',
      background: '#1b1b1b',
      color: 'white',
      title: 'Boaaa!',
      text: 'Seu comentário foi publicado!'
    })
    return router.reload()
  }

  async function handleNewReportComment() {
    if (!isAuthenticated) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para fazer uma denúncia.',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    Swal.fire({
      title: 'Denúncia',
      background: '#1b1b1b',
      color: 'white',
      inputLabel: 'Escreva o motivo de sua denúncia',
      input: 'textarea',
      icon: 'warning',
      theme: 'dark',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#7e3af2',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      preConfirm: login => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(`Ocorreu um erro: ${error}`)
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          background: '#1b1b1b',
          color: 'white',
          icon: 'success',
          title: 'Enviada!',
          html: 'Denúncia enviada com sucesso!'
          // imageUrl: result.value.avatar_url
        })
      } else {
        return
      }
    })
  }

  async function handleModerationDeleteComment(data) {
    if (!isAuthenticated) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para comentar.',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    if (!user.is_administrator) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você não pode fazer isso :(',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    Swal.fire({
      background: '#1b1b1b',
      color: 'white',
      title: 'Excluir?',
      html: 'Você tem certeza que deseja excluir esse comentário?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '#d33'
    }).then(async result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const deleted = await api.delete(`/posts/comments/${data}`)
        if (!deleted) {
          Swal.fire({
            background: '#1b1b1b',
            color: 'white',
            icon: 'error',
            title: 'Erro!',
            html: 'Ocorre um erro ao remover o comentário!'
          })
        }
        Swal.fire({
          background: '#1b1b1b',
          color: 'white',
          icon: 'success',
          title: 'Removido!',
          html: 'O comentário foi removido com sucesso!'
        })
        router.reload()
      } else if (result.isDismissed) {
        return
      }
    })
  }

  async function handleModerationEditComment(data) {
    if (!isAuthenticated) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para comentar.',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    if (!user.is_administrator) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você não pode fazer isso :(',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    const { value: text } = await Swal.fire({
      background: '#1b1b1b',
      color: 'white',
      input: 'textarea',
      inputLabel: `Editando comentário #${data.id}`,
      inputValue: `${data.content}`,
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonText: 'Editar',
      confirmButtonColor: '#7e3af2',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    })
    const response = await api.put(`/posts/comments/${data.id}`, {
      content: text
    })
    Swal.fire({
      icon: 'success',
      background: '#1b1b1b',
      color: 'white',
      title: 'Boaaa!',
      text: `Comentário #${data.id} editado com sucesso!`
    })
    return router.reload()
  }

  async function handleToggleCommentsPermission(data) {
    if (!isAuthenticated) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você precisa estar logado para comentar.',
        background: '#1b1b1b',
        color: 'white'
      })
    }
    if (!user.is_administrator) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você não pode fazer isso :(',
        background: '#1b1b1b',
        color: 'white'
      })
    }

    Swal.fire({
      background: '#1b1b1b',
      color: 'white',
      title: 'Alternar permissão?',
      html: 'Você tem certeza que deseja alterar a permissão de comentários desta publicação?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await api.put(
          `/posts/comments/permission/${data.id}`,
          {
            allow_comments: !data.allow_comments
          }
        )
        if (!response) {
          Swal.fire({
            background: '#1b1b1b',
            color: 'white',
            icon: 'error',
            title: 'Erro!',
            html: 'Ocorreu um erro ao realizar a ação'
          })
        }
        Swal.fire({
          background: '#1b1b1b',
          color: 'white',
          icon: 'success',
          title: 'Feito!',
          html: 'A publicação foi alterada!'
        })
        return router.reload()
      } else if (result.isDismissed) {
        return
      }
    })
  }

  return (
    <>
      <Header />
      <title>{post.title} - Rede Battle</title>
      {/* ADICIONA METADATA */}
      <Metadata
        title={`${post.title} - Rede Battle`}
        description={`Nova postagem da Rede Battle! Leia mais sobre: ${post.title}`}
        imgURL={post.banner_url}
        url={
          post.link
            ? post.link
            : `https://redebattle.com.br/postagens/${post.slug}`
        }
      />
      <div className="flex lg:flex-row sm:flex-col">
        <div className="flex flex-col items-center mt-3 lg:p-4 sm:p-3 lg:mb-0 sm:-mb-8 lg:w-96 sm:w-full">
          <div className="p-1 w-full bg-white lg:rounded-lg sm:rounded-t-lg border-gray-200 dark:bg-dark2">
            <div className="p-5 flex items-center flex-col justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {(post.author.avatar_id && (
                  <UserAvatar
                    size="60"
                    name={post.author.username}
                    // className="flex items-center justify-center text-gray-300 p-2 text-xl"
                    className="mx-auto lg:h-16 sm:h-14 rounded-xl flex-shrink-0 text-gray-300"
                  />
                )) || (
                  <div class="avatar online">
                    <div class="w-24 mask mask-squircle">
                      <img
                        src={`https://cravatar.eu/helmavatar/${post.author.username}/96`}
                        alt={post.author.username}
                      />
                    </div>
                  </div>
                  // <img
                  //   className="lg:h-16 sm:h-12 rounded-xl flex-shrink-0 mb-2 flex items-center justify-center"
                  //   src={`https://cravatar.eu/helmavatar/${post.author.username}/96`}
                  //   alt={post.author.username}
                  // />
                )}
              </motion.button>
              <div className="flex flex-col w-full">
                <div className="p-1 flex flex-col items-center justify-center">
                  {/* <p className="lg:text-sm sm:text-sm text-gray-300 font-medium">
                    Postado por:
                  </p> */}
                  <p className="lg:text-2xl sm:text-sm text-gray-300 font-bold flex items-center justify-center">
                    {post.author.username}{' '}
                    {post.author.is_verified && (
                      <div
                        data-tip="Membro verificado"
                        className="tooltip tooltip-top"
                      >
                        <BsPatchCheckFill
                          className="ml-1 lg:text-base sm:text-xs text-facebook"
                          data-tip="Membro verificado"
                        />
                      </div>
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap lg:flex-row sm:flex-col items-center justify-center my-1">
                  <span class="badge badge-outline text-yellow-400 font-bold lg:mr-1">
                    CEO
                  </span>
                </div>
                <MedalsComponent medals={post.author?.medals} />
                {/* {getMedals()} */}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => router.back()}
                className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-12 w-40 sm:text-sm font-medium text-white mb-3"
              >
                <div className="flex flex-row items-center justify-center">
                  <BsArrowReturnLeft className="mr-1" /> Voltar
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* DIV POST */}
        <div
          key={post.id}
          className="flex flex-col items-center lg:my-4 sm:my-2 mr-6 w-full sm:p-3"
        >
          <div className="flex flex-row items-center bg-dark2 w-full lg:rounded-t-lg sm:rounded-none p-3 justify-between">
            <div className="flex justify-center items-center text-sm p-2 w-auto rounded-lg">
              <p className="text-gray-300 font-bold lg:text-lg sm:text-xs flex flex-row items-center justify-center">
                <FaEye className="mr-2 text-purple-500 text-xl" /> {post.access}{' '}
                views
              </p>
            </div>
            <div className="bg-dark3 p-2 w-40 rounded-lg flex items-center justify-center">
              <a onClick={() => copyToClipboard('1234')}>
                <p>battle.go/p/1234</p>
              </a>
            </div>
          </div>
          {/* IMAGE */}
          <div className="HeaderIMG w-full">
            <motion.img
              src={post.banner_url}
              alt=""
              className="w-full max-h-60"
            />
            {/* CATEGORIA */}
            <div className="p-5 w-full -mt-28 drop-shadow-lg">
              <h1 className="text-white font-bold tracking-tight">
                <div
                  class="badge lg:text-lg lg:p-3 sm:text-xs"
                  style={{ background: post.category.color }}
                >
                  {post.category.name}
                </div>
              </h1>
              <h1 className="text-white drop-shadow-lg shadow-dark font-bold lg:text-3xl sm:text-2xl tracking-tight">
                {post.title}
              </h1>
            </div>
          </div>
          {/* POST */}
          <div className="bg-dark2 tracking-tight border-b-4 border-black rounded-b-lg align-middle items-center pb-3 w-full">
            <div
              className="px-3 py-5 border-current sm:text-sm text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {reaction === false && (
              <div className="flex justify-end mr-3 items-center text-gray-500">
                <a onClick={() => reactionPost({ id: post.id })}>
                  <BsHeart className="mr-2 text-2xl cursor-pointer font-bold" />
                </a>
                <h1 className="flex items-center justify-center text-xl font-bold">
                  {countReactions}
                </h1>
              </div>
            )}
            {reaction === true && (
              <div className="flex justify-end mr-3 items-center text-red-500">
                <a onClick={() => reactionPost({ id: post.id })}>
                  <BsHeartFill className="mr-2 text-2xl cursor-pointer font-bold" />
                </a>
                <h1 className="flex items-center justify-center text-xl font-bold">
                  {countReactions}
                </h1>
              </div>
            )}
            <div className="mt-3 border-t border-dark3 p-3 mx-3">
              <div className="float-left flex flex-row lg:mb-0 sm:mb-8 sm:float-none lg:justify-start sm:justify-center items-center">
                <p className="-mb-9 text-sm">
                  {dataPost} às {hourPost}
                </p>
              </div>
              <div className="float-right flex flex-row sm:float-none sm:justify-center lg:justify-end items-center">
                <h1 className="hover:text-purple-500 cursor-pointer rounded-lg p-1">
                  Denunciar
                </h1>
                {user?.is_administrator && (
                  <div className="dropdown dropdown-end mx-1">
                    <label
                      tabindex="0"
                      className="flex items-center justify-center cursor-pointer text-red-500 hover:text-red-400"
                    >
                      Moderação
                    </label>
                    <ul
                      tabindex="0"
                      class="dropdown-content menu p-2 shadow bg-dark3 rounded-box w-52"
                    >
                      <li>
                        {(post.allow_comments && (
                          <a
                            onClick={() => handleToggleCommentsPermission(post)}
                          >
                            Bloquear comentários
                          </a>
                        )) || (
                          <a
                            onClick={() => handleToggleCommentsPermission(post)}
                          >
                            Permitir comentários
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
                <FaShareAlt className="ml-2 hover:text-facebook cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* SEÇÃO COMENTARIOS */}
      {/*  */}
      <div className="">
        <div className="bg-dark2 border-b-4 border-black p-4 lg:mx-12 sm:mx-3 my-6 rounded-lg">
          <h1 className="font-bold text-2xl uppercase p-3 flex flex-row items-center">
            <GoCommentDiscussion className="mr-2" />
            Respostas ({comments.count})
          </h1>
          {(post.allow_comments === true && comments.count === 0 && (
            <p className="px-3">
              Ainda não há respostas. Seja o primeiro a criar uma!
            </p>
          )) ||
            (post.allow_comments === false && comments.count === 0 && (
              <div className="bg-red-500 p-4 my-6 rounded-lg sm:w-full">
                <p className="flex flex-row items-center justify-center lg:text-base sm:text-sm font-bold">
                  <BiCommentX className="mr-2" />
                  Essa postagem não permite comentários.
                </p>
              </div>
            )) ||
            comments.rows.map((comment, commentNumber) => {
              commentNumber++

              return (
                <div className="mt-4">
                  <div className="flex lg:flex-row sm:flex-col p-3 lg:h-full sm:w-full bg-dark rounded-lg mb-3">
                    <div className="flex lg:w-[300px] sm:w-full flex-col p-3 items-center justify-center bg-dark2 lg:rounded-lg sm:rounded-t-lg">
                      <div class="avatar offline">
                        <div class="w-24 mask mask-squircle">
                          <img
                            src={`https://cravatar.eu/helmavatar/${comment.user.username}/96`}
                            alt={`Avatar de: ${comment.user.username}`}
                          />
                        </div>
                      </div>
                      {/* <img
                        className="w-14 h-14 rounded-lg"
                        src={`https://cravatar.eu/helmavatar/${comment.user.username}/96`}
                        alt="Avatar"
                      /> */}
                      <div>
                        <p className="font-bold text-xl my-2">
                          {comment.user.username}{' '}
                          {comment.user.is_verified && (
                            <div
                              data-tip="Membro verificado"
                              className="tooltip tooltip-top"
                            >
                              <BsPatchCheckFill
                                className="ml-1 lg:text-base sm:text-xs text-facebook"
                                data-tip="Membro verificado"
                              />
                            </div>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap lg:flex-row sm:flex-col items-center justify-center">
                        <span class="badge badge-outline text-mercadopago font-bold lg:mr-1">
                          VIP
                        </span>
                      </div>
                      <div className="sm:hidden lg:block">
                        <MedalsComponent medals={comment.user?.medals} />

                        {/* {getMedals()} */}
                      </div>
                    </div>
                    <div className="w-full h-full flex flex-col">
                      <div className="bg-dark2 lg:mx-2 sm:mx-0 p-6 lg:rounded-t-lg sm:rounded-b-lg">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: comment.content
                          }}
                        />
                      </div>
                      <div className="float-right -mt-3 bg-dark2 lg:mx-2 sm:mx-0 lg:rounded-b-lg p-4">
                        <div className="flex lg:justify-end sm:justify-center mr-3 items-center text-red-500">
                          <BsHeartFill className="mr-2 text-2xl cursor-pointer font-bold" />
                          <h1 className="flex items-center justify-center text-xl font-bold">
                            11
                          </h1>
                        </div>
                        <div className="mt-3 border-t border-dark3 p-3">
                          <div className="float-left flex flex-row lg:mb-0 sm:mb-8 sm:float-none lg:justify-start sm:justify-center items-center">
                            <p className="-mb-9 text-sm">
                              {Intl.DateTimeFormat('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              }).format(new Date(comment.createdAt))}{' '}
                              às{' '}
                              {Intl.DateTimeFormat('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(new Date(comment.createdAt))}
                            </p>
                          </div>
                          <div className="float-right flex flex-row sm:float-none sm:justify-center lg:justify-end items-center">
                            <button onClick={() => handleNewReportComment()}>
                              <h1 className="hover:text-purple-500 cursor-pointer rounded-lg p-1">
                                Denunciar
                              </h1>
                            </button>
                            {user?.is_administrator && (
                              <div className="dropdown dropdown-end mx-1">
                                <label
                                  tabindex="0"
                                  className="flex items-center justify-center cursor-pointer text-red-500 hover:text-red-400"
                                >
                                  Moderação
                                </label>
                                <ul
                                  tabindex="0"
                                  class="dropdown-content menu p-2 shadow bg-dark3 rounded-box w-52"
                                >
                                  <li>
                                    <a
                                      onClick={() =>
                                        handleModerationEditComment(comment)
                                      }
                                    >
                                      Editar comentário
                                    </a>
                                  </li>
                                  <li className="hover:text-red-500">
                                    <a
                                      onClick={() =>
                                        handleModerationDeleteComment(
                                          comment.id
                                        )
                                      }
                                    >
                                      Excluir comentário
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                            <FaShareAlt className="ml-2 hover:text-facebook cursor-pointer" />
                            <p className="ml-3 mr-2">#{commentNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        {comments.count > 0 && post.allow_comments === false && (
          <div className="bg-dark2 border-b-4 border-black p-4 lg:mx-12 sm:mx-3 my-6 rounded-lg">
            <h1 className="font-bold lg:text-2xl sm:text-lg uppercase p-3 flex flex-row items-center">
              <BiCommentAdd className="mr-2" />
              Responder postagem
            </h1>
            <div className="bg-red-500 p-4 my-6 rounded-lg sm:w-full">
              <p className="flex flex-row items-center justify-center lg:text-base sm:text-sm font-bold">
                <BiCommentX className="mr-2" />
                Essa postagem não permite novos comentários.
              </p>
            </div>
          </div>
        )}
        {post.allow_comments === true && (
          <div className="bg-dark2 border-b-4 border-black p-4 lg:mx-12 sm:mx-3 my-6 rounded-lg">
            <h1 className="font-bold lg:text-2xl sm:text-lg uppercase p-3 flex flex-row items-center">
              <BiCommentAdd className="mr-2" />
              Responder postagem
            </h1>
            {isAuthenticated === false && (
              <div className="bg-red-500 p-4 my-6 rounded-lg sm:w-full">
                <p className="flex flex-row items-center justify-center lg:text-base sm:text-sm font-bold">
                  <BiCommentX className="mr-2" />
                  Você precisa estar logado para comentar.
                </p>
              </div>
            )}
            {post.allow_comments === true && isAuthenticated === true && (
              <form className="" onSubmit={handleSubmit(handleNewComment)}>
                <textarea
                  {...register('content')}
                  placeholder="Sua resposta..."
                  className="px-4 py-2 bg-dark text-gray-200 focus:outline-none focus:border-transparent focus:ring-0 border-transparent focus:border-purple-500 rounded-lg w-full"
                />
                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-12 w-40 sm:text-sm font-medium text-white mb-3"
                  >
                    <div className="flex flex-row items-center justify-center">
                      Responder <IoSend className="ml-2" />
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    let error
    let reacted = false
    const { 'redebattle.token': token } = parseCookies(context)

    const { id } = context.query
    const getPost = await api
      .get(`/postagens/slug/${id}`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getPosts', e)
      })

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkMaintenance', e)
        return (error = true)
      })

    const getUser = await api
      .get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.data)

    if (!getPost) {
      return {
        notFound: true
      }
    }

    getPost.reactions.rows.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
        if (value.id !== undefined && value.id === getUser.id) {
          reacted = true
        }
      })
    })

    return {
      props: {
        post: getPost.post,
        comments: getPost.comments,
        reactions: getPost.reactions,
        manutencao,
        error: false,
        reacted
      }
    }
  } catch (e) {
    console.log(e)
    return {
      props: { error: true }
    }
  }
}
