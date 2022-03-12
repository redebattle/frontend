import { motion } from 'framer-motion'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import Skeleton from 'react-loading-skeleton'
import { Line, Bar, Area } from 'recharts'

import Chart from '../../components/Chart'
import DashboardAsid from '../../components/Dashboard/Aside'
import DashboardHeader from '../../components/Dashboard/Header'
import api from '../../service/api'
import { areaTheme, barTheme } from '../../utils/chartThemes'
import dadosArea from '../../utils/dadosArea'
import dadosBar from '../../utils/dadosBar'

const Main = ({ cards }) => (
  <motion.main
    transition={{ duration: 0.3, delay: 0 }}
    animate={{ y: 0, opacity: 1 }}
    initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6 bg-dark2"
  >
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-newspaper w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
          </svg>
        </div>
        <div>
          <span className="block text-2xl text-purple-500 font-bold">
            {cards?.postagens || <Skeleton count={1} />}
          </span>
          <span className="block text-gray-300">
            <Link href={'/admin/postagens'}>Postagens</Link>
          </span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-headset w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
          </svg>
        </div>
        <div>
          <span className="block text-2xl text-purple-500 font-bold">
            {cards?.tickets || <Skeleton count={1} />}
          </span>
          <span className="block text-gray-300">
            <Link href={'/admin/tickets'}>Tickets abertos</Link>
          </span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-cart-check w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </div>
        <div>
          <span className="inline-block text-2xl text-purple-500 font-bold">
            {cards?.vendas || <Skeleton count={1} />}
          </span>
          <span className="block text-gray-300">
            <Link href={'/admin/vendas'}>Vendas</Link>
          </span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-orange-600 bg-orange-100 rounded-full mr-6">
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl text-purple-500 font-bold">
            {<Skeleton count={1} />}
          </span>
          <span className="block text-gray-300">Finished homeworks</span>
        </div>
      </div>
    </section>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
      <div className="flex flex-col md:col-span-2 md:row-span-2 bg-dark3 shadow rounded-lg">
        <div className="px-6 py-5 font-semibold border-b border-dark5 text-gray-300">
          The number of applied and left students per month
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center bg-dark4 justify-center h-full px-4 py-16 text-gray-300 text-sm font-bold rounded-md">
            <Chart type="area" data={dadosArea}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F77737" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F77737" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area dataKey="Abertos" fill="url(#colorPv)" {...areaTheme} />
              <Area dataKey="Fechados" fill="url(#colorUv)" {...areaTheme} />
            </Chart>
          </div>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              fill="#fff"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold text-purple-500">25</span>
          <span className="block text-gray-300">Lections left</span>
        </div>
      </div>
      <div className="flex items-center p-8 bg-dark3 shadow rounded-lg">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <span className="block text-2xl font-bold text-purple-500">139</span>
          <span className="block text-gray-300">Hours spent on lections</span>
        </div>
      </div>
      <div className="row-span-3 bg-dark3 shadow rounded-lg">
        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-dark5">
          <span className="text-gray-300">Students by average mark</span>
          <button
            type="button"
            className="inline-flex justify-center rounded-md px-1 -mr-1 bg-dark2 border border-dark5 text-sm leading-5 font-medium text-gray-300 hover:text-gray-400"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Descending
            <svg
              className="-mr-1 ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
          <ul className="p-6 space-y-6">
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/82.jpg"
                  alt="Annette Watson profile picture"
                />
              </div>
              <span className="text-gray-300">Annette Watson</span>
              <span className="ml-auto font-semibold text-purple-500">9.3</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/81.jpg"
                  alt="Calvin Steward profile picture"
                />
              </div>
              <span className="text-gray-300">Calvin Steward</span>
              <span className="ml-auto font-semibold text-purple-500">8.9</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/80.jpg"
                  alt="Ralph Richards profile picture"
                />
              </div>
              <span className="text-gray-300">Ralph Richards</span>
              <span className="ml-auto font-semibold text-purple-500">8.7</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/79.jpg"
                  alt="Bernard Murphy profile picture"
                />
              </div>
              <span className="text-gray-300">Bernard Murphy</span>
              <span className="ml-auto font-semibold text-purple-500">8.2</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/78.jpg"
                  alt="Arlene Robertson profile picture"
                />
              </div>
              <span className="text-gray-300">Arlene Robertson</span>
              <span className="ml-auto font-semibold text-purple-500">8.2</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/77.jpg"
                  alt="Jane Lane profile picture"
                />
              </div>
              <span className="text-gray-300">Jane Lane</span>
              <span className="ml-auto font-semibold text-purple-500">8.1</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/76.jpg"
                  alt="Pat Mckinney profile picture"
                />
              </div>
              <span className="text-gray-300">Pat Mckinney</span>
              <span className="ml-auto font-semibold text-purple-500">7.9</span>
            </li>
            <li className="flex items-center">
              <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Norman Walters profile picture"
                />
              </div>
              <span className="text-gray-300">Norman Walters</span>
              <span className="ml-auto font-semibold text-purple-500">7.7</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col row-span-3 bg-dark3 shadow rounded-lg">
        <div className="px-6 py-5 font-semibold border-b border-dark5 text-gray-300">
          Students by type of studying
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-center h-full px-4 py-24 text-gray-200 text-sm font-bold bg-dark4 rounded-lg">
            <Chart type="bar" data={dadosBar}>
              <Bar {...barTheme} fill="#833AB4" dataKey="VIP" />
              <Bar {...barTheme} fill="#F56040" dataKey="Cash" />
              <Bar {...barTheme} fill="#25d366" dataKey="Outros" />
            </Chart>
          </div>
        </div>
      </div>
    </section>

    <section className="text-center font-bold text-gray-500">
      <p className="bg-dark rounded-lg bg-opacity-30">
        © Rede Battle <br />
        Development by Filipe Moreno
      </p>
    </section>
  </motion.main>
)

export default function Home({ getDashboard }) {
  return (
    <>
      <title>Painel | Rede Battle</title>
      <div className="flex bg-dark2 min-h-screen">
        <DashboardAsid />

        <div className="flex-grow text-gray-800">
          <DashboardHeader />
          <Main cards={getDashboard} />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'battleadmin.token': token } = await parseCookies(ctx)
  let possuiPermissao = false
  let error = false

  if (!token) {
    return {
      redirect: {
        destination: '/admin/auth/login',
        permanent: false
      }
    }
  }

  const getUserRoles = await api
    .get('/roles/admin/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data.permissoes)
    .catch(e => {
      console.log('Ocorreu um erro ao realizar a conexão getRoles')
      error = true
    })

  getUserRoles?.map(roles => {
    if (
      roles.role.nome === 'DASHBOARD' ||
      roles.role.nome === 'DASHBOARD.*' ||
      roles.role.nome === '*'
    ) {
      possuiPermissao = true
    }
  })

  const getDashboard = await api
    .get('/dashboard', { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao acessar a API getDashboard', e)
      error = true
    })
  return {
    props: { getDashboard, possuiPermissao, error }
  }
}
