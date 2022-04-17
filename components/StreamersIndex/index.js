import { motion } from 'framer-motion'
import Router from 'next/router'
import { setCookie } from 'nookies'

import { BsRecordFill } from 'react-icons/bs'

export default function StreamersIndex({ lives }) {
  async function handleRedirectFromLive(data) {
    setCookie(undefined, 'twitch.live', data.user_login, {
      maxAge: 60 * 60 * 24,
      path: '/'
    })
    Router.push('/live')
  }
  return (
    <>
      <div className="lg:my lg:mx-8 sm:m-4 sm:p-4 lg:p-6 border-b-4 border-red-500">
        <h1 className="flex flex-row items-center font-bold text-2xl">
          STREAMERS ONLINE{' '}
          <BsRecordFill className="ml-2 text-red-500 animate-pulse" />
        </h1>
      </div>
      <div className="flex flex-wrap sm:justify-center lg:justify-start lg:px-6 lg:mx-4 sm:mx-0 sm:px-0">
        {lives.map(live => {
          const liveImage = live.thumbnail_url
            .replace('{width}', 338)
            .replace('{height}', 190)

          return (
            <div className="p-2">
              <div
                className="flex rounded-lg sm:w-[360px] md:w-full lg:w-[338px] h-[190px]"
                style={{
                  backgroundImage: `url(${liveImage})`
                }}
              >
                <motion.div
                  onClick={() => handleRedirectFromLive(live)}
                  whileHover={{ opacity: 0 }}
                  transition={{
                    opacity: { ease: 'linear' },
                    layout: { duration: 0.3 }
                  }}
                  className="flex flex-col items-center justify-center bg-black bg-opacity-60 overflow-hidden cursor-pointer w-full h-full rounded-lg"
                >
                  <h1 className="font-bold text-xl">{live.user_name}</h1>
                  <p className="text-lg">
                    {Intl.NumberFormat('pt-BR', {}).format(live.viewer_count)}{' '}
                    espectadores
                  </p>
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
