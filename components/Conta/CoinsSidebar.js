/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { destroyCookie } from 'nookies'
import Link from 'next/link'
import Router from 'next/router'

import {
  FaUser,
  FaShoppingCart,
  FaHeadset,
  FaSignOutAlt,
  FaTrophy,
  FaMoneyBill,
  FaMoneyBillAlt,
  FaMoneyBillWave,
  FaCoins,
  FaInfo,
  FaTable,
  FaSync,
  FaSmile,
  FaSmileWink,
  FaArrowRight
} from 'react-icons/fa'

export default function ContaCoinsSidebar() {
  async function handleSignOut() {
    await destroyCookie(null, 'redebattle.token', { path: '/' })
    Router.push('/conta/login')
  }

  function getMedails(medails) {
    return (
      <div className="flex flex-wrap items-center justify-center bg-dark3 rounded-lg p-2 m-1">
        <div
          className="w-8 h-8 rounded-full m-2 tooltip hover:tooltip-open"
          data-tip="Medalha"
        >
          <img
            src="https://cdn.discordapp.com/attachments/656500951762337793/786093121757904927/7726_cs_master.png"
            alt=""
          />
        </div>
        <div className="w-8 h-8 rounded-full m-2">
          <img
            src="https://cdn.discordapp.com/attachments/656500951762337793/786093123965157376/2850_DiscordStaff.png"
            alt=""
          />
        </div>
        <div className="w-8 h-8 rounded-full m-2">
          <img
            src="https://media.discordapp.net/attachments/721741385870344232/794259132487827456/coronavirus.png"
            alt=""
          />
        </div>
        <div className="w-8 h-8 rounded-full m-2">
          <img
            src="https://cdn.discordapp.com/attachments/656500951762337793/818901476721819648/vote.png"
            alt=""
          />
        </div>
        <div className="w-8 h-8 rounded-full m-2">
          <img
            src="https://cdn.discordapp.com/attachments/656500951762337793/786093120416776192/5129_cs_platinum.png"
            alt=""
          />
        </div>
        <div className="w-8 h-8 rounded-full m-2">
          <img
            src="https://cdn.discordapp.com/attachments/656500951762337793/828416274584961034/easter-egg_1.png"
            alt=""
          />
        </div>
        <div className="w-8 h-8 rounded-full m-2">
          <img
            src="https://cdn.discordapp.com/attachments/656500951762337793/791447804807086090/oie_1Z1WwBrgElcu-min.png"
            alt=""
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col max-w-sm">
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 mx-3">
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-xs mb-2">Logado como:</p>
          <img
            src="https://minotar.net/helm/TheMito/80.png"
            className="rounded-lg"
          />
          <h1 className="text-gray-300 text-3xl pt-2 font-bold">TheMito</h1>
          <div className="flex flex-wrap lg:flex-row sm:flex-col items-center justify-center mt-2">
            <span className="badge badge-outline text-yellow-400 font-bold">
              VIP CUBE
            </span>
            <span className="badge badge-outline text-cyan-400 font-bold lg:mr-1 lg:ml-1 sm:mt-2 sm:mb-2">
              VIP HYPE
            </span>
            <span className="badge badge-outline text-purple-400 font-bold">
              VIP BATTLE
            </span>
            <span className="badge badge-outline text-purple-400 font-bold">
              VIP BATTLE
            </span>
            <span className="badge badge-outline text-purple-400 font-bold">
              VIP BATTLE
            </span>
            <span className="badge badge-outline text-purple-400 font-bold">
              VIP BATTLE
            </span>
          </div>
          <h1 className="font-bold mt-2">Medalhas</h1>
          {getMedails()}
        </div>
      </div>
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 h-26 mx-3">
        <div className="flex flex-col items-center p-4 text-gray-300">
          <div className="text-xl flex justify-center items-center flex-col font-bold uppercase p-2">
            <FaCoins className="text-yellow-400" />
            <h1>Saldo Atual</h1>
          </div>
          <p className="text-sm">Você possui:</p>
          <p className="text-xl font-bold">0 BCoins</p>
        </div>
      </div>
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 h-26 mx-3">
        <div className="flex flex-col items-center p-4 text-gray-300">
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaArrowRight />
            <Link href="/conta/coins/trocas">
              <a className="ml-2">Minhas trocas</a>
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center cursor-pointer hover:text-purple-500 p-1">
            <FaArrowRight />
            <Link href="/conta/coins/transacoes">
              <a className="ml-2">Transações</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-dark2 border-b-4 border-black rounded-lg mt-5 h-26 mx-3">
        <div className="flex flex-col items-center p-4 text-gray-300">
          <div className="text-xl flex justify-center items-center flex-col font-bold uppercase p-2">
            <FaSync className="text-yellow-400" />
            <h1>Últimas trocas</h1>
          </div>
          <p className="text-4xl text-yellow-400 font-bold mt-3">
            <FaSmileWink />
          </p>
          <p className="text-lg text-center">Você ainda não fez trocas.</p>
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
    </div>
  )
}
