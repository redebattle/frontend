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
import EquipeFacaParteComponent from '../../components/Equipe/FacaParte'
import ErrorAPI from '../../components/ErrorAPI'
const Equipe = ({ nome, twitter, discord, cor }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mx-4 bg-dark3 border-b-4 border-black rounded-lg w-36 lg:h-60 sm:h-auto mb-3">
      <div>
        <img
          // src={`https://photopass.appspot.com/3d.php?user=${nome}&vr=0&hr=12&hrh=-16&vrll=0&vrrl=-44&vrla=25&vrra=26&displayHair=true&headOnly=false&format=png&ratio=4&aa=true&layers=true`}
          src={`https://minotar.net/bust/${nome}/120.png`}
          className="rounded-md tool"
          data-tip
          data-for="equipe"
        />
        <p
          className="flex items-center justify-center mt-3 text-xl font-bold"
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
        <p
          className="flex items-center justify-center font-thin text-xs"
          style={{ color: cor }}
        >
          {'Ocupação' || (
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
      <div className={`bg-dark3 p-2 rounded-lg pl-3 border-b-4 border-[${cor}] border-opacity-60`}>
        <h1 style={{ color: cor }} className="text-2xl font-bold uppercase">
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
      <div className="flex flex-wrap p-6">
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
        <ErrorAPI />
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
      <title>Equipe | Rede Battle</title>
      <Header />
      <div className="flex flex-col w-full mt-8 px-4">
        <EquipeFacaParteComponent />
        <div className="lg:bg-dark sm:bg-dark2 mt-8 px-4 p-10 rounded-lg mx-2">
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
