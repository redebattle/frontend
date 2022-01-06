/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import api from '../../service/api'
import { format, isToday, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function Noticias() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api
      .get('/postagens/all')
      .then(response => {
        setPosts(response.data)
      })
      .catch(err => {
        console.log('Falha ao conectar a API de postagens', err)
      })
  }, [posts])

  const [selectDate, setSelectDate] = useState(new Date())
  const dateFormatted = useMemo(
    () =>
      format(selectDate, "d 'de' MMMM 'de' yyyy 'às' HH:MM", { locale: ptBR }),
    [selectDate]
  )
  return (
    <>
      {posts.map(post => {
        parseISO(post.createdAt)

        return (
          <div key={post.id} className="p-20">
            <div className="justify-center shadow-md sm:w-full">
              <div className="py-5 px-5 space-y-2 sm:space-x-3 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 sm:w-full">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14"
                    src={`https://cravatar.eu/helmavatar/${post.autor.nome}/96`}
                    alt={post.autor.nome}
                  />
                </motion.button>

                <div className="text-center space-y-2 sm:text-left">
                  <div className="space-y-0.5">
                    <p className="text-lg text-black font-medium">
                      Postado por {post.autor.nome}
                    </p>
                    <p className="text-black font-extralight text-sm">
                      {setSelectDate(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="HeaderIMG">
                <motion.img
                  src="hhhh"
                  alt=""
                  className="w-full max-h-60 sm:hidden"
                />
              </div>
              <div className="bg-purple-600 border-b-4 border-purple-700 p-5">
                <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
                  {post.categoria.descricao}
                </h1>
                <h1 className="text-white font-semibold text-3xl sm:text-xl tracking-tight">
                  {post.titulo}
                </h1>
              </div>
              <div className="bg-white tracking-tight border align-middle items-center pb-3">
                <p className="px-3 py-5 border-current sm:text-sm">
                  {post.resumo}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
