import { motion } from 'framer-motion'
import { useToasts } from 'react-toast-notifications'
import { Timeline } from 'react-twitter-widgets'

export default function IndexSidebar() {
  const { addToast } = useToasts()

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
  return (
    <div className="Sidebar hidden sm:block">
      <div className="pl-10">
        <div className="COMECA AQUI">
          <div className="justify-center">
            <div className="bg-dark2 border-b-4 border-black border-opacity-60 rounded-lg">
              <h1 className="pt-5 font-medium text-gray-200 text-center text-xl tracking-tight">
                Nosso IP 😗
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
          <div className="flex justify-center pt-5 pb-5 mt-2 mb-2 bg-dark2 border-b-4 border-black border-opacity-60 rounded-lg">
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
          <div className="flex justify-center pt-5 pb-5 mt-2 mb-2 bg-dark2 border-b-4 border-black border-opacity-60 rounded-lg">
              <p className='text-gray-300'>Publicidade</p>
          </div>
        </div>
        <div className="COMECA AQUI">
          <div className="flex justify-center pt-5 pb-5 mt-2 mb-2 bg-dark2 border-b-4 border-black border-opacity-60 rounded-lg">
          <Timeline
            dataSource={{ sourceType: "profile", screenName: "cubeboxoficial" }}
            options={{ theme: "dark", width: "350", height: "600", lang: "pt" }}
            renderError={_err =>
              "Deu um erro na Timeline do Twitter bro :( Arruma ae pow"
            }
          />
          </div>
        </div>
      </div>
    </div>
  )
}