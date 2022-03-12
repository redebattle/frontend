import DashboardAsid from './Aside'
import DashboardHeader from './Header'
import { motion } from 'framer-motion'

export default function ErrorDashboard({ active }) {
  return (
    <>
      <div className="flex bg-dark2 min-h-screen">
        <DashboardAsid active={active} />
        <div className="flex-grow text-gray-800">
          <DashboardHeader />
          <motion.main
            transition={{ duration: 0.3, delay: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 15, opacity: 0 }}
            className="p-6 sm:p-10 space-y-6 bg-dark2"
          >
            <section className="grid md:grid-cols-1 xl:grid-cols-1 xl:grid-rows-1 xl:grid-flow-col gap-6">
              <div className="p-12 flex items-center justify-center flex-col md:col-span-1 md:row-span-1 bg-dark3 shadow rounded-lg">
                <h1 className="lg:text-9xl sm:text-6xl font-bold animate-pulse text-red-500 text-center">
                  ERRO!
                </h1>
                <h1 className="lg:text-3xl sm:text-xl text-gray-300 font-medium text-center">
                  Ocorreu um erro.
                </h1>
                <h1 className="text-gray-300 text-center sm:text-sm">
                  Não foi possível realizar a conexão com a API.
                </h1>
              </div>
            </section>
            <section className="text-center font-bold text-gray-500">
              <p className="bg-dark rounded-lg bg-opacity-30">
                © Rede Battle <br />
                Development by Filipe Moreno
              </p>
            </section>
          </motion.main>
        </div>
      </div>
    </>
  )
}
