import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'

export default function PostComponent({id, titulo, categoria, autor, data, imgSrc, conteudo, isLink, link, acessos, avatarId}) {
  const [dataPost, setDataPost] = useState(data)

  useEffect(() => {
    setDataPost(
      Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(new Date(data))
    )
  }, [dataPost])
  return (
    <>
      <div key={id} className="flex flex-col items-center justify-center p-8">
        <div className="p-1 w-full bg-white rounded-t-lg border-gray-200 dark:bg-dark2">
          <div className="p-5 space-y-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 sm:w-full">
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
                className="block mx-auto h-16 rounded-xl sm:mx-0 sm:flex-shrink-0 sm:h-14"
                src={`https://cravatar.eu/helmavatar/${autor}/96`}
                alt={autor}
              />}
            </motion.button>

            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-gray-300 font-medium">
                  Postado por {autor}
                </p>
                <p className="text-gray-300 font-extralight text-xs">
                  {data}
                </p>
                <p className='text-gray-300 font-extralight text-sm flex flex-row items-center'>{acessos} <FaEye className='ml-2' /></p>
              </div>
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="HeaderIMG w-full">
          <motion.img src={imgSrc} alt="" className="w-full max-h-60" />
        </div>
        {/* CATEGORIA */}
        <div className="bg-purple-600 border-b-4 border-purple-700 p-5 w-full">
          <h1 className="text-white font-thin text-lg sm:text-sm tracking-tight">
            <div class="badge">{categoria}</div>
          </h1>
          <h1 className="text-white font-semibold text-3xl sm:text-xl tracking-tight">
            {titulo}
          </h1>
        </div>
        {/* POST */}
        <div className="bg-dark2 tracking-tight border-b-4 border-black rounded-b-lg align-middle items-center pb-3 w-full">
          <p
            className="px-3 py-5 border-current sm:text-sm text-gray-300"
            dangerouslySetInnerHTML={{ __html: conteudo }}
          />
        </div>
        <div className="flex justify-center pb-5 tracking-tight -mt-6">
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
