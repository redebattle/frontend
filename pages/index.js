import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import api from '../service/api'

import Manutencao from '../components/Manutencao'
import Metadata from '../components/Metadata'
import ErrorAPI from '../components/ErrorAPI'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexSidebar from '../components/Sidebars/IndexSidebar'
import PostComponent from '../components/Posts'
import StreamersIndex from '../components/StreamersIndex'
import axios from 'axios'

const Pagination = styled(ReactPaginate).attrs({
  activeClassName: 'active'
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  margin: 1rem;
  justify-content: center;
  list-style-type: none;
  padding: 0 6rem;
  li a {
    border-radius: 7px;
    margin: 0.6rem;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
    background-color: #303030;
    color: white;
    border-color: transparent;
    padding: 12px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
    background-color: rgb(126, 58, 242, 1);
    padding: 12px;
  }
  li.active a {
    background-color: rgb(126, 58, 242, 1);
    border-color: transparent;
    color: white;
    min-width: 32px;
    padding: 12px;
  }
  li.disabled a {
    color: white;
    background-color: #696969;
    padding: 12px;
  }
  li.disable,
  li.disabled a {
    cursor: no-drop;
  }
  @media only screen and (max-width: 700px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    li {
      display: flex;
      flex-direction: row;
    }
    li a {
      border-radius: 7px;
      justify-content: space-between;
      border: gray 1px solid;
      cursor: pointer;
      font-size: 12px;
    }
  }
`

export default function Home({
  posts,
  getLives,
  query,
  statusCode,
  manutencao
}) {
  const router = useRouter()
  let liveOn = true

  if (statusCode?.code !== 200) {
    return <ErrorAPI statusCode={statusCode} />
  }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  let page = query.pagina || 1
  const totalPage = Math.ceil(posts.total / 5)

  const pagginationHandler = async pagina => {
    const currentPath = router.pathname
    const currentQuery = { ...router.query }
    currentQuery.pagina = pagina.selected + 1

    router.push({
      pathname: currentPath,
      query: currentQuery
    })
  }

  if (getLives.data.length === 0) {
    liveOn = false
  }

  return (
    <>
      <Header />
      <div className="INDEX">
        <title>Rede Battle</title>
        {/* METADATA */}
        <Metadata
          title={'Rede Battle'}
          description={'Site oficial da Rede Battle!'}
          imgURL={'https://redebattle.com.br/img/last-purchases-bg.jpg'}
        />
        {liveOn === true && <StreamersIndex lives={getLives.data} />}
        <div className="flex justify-center lg:mr-6 sm:mr-0 sm:p-3 lg:flex-row sm:flex-col">
          <div className="w-full sm:mb-2">
            {(posts.obs.rows.length === 0 && (
              <div className="bg-dark2 p-10 text-center rounded-lg">
                <h1 className="text-gray-300 text-xl font-medium">
                  Ainda não há postagens 😞
                </h1>
              </div>
            )) ||
              posts.obs.rows.map(post => {
                return (
                  <PostComponent
                    key={post.id}
                    id={post.id}
                    titulo={post.title}
                    categoria={post.category.name}
                    categoria_cor={post.category.color}
                    autor={post.author.username}
                    data={post.createdAt}
                    imgSrc={post.banner_url}
                    conteudo={post.content}
                    external={post.is_external}
                    link={post.link}
                    slug={post.slug}
                    acessos={post.access}
                    comentarios={post.total_comments}
                    reacoes={post.total_reactions}
                    autor_verificado={post.author.is_verified}
                  />
                )
              })}
            {totalPage > 1 && (
              <div>
                <Pagination
                  pageCount={totalPage}
                  onPageChange={pagginationHandler}
                  breakLabel="..."
                  previousLabel="« Página anterior"
                  nextLabel="Próxima página »"
                />
              </div>
            )}
          </div>
          <div>
            <IndexSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    let statusCode = { code: 200 }

    let { pagina } = query

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkMaintenance')
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const posts = await api
      .get(
        `/postagens/list?page=${
          pagina ? pagina : 1
        }&itens=5&sort=createdAt&order=desc`
      )
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API getPosts')
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    const getLives = await api
      .post('/livestream')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API getLivestream')
        if (e?.code?.includes('ECONNREFUSED') === true) {
          return (statusCode.code = 503)
        }
        return (statusCode = e.response.data)
      })

    return {
      props: {
        posts,
        query,
        statusCode,
        manutencao,
        getLives
      }
    }
  } catch (e) {
    return {
      props: { statusCode: e.code }
    }
  }
}
