/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import Error from 'next/error'
import Link from 'next/link'
import Router from 'next/router'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { FaTwitter, FaDiscord } from 'react-icons/fa'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Manutencao from '../../components/Manutencao'
import api from '../../service/api'
const Equipe = ({ nome, twitter, discord, cor }) => {
  return (
    <div className="p-4 mx-6 bg-dark2 border border-b-4 border-black rounded-lg">
      <div>
        <img
          src={`https://minotar.net/bust/${nome}/120.png`}
          className="rounded-md tool"
          data-tip
          data-for="equipe"
        />
        <p
          className="flex items-center justify-center mt-3 text-xl font-medium"
          style={{ color: cor }}
        >
          {nome || (
            <SkeletonTheme
              color="rgba(33, 33, 33, 0.2)"
              highlightColor="rgba(255, 255, 255, 0.3)"
            >
              <p>
                <Skeleton count={1} />
              </p>
            </SkeletonTheme>
          )}
        </p>
      </div>
      <div className="mt-2 text-center">
        <div className="flex flex-row items-center justify-center text-2xl">
          {!twitter || (
            <div data-tip={`${twitter}`} class="tooltip tooltip-bottom">
              <a href={`https://twitter.com/${twitter}`}>
                <FaTwitter className="mr-1 text-gray-300 hover:text-twitter" />
              </a>
            </div>
          )}
          {!discord || (
            <div data-tip={`${discord}`} class="tooltip tooltip-bottom">
              <a>
                <FaDiscord className="ml-1 text-gray-300 hover:text-discord" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Cargo = ({ nome, totalCargo, equipe, cor }) => {
  return (
    <div id="equipe">
      <div className='bg-dark2 p-2 rounded-lg pl-3 border border-b-4 border-black border-opacity-60'>
        <h1 style={{ color: cor }} className="text-lg font-bold">
          {nome || (
            <SkeletonTheme
              color="rgba(33, 33, 33, 0.2)"
              highlightColor="rgba(255, 255, 255, 0.3)"
            >
              <p>
                <Skeleton count={1} />
              </p>
            </SkeletonTheme>
          )}{' '}
          ({totalCargo})
        </h1>
      </div>
      <div className="p-4 flex">
        {equipe.map(staff => {
          if (staff?.cargos?.nome === nome) {
            return (
              <Equipe
                key={staff.id}
                id={staff.id}
                nome={staff.nome}
                discord={staff.discord}
                twitter={staff.twitter}
                cor={staff.cargos.cor}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default function EquipeIndex({ equipe, cargos, error, manutencao }) {
  if (error === true) {
    return (
      <>
        <Header />
        <Error
          statusCode="503"
          title="Não foi possível realizar a conexão com a API"
        />
        <Footer />
      </>
    )
  }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  // function countMembersGroup(id) {
  //   const count = api.get(`/equipe/count/${id}`).then(res => res.data.count)

  //   return count
  // }
  return (
    <>
      <Header />
      <title>Equipe | Rede Battle</title>

      <div className="container">
        <div className="content">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-full">
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-10 p-10 rounded-lg">
                <h1 className='text-gray-300 font-bold text-xl pb-4'>Faça parte da nossa equipe!</h1>
                <p className='text-gray-300 pb-3'>
                  A equipe de moderação da Rede Battle é composta por <u>ajudantes</u>, <u>moderadores</u> e <u>administradores</u>.
                  São voluntários responsáveis por manter a segurança da nossa comunidade,
                  moderando todas as plataformas, como servidor, fórum, e Discord,
                  e aplicando punições quando identificam que uma regra foi quebrada.
                  Eles também colaboram com testes de atualizações e novos projetos.</p>
                  <button className="mt-3 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Saiba como aplicar para a equipe
                  </button>
              </div>
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-10 p-10 rounded-lg">
                {cargos.length === 0 && (
                  <h1 className="text-gray-300 text-xl text-center">
                    Não há equipe cadastrada.
                  </h1>
                )}
                {cargos.map(cargo => {
                  const [groupCount, setGroupCount] = useState('0')
                  api
                    .get(`/equipe/count/${cargo.id}`)
                    .then(res => res.data.count)
                    .then(res => setGroupCount(res))

                  return (
                    <Cargo
                      key={cargo.id}
                      id={cargo.id}
                      nome={cargo.nome}
                      cor={cargo.cor}
                      equipe={equipe}
                      totalCargo={groupCount}
                    />
                  )
                })}
              </div>
            </div>
            {/* <div className="flex flex-col ">
              <div className="bg-dark2 border-b-4 border-black border-opacity-60 mt-5 ml-8">
                <div className="flex items-center justify-center p-4">
                  <center>
                    <h1 className="text-gray-300 text-3xl uppercase">
                      Entre para
                      <div className="font-semibold">nossa equipe!</div>
                    </h1>
                    <button className="mt-3 bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-500 hover:border-purple-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Fazer teste
                    </button>
                  </center>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const equipe = await api
      .get('/equipe/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getEquipeAll', e)
        return (error = true)
      })

    const cargos = await api
      .get('/cargos/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getCargosAll', e)
        return (error = true)
      })

    if (!equipe) {
      return (
        <div>
          <h1>Não há nenhum membro cadastrado.</h1>
        </div>
      )
    }

    if (!cargos) {
      return (
        <div>
          <h1>Não há nenhum cargo cadastrado.</h1>
        </div>
      )
    }

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return (error = true)
      })

    return {
      props: { equipe, cargos, error: false, manutencao }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
