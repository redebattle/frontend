/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { FaUser, FaShoppingCart, FaHeadset, FaSignOutAlt, FaTrophy, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaCoins } from 'react-icons/fa'
import { destroyCookie } from 'nookies'
import Link from 'next/link'
import Router from 'next/router'

export default function ContaSidebar() {
  async function handleSignOut() {
    await destroyCookie(null, 'redebattle.token', { path: '/' })
    Router.push('/conta/login')
  }

  return (
    <div className="flex flex-col max-w-sm">
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3">
        <div className="flex flex-col items-center justify-center p-4">
          <p className='text-xs mb-2'>Logado como:</p>
          <img
            src="https://minotar.net/helm/TheMito/80.png"
            className="rounded-lg"
          />
          <h1 className="text-gray-300 text-3xl pt-2 font-bold">TheMito</h1>
          <div className='flex lg:flex-row sm:flex-col items-center justify-center mt-2'>
            <span class="badge badge-outline text-yellow-400 font-bold">VIP CUBE</span>
            <span class="badge badge-outline text-cyan-400 font-bold lg:mr-1 lg:ml-1 sm:mt-2 sm:mb-2">VIP HYPE</span>
            <span class="badge badge-outline text-purple-400 font-bold">VIP BATTLE</span>
          </div>
          <h1 className='font-bold mt-2'>Medalhas:</h1>
          <div className='flex lg:flex-row sm:flex-col items-center justify-center mt-2'>
            <span class="badge badge-outline text-youtube font-bold">EM BREVE</span>
          </div>
        </div>
      </div>
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 h-26 mx-3">
        <div className="flex flex-col items-center p-4 text-gray-300">
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaUser />
            <Link href="/conta">
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
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaCoins />
            <Link href="/conta/coins">
              <a className="ml-2">Battle Coins</a>
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
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 h-26 mx-3">
        <div className="flex flex-col items-center p-4 text-gray-300">
          <div className='text-xl flex justify-center items-center flex-col font-bold uppercase p-2'><FaTrophy className='text-yellow-400' /><h1>Recompensas</h1></div>
          <p className='text-sm'>Você já gastou R$ 0,00</p>
          <div className="w-72 bg-gray-200 rounded-full dark:bg-dark3 my-2">
            <div className="bg-purple-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full space-y-2" style={{width: '0%'}}>
             0%
            </div>
          </div>
          <p className='text-xs'>Você não tem recompensas para recolher!</p>
        </div>
      </div>
    </div>
  )
}
