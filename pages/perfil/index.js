/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
import Error from 'next/error'
import Image from 'next/image'

import api from '../../service/api'

import Manutencao from '../../components/Manutencao'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import ScrollToTheTopButton from '../../components/ScrollToTheTopButton'

export default function Perfil({error, manutencao}) {

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

  return (
    <>
      <Header />
      <title>Perfil | Rede Battle</title>
      <ScrollToTheTopButton />
      <div>
        <div id="top-content">
          <div id="avatar-image">
            <Image
              priority
              className="avatar-image"
              width={200}
              height={200}
              layout="intrinsic"
              src="/icons/BigAtom.svg"
            />
          </div>
          <div id="infos">
            <h1 className="nickname">
              Nick aqui
            </h1>
            <h3 className="since">
              No servidor desde muito tempo.
            </h3>
          </div>
        </div>
        <div className="UserContainer">
          <div className="xp-level">
            <div className="circle-level">
              <h3 className="title-level">NÍVEL</h3>
              <h2 className="title-data">10</h2>
            </div>
            <div className="xp-bar">
              <div className="info-xp-bar">
                <h2 className="xp-title">XP</h2>
                <h3 className="xp-data">
                  200
                  <span>
                    /
                    300
                  </span>
                </h3>
              </div>
              <div className="progress-bar">
                <h3 className="percent">
                  80
                  %
                </h3>
                <div className="progress" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
          <div className="atoms-store">
            <div className="atoms">
              <h2 className="atoms-title">ÁTOMOS</h2>
              <div className="atoms-data-container">
                <h1 className="atoms-data">10K</h1>
                <Image
                  src="/icons/BigAtom.svg"
                  width={120}
                  height={120}
                  className="atom-image"
                />
              </div>
            </div>
            <div className="last-orders">
              <h2 className="last-orders-title">ÚLTIMAS COMPRAS</h2>
              <div className="last-orders-data">
                <p className="reg">
                  ・
                  <i>Nenhuma compra</i>
                </p>
              </div>
            </div>
          </div>
          <div className="votes">
            <Image
              src="/icons/VoteIconBig.svg"
              width={150}
              height={150}
            />
            <div className="votes-data">
              <div className="votes-data-total">
                <h2 className="votes-data-total-title">TOTAL</h2>
                <h1 className="votes-data-total-data">18</h1>
              </div>
            </div>
          </div>
          <div className="messages">
            <div msgs='300' />
          </div>
          <div className="medails">
            <h1 className="title">MEDALHAS</h1>
            {/* {getMedails(medailsUser)} */}
          </div>
          <div className="vips-boosters">
            <div className="booster-xp">
              <Image src="/icons/BoosterXpIcon.svg" width={120} height={120} title="Multiplicador de XP" />
              <div className="data">
                <div className="active-plan">
                  <h2 className="active-plan-title">PLANO ATIVO</h2>
                  <h1 className="active-plan-data">Básico</h1>
                </div>
                <div className="time-rem">
                  <h2 className="time-rem-title">TEMPO RESTANTE</h2>
                  <h1 className="time-rem-data">
                    30 dias
                  </h1>
                </div>
              </div>
            </div>
            <div className="vip">
              <Image src="/icons/VipIcon.svg" width={120} height={120} title="VIP" />
              <div className="data">
                <div className="active-plan">
                  <h2 className="active-plan-title">PLANO ATIVO</h2>
                  <h1 className="active-plan-data">Premium</h1>
                </div>
                <div className="time-rem">
                  <h2 className="time-rem-title">TEMPO RESTANTE</h2>
                  <h1 className="time-rem-data">
                    12 dias
                  </h1>
                </div>
              </div>
            </div>
            <div className="booster-atoms">
              <Image src="/icons/BoosterAtomsIcon.svg" width={120} height={120} title="Multiplicador de Átomos" />
              <div className="data">
                <div className="active-plan">
                  <h2 className="active-plan-title">PLANO ATIVO</h2>
                  <h1 className="active-plan-data">Melhorado</h1>
                </div>
                <div className="time-rem">
                  <h2 className="time-rem-title">TEMPO RESTANTE</h2>
                  <h1 className="time-rem-data">
                    65 dias
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const page = query.pagina || 1

    const changelogs = await api
      .get('/changelog/all')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
        return (error = true)
      })

    console.log(changelogs)

    if (!changelogs) {
      return (
        <div>
          <h1>Nenhuma atualização foi encontrada.</h1>
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
      props: { changelogs, error: false, manutencao }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
