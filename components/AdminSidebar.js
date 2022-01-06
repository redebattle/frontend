/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { destroyCookie } from 'nookies'
import { useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import UserAvatar from 'react-user-avatar'

import Router from 'next/router'
import Link from 'next/link'
import {
  FaCode,
  FaCoffee,
  FaHeart,
  FaShoppingBasket,
  FaBoxOpen,
  FaDatabase,
  FaCalculator,
  FaUserSlash,
  FaRetweet,
  FaShareSquare,
  FaBalanceScale,
  FaSearchDollar,
  FaCartArrowDown,
  FaClipboard,
  FaUsers,
  FaCalendarAlt,
  FaTerminal,
  FaLink,
  FaPaperclip,
  FaMoneyCheckAlt,
  FaUserCog,
  FaServer,
  FaHandPointRight
} from 'react-icons/fa'

import { AuthContext } from '../contexts/AuthContext'
export default function AdminSidebar() {
  const { user, roles } = useContext(AuthContext)

  async function handleSignOut() {
    await destroyCookie(null, 'cubeadmin.token', {
      path: '/'
    })
    Router.push('/admin/auth/login')
  }
  return (
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-dark2 h-full shadow-lg">
      <div className="overflow-y-auto overflow-x-hidden flex-grow scrollbar scrollbar-thumb-dark2 hover:scrollbar-thumb-dark3 scrollbar-track-dark2">
        <ul className="flex flex-col py-6 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                Painel de{' '}
                <div className="text-purple-500 font-semibold ml-1">
                  {' '}
                  Controle
                </div>
              </div>
            </div>
          </li>

          <li>
            <Link href="/admin/my-account">
              <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                {/* {(user?.avatar?.url && (
                  <img
                    src={user?.avatar?.url || '/img/no-avatar.png'}
                    alt="avatar"
                    className="rounded-full h-8 w-8 flex items-center justify-center ml-4 border-gray-400"
                  />
                )) || ( */}
                <UserAvatar
                  size="36"
                  name={user?.nome || 'Rede Battle'}
                  className="flex items-center justify-center ml-4 border-gray-400 text-gray-300"
                />
                <div className="flex flex-col ml-2">
                  <span className="-mb-1 font-semibold text-xs tracking-wide truncate font-sans">
                    Logado como
                  </span>
                  <span className="font-semibold text-sm tracking-wide truncate font-sans">
                    {(user?.nome && user.nome) || (
                      <SkeletonTheme
                        color="rgba(33, 33, 33, 0.2)"
                        highlightColor="rgba(255, 255, 255, 0.3)"
                      >
                        <p>
                          <Skeleton count={1} />
                        </p>
                      </SkeletonTheme>
                    )}
                  </span>
                </div>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/admin">
              <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                  Início
                </span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/">
              <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <FaHandPointRight />
                </span>
                <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                  Visualizar Site
                </span>
              </a>
            </Link>
          </li>

          <li>
            <a
              onClick={handleSignOut}
              className="relative flex flex-row cursor-pointer items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4 text-red-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Sair
              </span>
            </a>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                Site
              </div>
            </div>
          </li>

          {roles.map(permi => {
            if (
              permi.role.nome === 'SITE.POSTAGENS' ||
              permi.role.nome === 'SITE.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <Link href="/admin/postagens">
                    <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span className="inline-flex justify-center items-center ml-4">
                        <FaClipboard />
                      </span>
                      <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                        Postagens
                      </span>
                    </a>
                  </Link>
                </li>
              )
            }
          })}

          {roles.map(permi => {
            if (
              permi.role.nome === 'SITE.EQUIPE' ||
              permi.role.nome === 'SITE.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <Link href="/admin/equipe">
                    <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span className="inline-flex justify-center items-center ml-4">
                        <FaUsers />
                      </span>
                      <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                        Equipe
                      </span>
                    </a>
                  </Link>
                </li>
              )
            }
          })}

          {roles.map(permi => {
            if (
              permi.role.nome === 'SITE.ATUALIZACOES' ||
              permi.role.nome === 'SITE.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <Link href="/admin/atualizacoes">
                    <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span className="inline-flex justify-center items-center ml-4">
                        <FaCalendarAlt />
                      </span>
                      <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                        Atualizações
                      </span>
                    </a>
                  </Link>
                </li>
              )
            }
          })}

          {roles.map(permi => {
            if (
              permi.role.nome === 'SITE.TERMOS' ||
              permi.role.nome === 'SITE.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <FaPaperclip />
                    </span>
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                      Termos de Uso
                    </span>
                  </a>
                </li>
              )
            }
          })}

          {roles.map(permi => {
            if (
              permi.role.nome === 'SITE.MANUTENCAO' ||
              permi.role.nome === 'SITE.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <FaTerminal />
                    </span>
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                      Manutenção
                    </span>
                  </a>
                </li>
              )
            }
          })}

          {roles.map(permi => {
            if (
              permi.role.nome === 'SITE.ENCURTADOR' ||
              permi.role.nome === 'SITE.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <Link href="/admin/encurtador">
                    <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                      <span className="inline-flex justify-center items-center ml-4">
                        <FaLink />
                      </span>
                      <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                        Encurtador
                      </span>
                      <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-100 rounded-full">
                        Novo
                      </span>
                    </a>
                  </Link>
                </li>
              )
            }
          })}
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                Loja
              </div>
            </div>
          </li>

          <li>
            <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <FaBoxOpen />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Pacotes
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaDatabase />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Servidores
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaCalculator />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Descontos
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaCartArrowDown />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Estornos
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaSearchDollar />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Anti-Fraude
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaBalanceScale />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Capital de Giro
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaShareSquare />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Ativar produto
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaUserSlash />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Bloquear conta
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaRetweet />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Transações
              </span>
            </a>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                Configurações
              </div>
            </div>
          </li>

          <li>
            <a
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaMoneyCheckAlt />
              </span>
              <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                Pagamentos
              </span>
            </a>
          </li>

          {roles.map(permi => {
            if (
              permi.role.nome === 'CONFIGURACOES.USUARIOS' ||
              permi.role.nome === 'CONFIGURACOES.*' ||
              permi.role.nome === '*'
            ) {
              return (
                <li>
                  <a
                    href="#"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <FaUserCog />
                    </span>
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                      Usuários
                    </span>
                  </a>
                </li>
              )
            }
          })}

          <li>
            <div className="flex flex-col items-center justify-center text-white text-xs mt-10">
              <div className="flex items-center justify-center">
                <FaCode className="mr-1" />
                Development by Filipe Moreno
              </div>
              <div className="flex items-center justify-center">
                Feito com
                <FaHeart className="text-red-500 mx-1" />
                e <FaCoffee className="mx-1" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
