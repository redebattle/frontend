import api from '../service/api'
import Manutencao from '../components/Manutencao'
import ErrorAPI from '../components/ErrorAPI'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexSidebar from '../components/Sidebars/IndexSidebar'
import PostComponent from '../components/Posts'

export default function Home({ posts, postsInfo, query, error, manutencao }) {

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
  const total = postsInfo.total / postsInfo.quantidade


  const handleNextPage = page => {
    let next = page++
    return next
  }
  return (
    <>
      <Header />
      <div className="INDEX">
        <title>Rede Battle</title>
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
              })}
          </div>
          <div className=''>
            <IndexSidebar />
          </div>
        </div>
        {/* <div className="flex grid grid-flow-row auto-rows-auto grid-cols-3 gap-4 mt-8 px-6">
          <div className="pb-4 col-span-2">
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
              })}
            {(postsInfo.obs.rows.length === 0 && ' ') || (
              <div className="pt-4">
                <center>
                  <button
                    className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg m-2"
                    onClick={() => Router.push(`/?pagina=${query.pagina - 1}`)}
                    disabled={query.pagina <= 1}
                  >
                    Anterior
                  </button>

                  {query.pagina && (
                    <button
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => Router.push(`/?pagina=${query.pagina++}`)}
                      disabled={query.pagina > total}
                    >
                      Próxima
                    </button>
                  )}

                  {!query.pagina && (
                    <button
                      className="bg-purple-600 border-b-4 border-purple-700 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => Router.push('/?pagina=2')}
                      disabled={query.pagina > total}
                    >
                      Próximo
                    </button>
                  )}
                </center>
              </div>
            )}
          </div>
          <IndexSidebar />
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const page = query.pagina || 1
    // const posts = await api
    //   .get(`/postagens/list?page=${page}&itens=1&sort=createdAt&order=desc`)
    //   .then(res => res.data.obs.rows)
    //   .catch(e => {
    //     console.log('Ocorreu um erro ao acessar a API de getAllPosts', e)
    //   })
    const postsInfo = await api
      .get(`/postagens/list?page=${page}&itens=10&sort=createdAt&order=desc`)
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
