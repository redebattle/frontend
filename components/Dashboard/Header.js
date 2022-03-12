import { Router } from 'next/router'
import { destroyCookie } from 'nookies'
import { useContext } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import UserAvatar from 'react-user-avatar'
import { AuthContext } from '../../contexts/AuthContext'

export default function DashboardHeader() {
  const { user, roles } = useContext(AuthContext)

  async function handleSignOut() {
    await destroyCookie(null, 'battleadmin.token', {
      path: '/'
    })
    Router.push('/admin/auth/login')
  }
  return (
    <header className="flex items-center h-20 px-6 sm:px-10 bg-dark3">
      <button
        data-collapse-toggle="mobile-menu"
        className="sm:block lg:hidden relative flex-shrink-0 p-2 mr-2 text-gray-300 hover:bg-dark5 hover:text-gray-200 focus:bg-dark5 focus:text-gray-200 rounded-full"
        aria-controls="mobile-menu-2"
        aria-expanded="false"
      >
        <span className="sr-only">Menu</span>
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      <div className="hidden md:block md:w-auto relative w-full max-w-md sm:-ml-2 items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          role="search"
          placeholder="Pesquisar..."
          className="py-2 pl-10 pr-4 w-full border-1 border-dark5 bg-dark2 placeholder-gray-300 focus:border-purple-500 text-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-shrink-0 items-center ml-auto">
        <button className="inline-flex items-center p-2 hover:bg-dark5 hover:text-red-500 focus:bg-dark5 rounded-lg">
          <span className="sr-only">User Menu</span>
          <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span className="font-semibold text-purple-500">
              {(user?.nome && user.nome) || (
                <SkeletonTheme baseColor="#6049" highlightColor="#9657">
                  <p>
                    <Skeleton count={1} />
                  </p>
                </SkeletonTheme>
              )}
            </span>
            <span className="text-sm text-gray-300">Lecturer</span>
          </div>
          <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
            {(user?.avatar?.url && (
              <img
                src={user?.avatar?.url || '/img/no-avatar.png'}
                alt="avatar"
                className="rounded-full h-8 w-8 flex items-center justify-center ml-4 border-gray-400"
              />
            )) || (
              <UserAvatar
                size="48"
                name={user?.nome || 'Rede Battle'}
                className="flex text-gray-300 font-bold"
              />
            )}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="hidden sm:block h-6 w-6 text-gray-300"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="border-l border-dark5 pl-3 ml-3 space-x-1">
          <button className="relative p-2 text-gray-300 hover:bg-dark5 focus:bg-dark5 focus:text-gray-300 rounded-lg">
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
            <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <button
            onClick={() => handleSignOut()}
            className="text-center relative p-2 text-gray-300 hover:bg-dark5 hover:text-red-500 focus:bg-dark5 focus:text-red-500 rounded-lg"
          >
            <span className="sr-only">Sair</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
