import api from '../service/api'
import Manutencao from '../components/Manutencao'
import Metadata from '../components/Metadata'
import ErrorAPI from '../components/ErrorAPI'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexSidebar from '../components/Sidebars/IndexSidebar'
import PostComponent from '../components/Posts'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Pagination = styled(ReactPaginate).attrs({
  activeClassName: 'active',
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
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: white;
  }
  li.active a {
    background-color: #8b5cf6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li a {
      border-radius: 7px;
      justify-content: space-between;
      border: gray 1px solid;
      cursor: pointer;
    }
  }
`;

export default function Home({ posts, postsInfo, query, error, manutencao }) {
  const router = useRouter()

  if (error) {
    return (
      <ErrorAPI />
    )
  }

  if (manutencao) {
    return (
      <>
        <Manutencao />
      </>
    )
  }

  let page = query.pagina || 1
  const totalPage = Math.ceil(postsInfo.total / 5)
  console.log(totalPage)

  const pagginationHandler = async (pagina) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.pagina = pagina.selected + 1;

    router.push({
        pathname: currentPath,
        query: currentQuery,
    })
  };

  return (
    <>
      <Header />
      <div className="INDEX">
        <title>Rede Battle</title>
        {/* METADATA */}
        <Metadata title={'Rede Battle'} description={'Site oficial da Rede Battle!'} imgURL={'https://redebattle.com.br/img/last-purchases-bg.jpg'} />
        <div className="flex justify-center p-8 lg:flex-row sm:flex-col">
          <div className='w-full sm:mb-2'>
            {(postsInfo.obs.rows.length === 0 && (
              <div className="bg-dark2 p-10 text-center rounded-lg">
                <h1 className="text-gray-300 text-xl font-medium">
                  Ainda não há postagens 😞
                </h1>
              </div>
            )) ||
              posts.map(post => {
                let linkOrSlug = null
                let link = false
                if (post.link == null) {
                  linkOrSlug = post.slug
                } else {
                  linkOrSlug = post.link
                  link = true
                }
                return (
                  <PostComponent
                    key={post.id}
                    id={post.id}
                    titulo={post.titulo}
                    categoria={post.categoria.descricao}
                    autor={post.autor.nome}
                    data={post.createdAt}
                    imgSrc={post.header}
                    conteudo={post.conteudo}
                    isLink={link}
                    link={linkOrSlug}
                    acessos={post.acessos}
                  />
                )
              })
            }
            {totalPage > 1 &&
              <div>
                <Pagination
                  pageCount={totalPage}
                  onPageChange={pagginationHandler}
                  breakLabel="..."
                  previousLabel="«"
                  nextLabel="»"
                />
            </div>}
          </div>
          <div className=''>
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
    let { pagina } = query
    // const posts = await api
    //   .get(`/postagens/list?page=${page}&itens=1&sort=createdAt&order=desc`)
    //   .then(res => res.data.obs.rows)
    //   .catch(e => {
    //     console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
    //   })
    const postsInfo = await api
      .get(`/postagens/list?page=${pagina ? pagina : 1}&itens=5&sort=createdAt&order=desc`)
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
        return (error = true)
      })

    const manutencao = await api
      .get('/configuracoes/manutencao/check')
      .then(res => res.data)
      .catch(e => {
        console.log('Ocorreu um erro ao acessar a API de checkManutencao', e)
        return error === true
      })

    return {
      props: {
        posts: postsInfo.obs.rows,
        postsInfo,
        query,
        error: false,
        manutencao
      }
    }
  } catch (e) {
    return {
      props: { error: true }
    }
  }
}
