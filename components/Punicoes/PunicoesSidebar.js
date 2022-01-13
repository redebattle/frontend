import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useToasts } from 'react-toast-notifications'
import { FaBan, FaBullhorn, FaChartLine, FaSearch } from 'react-icons/fa'
import Link from 'next/link'

export default function PunicoesSidebar({estatisticas}) {
  const { addToast } = useToasts()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const router = useRouter()

  async function searchUser({ username }) {
    router.push(`/punicoes/user?name=${username}`);
  }
  return (
    <div className="Sidebar">
      <div className="lg:max-w-sm sm:w-full">
        <div className="COMECA AQUI">
          <form
            onSubmit={handleSubmit(searchUser)}
          >
            <div className="flex items-center justify-center">
              <div className="flex">
                  <input
                    {...register('username', { required: true})}
                    type="text"
                    id="username"
                    className="px-4 py-2 w-60 bg-dark2 text-gray-200 focus:outline-none border-b-4 border-black rounded-l-lg"
                    placeholder="Buscar usuário..."
                  />
                  <button className="flex items-center justify-center px-4 border-l bg-purple-500 focus:outline-none hover:bg-purple-700 border-b-4 border-black rounded-r-lg">
                    <FaSearch className="text-gray-200" />
                  </button>
              </div>
            </div>
          </form>
        </div>
        <div className="COMECA AQUI p-3">
          <div className="justify-center">
            <div className="bg-dark2 border-b-4 border-black rounded-lg">
              <div className='flex items-center justify-center pt-5 text-blue-500 text-7xl'>
                <FaChartLine />
              </div>
              <h1 className="p-3 font-semibold text-gray-200 text-center text-xl tracking-tight">
                Estatísticas
              </h1>
              <div className="pb-5">
                <h2 className="text-md text-center text-gray-300 font-light tracking-tight">
                  Punições aplicadas: {estatisticas?.total ? estatisticas?.total : 'Erro'}
                </h2>

                <h2 className="text-md text-center text-gray-300 font-light tracking-tight">
                  Usuários punidos: {estatisticas?.usuarios ? estatisticas?.usuarios : 'Erro'}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="COMECA AQUI p-3">
          <div className="justify-center">
            <div className="bg-dark2 border-b-4 border-black rounded-lg">
              <div className='flex items-center justify-center pt-5 text-red-500 text-7xl'>
                <FaBan />
              </div>
              <h1 className="p-3 font-semibold text-white text-center text-xl tracking-tight">
                Evite punições, conheça as regras!
              </h1>
              <div className="flex pb-5 items-center justify-center">
                <Link href="#">
                  <button className="bg-purple-600 border-b-4 border-purple-700 transform hover:scale-110 transition delay-60 duration-300 ease-in-out h-10 w-32 font-semibold text-white">
                    Leia mais
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="COMECA AQUI p-3">
          <div className="justify-center">
            <div className="bg-dark2 border-b-4 border-black rounded-lg">
              <div className='flex items-center justify-center pt-5 text-orange-500 text-7xl'>
                <FaBullhorn />
              </div>
              <h1 className="p-3 font-semibold text-white text-center text-xl tracking-tight">
                Contribua com nossa comunidade! Denuncie infratores!
              </h1>
              <div className="flex pb-5 items-center justify-center">
                <Link href="#">
                  <button className="bg-purple-600 border-b-4 border-purple-700 transform hover:scale-110 transition delay-60 duration-300 ease-in-out h-10 w-32 font-semibold text-white">
                    Denunciar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
