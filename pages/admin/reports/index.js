import { motion } from 'framer-motion'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Line, Bar, Area } from 'recharts'

import Chart from '../../../components/Chart'
import DashboardAsid from '../../../components/Dashboard/Aside'
import DashboardHeader from '../../../components/Dashboard/Header'
import api from '../../../service/api'
import { areaTheme, barTheme } from '../../../utils/chartThemes'
import dadosArea from '../../../utils/dadosArea'
import dadosBar from '../../../utils/dadosBar'

export default function IndexDashboard({ getReports }) {
  return (
    <>
      <title>Painel | Rede Battle</title>
      <div className="flex bg-dark2 min-h-screen">
        <DashboardAsid />

        <div className="flex-grow text-gray-800">
          <DashboardHeader />
          <motion.main
            transition={{ duration: 0.3, delay: 0 }}
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 15, opacity: 0 }}
            className="p-6 sm:p-10 space-y-6 bg-dark2"
          >
            <section className="">
              <div className="flex flex-col md:col-span-2 md:row-span-2 bg-dark3 shadow rounded-lg">
                <div className="px-6 py-5 font-semibold border-b border-dark5 text-gray-300">
                  Reports em abertos
                </div>
                <div className="px-6 py-5 font-semibold text-gray-300">
                  <table class="table table-zebra w-full">
                    <thead>
                      <tr className="bg-dark rounded-none">
                        <th>#</th>
                        <th>Autor -> Reportado</th>
                        <th>Motivo</th>
                        <th>Servidor</th>
                        <th>Status</th>
                        <th>Definição</th>
                        <th>Arquivado?</th>
                        <th>Data</th>
                        <th>Comentários</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getReports.map(report => {
                        return (
                          <tr>
                            <th>{report.report_id}</th>
                            <th>{report.reporter.name} -> {report.reported.name}</th>
                            <td>{report.reason}</td>
                            <td>{report.reporter_location.split("/",1)}</td>
                            {report.status === 'Waiting' && <td><div class="badge badge-outline text-gray-400">Aguardando</div></td>}
                            {console.log(report.status.split(" ", 3)[2])}
                            {report.status.split("-", 1) == 'In_progress' && <td><div class="badge badge-outline text-yellow-500">Em progresso</div></td>}
                            {report.status === 'Important' && <td><div class="badge badge-outline text-red-500">Importante</div></td>}
                            {report.status.split(" ", 1) == 'Done' && <td><div class="badge badge-outline text-whatsapp">Finalizado</div></td>}
                            {report.appreciation === 'True' && <td><div class="badge badge-outline text-whatsapp">Verdadeiro</div></td>}
                            {report.appreciation === 'Uncertain' && <td><div class="badge badge-outline text-orange-500">Incerteza</div></td>}
                            {report.appreciation === 'False' && <td><div class="badge badge-outline text-red-500">Falso</div></td>}
                            <td>{report.archived === 0 && 'Não' || 'Sim'}</td>
                            <td>{report.date}</td>
                            {report.comments === null && <td>Nenhum</td> || <td>Ver</td>}
                            <td></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
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
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const { 'battleadmin.token': token } = await parseCookies(ctx)
  let possuiPermissao = false
  let error = false

  const getReports = await api
    .get('/reports/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch(e => {
      console.log('Ocorreu um erro ao realizar a conexão getReports')
      error = true
    })

  return {
    props: { possuiPermissao, error, getReports }
  }
}
