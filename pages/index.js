/* eslint-disable prefer-const */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import Link from 'next/link'
import api from '../service/api'
import Router from 'next/router'
import { format, intlFormat, isToday } from 'date-fns'
import { useEffect, useState, useMemo } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import Error from 'next/error'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserAvatar from 'react-user-avatar'
import Manutencao from '../components/Manutencao'
import { useToasts } from 'react-toast-notifications'
const News = ({
  autor,
  imgSrc,
  id,
  titulo,
  conteudo,
  categoria,
  data,
  link,
  isLink
}) => {
  function handlePostClick(id) {
    console.log('Clicou!')
  }

  const [dataPost, setDataPost] = useState(data)
  useEffect(() => {
    api.get('').then(response =>
      setDataPost(
        Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }).format(new Date(data))
      )
    )
  }, [dataPost])
  return (
    <div className="justify-center shadow-md sm:w-full bg-dark2 ">
      <div className="py-5 px-5 space-y-2 sm:space-x-3 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 sm:w-full border border-dark3">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <UserAvatar
            size="60"
            name={autor}
            // className="flex items-center justify-center text-gray-300 p-2 text-xl"
            className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14 text-gray-300 text-xl"
          />
          {/* <img
            className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14"
            src="/img/no-avatar.png"
            // src={`https://cravatar.eu/helmavatar/${autor}/96`}
            alt="{autor}"
          /> */}
        </motion.button>

        <div className="text-center space-y-2 sm:text-left ">
          <div className="space-y-0.5 ">
            <p className="text-lg text-gray-300 font-medium">
              Postado por {autor}
            </p>
            <p className="text-gray-300 font-extralight text-sm">{dataPost}</p>
          </div>
        </div>
      </div>
      <div className="HeaderIMG">
        <motion.img src={imgSrc} alt="" className="w-full max-h-60" />
      </div>
      <div className="bg-purple-600 border-b-4 border-purple-700 p-5">
        <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
          {categoria}
        </h1>
        <h1 className="text-white font-semibold text-3xl sm:text-xl tracking-tight">
          {titulo}
        </h1>
      </div>
      <div className="bg-gradient-to-b from-dark2 to-transparent tracking-tight border-b-4 border-black border-opacity-60 align-middle items-center pb-3 mb-6">
        <p
          className="px-3 py-5 border-current sm:text-sm text-gray-300"
          dangerouslySetInnerHTML={{ __html: conteudo.split(0, 5) }}
        ></p>

        <div className="flex justify-center pb-5 tracking-tight">
          {!isLink && (
            <Link
              href={{
                pathname: `/postagens/${link}`
                // query: { slug: `${link}` }
              }}
              key={id}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={() => handlePostClick(id)}
                  className="bg-purple-600 border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white"
                >
                  Continuar lendo
                </button>
              </motion.button>
            </Link>
          )}

          {isLink && (
            <Link href={`${link}`} key={id}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={() => handlePostClick(id)}
                  className="bg-purple-600 border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white"
                >
                  Continuar lendo
                </button>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home({ posts, postsInfo, query, error, manutencao }) {
  const { addToast } = useToasts()

  if (error) {
    return (
      <Error
        className="bg-dark"
        statusCode="503"
        title="Não foi possível realizar a conexão com a API"
      />
    )
  }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  let page = query.pagina || 1
  const total = postsInfo.total / postsInfo.quantidade

  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = 'redebattle.com.br'
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    addToast('IP copiado com sucesso!', {
      appearance: 'success',
      autoDismiss: true
    })
  }
  const handleNextPage = page => {
    let next = page++
    return next
  }
  return (
    <>
      <Header />
      <div className="INDEX">
        <title>Rede Battle</title>
        <div className="flex grid grid-flow-row auto-rows-auto grid-cols-3 gap-4 mt-4 md:mt-8 px-6">
          <div className="pb-4 col-span-2">
            {(postsInfo.obs.rows.length === 0 && (
              <div className="bg-dark2 p-10 text-center">
                <h1 className="text-gray-300 text-xl font-medium">
                  Ainda não há postagens
                </h1>
              </div>
            )) ||
              posts.map(post => {
                let linkOrSlug = null
                let link = false
                if (post.link == null) {
                  linkOrSlug = post.slug
                } else {
                  linkOrSlug = post.link
                  link = true
                }

                return (
                  <News
                    key={post.id}
                    id={post.id}
                    titulo={post.titulo}
                    categoria={post.categoria.descricao}
                    autor={post.autor.nome}
                    data={post.createdAt}
                    imgSrc={post.header}
                    conteudo={post.conteudo}
                    isLink={link}
                    link={linkOrSlug}
                  />
                )
              })}
            {(postsInfo.obs.rows.length === 0 && ' ') || (
              <div className="pt-4">
                <center>
                  <button
                    className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded m-2"
                    onClick={() => Router.push(`/?pagina=${query.pagina - 1}`)}
                    disabled={query.pagina <= 1}
                  >
                    Anterior
                  </button>

                  {query.pagina && (
                    <button
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => Router.push(`/?pagina=${query.pagina++}`)}
                      disabled={query.pagina > total}
                    >
                      Próxima
                    </button>
                  )}

                  {!query.pagina && (
                    <button
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => Router.push('/?pagina=2')}
                      disabled={query.pagina > total}
                    >
                      Próximo
                    </button>
                  )}
                </center>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="Sidebar hidden sm:block">
            <div className="pl-10">
              <div className="COMECA AQUI">
                <div className="justify-center">
                  <div className="bg-dark2 border-b-4 border-black border-opacity-60">
                    <h1 className="pt-5 font-medium text-gray-200 text-center text-xl tracking-tight">
                      Nosso IP
                    </h1>
                    <h2 className="pb-5 text-md text-center text-gray-300 font-light tracking-tight">
                      Clique no IP para copiar
                    </h2>
                    <div className="flex justify-center pb-5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={copyToClipboard}
                      >
                        <button className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-normal text-center w-42 p-4 tracking-tight focus:outline-none">
                          REDEBATTLE.COM.BR
                        </button>
                      </motion.button>
                    </div>
                    <h2 className="pb-5 text-md text-center text-gray-200 font-light text-sm tracking-tight">
                      Recomendamos que você utilize a <br />
                      versão 1.8.9 do Minecraft.
                    </h2>
                  </div>
                </div>
              </div>
              <div className="COMECA AQUI">
                <div className="flex justify-center pt-5">
                  <iframe
                    src="https://discordapp.com/widget?id=762534744969052181&theme=dark"
                    width="350"
                    height="500"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  ></iframe>
                </div>
              </div>
              <div className="COMECA AQUI">
                <div className="flex justify-center pt-5">
                  <a
                    className="twitter-timeline text-gray-300"
                    href="https://twitter.com/ofilipemoreno?ref_src=twsrc%5Etfw"
                  >
                    Tweets by ofilipemoreno
                  </a>{' '}
                  <script
                    async
                    src="https://platform.twitter.com/widgets.js"
                    charSet="utf-8"
                  ></script>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const page = query.pagina || 1
    // const posts = await api
    //   .get(`/postagens/list?page=${page}&itens=1&sort=createdAt&order=desc`)
    //   .then(res => res.data.obs.rows)
    //   .catch(e => {
    //     console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
    //   })
    const postsInfo = await api
      .get(`/postagens/list?page=${page}&itens=10&sort=createdAt&order=desc`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
        return (error = true)
      })

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return (error = true)
      })

    return {
      props: {
        posts: postsInfo.obs.rows,
        postsInfo,
        query,
        error: false,
        manutencao
      }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
