import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { BsPatchCheckFill } from 'react-icons/bs'
import { FaCommentAlt, FaEye, FaHeart } from 'react-icons/fa'

export default function PostComponent({id, titulo, categoria, autor, data, imgSrc, conteudo, isLink, link, acessos, avatarId}) {
  const [dataPost, setDataPost] = useState(data)
  const [hourPost, setHourPost] = useState(data)

  useEffect(async () => {
    await setDataPost(
      Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(new Date(data))
    )
  }, [dataPost])

  useEffect(async () => {
    await setHourPost(
      Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(data))
    )
  }, [hourPost])

  return (
    <>
      <div key={id} className="flex flex-col items-center w-full px-4 lg:px-6 sm:px-0 mb-4">
        <div className="p-1 w-full bg-white rounded-t-lg border-gray-200 dark:bg-dark2">
          <div className="p-5 space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 sm:w-full lg:flex-row sm:flex-col sm:p-2 lg:justify-start lg:p-4 sm:justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {avatarId && <UserAvatar
                size="60"
                name={autor}
                // className="flex items-center justify-center text-gray-300 p-2 text-xl"
                className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14 text-gray-300 text-xl"
              />
              ||
              <img
                className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-12 sm:mb-2 lg:h-14"
                // src={`https://cravatar.eu/helmavatar/${autor}/96`}
                alt={autor}
              />}
            </motion.button>

            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <a href={`/postagens/autor/${autor}`} className="lg:text-lg sm:text-sm text-gray-300 font-medium sm:items-center sm:justify-center sm:text-center lg:text-left flex items-center justify-center">
                  Postado por {autor} <div data-tip='Membro verificado' class="tooltip tooltip-top"><BsPatchCheckFill className='ml-1 lg:text-base sm:text-xs text-facebook' data-tip='Membro verificado' /></div>
                </a>
                <p className="text-gray-300 font-extralight lg:text-sm sm:text-xs sm:items-center sm:justify-center sm:text-center lg:text-left">
                  {dataPost} às {hourPost}
                </p>
                <div className='flex flex-row sm:justify-center lg:justify-start items-center'>
                  <p className='text-gray-300 font-extralight lg:text-sm sm:text-xs flex flex-row items-center sm:justify-center sm:text-center lg:justify-start'><FaEye className='mr-1 text-purple-500 text-lg' /> {acessos}</p>
                  <p className='text-gray-300 font-extralight lg:text-sm sm:text-xs flex flex-row items-center sm:justify-center sm:text-center lg:justify-start'><FaCommentAlt className='mr-1 text-blue-500 ml-3 text-lg' /> {acessos}</p>
                  <p className='text-gray-300 font-extralight lg:text-sm sm:text-xs flex flex-row items-center sm:justify-center sm:text-center lg:justify-start'><FaHeart className='mr-1 ml-3 text-red-500 text-lg' /> {acessos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="HeaderIMG w-full ">
          <motion.img src={imgSrc} alt="" className="w-full max-h-60" />
        {/* CATEGORIA */}
          <div className="p-5 w-full -mt-28 drop-shadow-lg">
            <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
              <div className="badge text-sm sm:text-xs">{categoria}</div>
            </h1>
            <h1 className="text-white font-semibold text-3xl lg:sm:text-xl sm:text-sm tracking-tight">
              {titulo}
            </h1>
          </div>
        </div>
        {/* POST */}
        <div className="bg-dark2 tracking-tight border-b-4 border-black rounded-b-lg align-middle items-center pb-16 w-full">
          <div
            className="px-3 py-5 border-current sm:text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: conteudo }}
          />
        </div>
        <div className="flex justify-center pb-5 tracking-tight -mt-14">
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
                  onClick={() => {}}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white"
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
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg border-b-4 border-purple-700 h-10 w-40 sm:text-sm font-medium text-white"
                >
                  Continuar lendo
                </button>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
