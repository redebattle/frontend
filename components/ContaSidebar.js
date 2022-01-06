/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { FaUser, FaShoppingCart, FaHeadset, FaSignOutAlt } from 'react-icons/fa'
import { destroyCookie } from 'nookies'
import Link from 'next/link'
import Router from 'next/router'

export default function ContaSidebar() {
  async function handleSignOut() {
    await destroyCookie(null, 'redebattle.token', { path: '/' })
    Router.push('/conta/login')
  }

  return (
    <div className="flex flex-col">
      <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-16">
        <div className="flex items-center justify-center p-4">
          <img
            src="https://minotar.net/helm/TheMito/80.png"
            className="rounded-md"
          />

          <h1 className="text-gray-300 text-3xl ml-3 pt-4">TheMito</h1>
        </div>
      </div>
      <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-16 h-26 max-w-xs">
        <div className="flex flex-col items-center p-4 text-gray-300">
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <Link href="/conta">
              <a className="ml-2">Resumo</a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaUser />
            <Link href="/conta/perfil">
              <a className="ml-2">Minha Conta</a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaShoppingCart />
            <Link href="/conta/compras">
              <a className="ml-2">Minhas compras</a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaHeadset />
            <Link href="/conta/suporte">
              <a className="ml-2">Suporte</a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-red-500 p-1">
            <FaSignOutAlt />
            <button onClick={handleSignOut} className="ml-2">
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
