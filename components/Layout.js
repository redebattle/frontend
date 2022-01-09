import Footer from './Footer'
import Header from './Header'

/* eslint-disable react/react-in-jsx-scope */
const Layout = ({ children }) => {
  return (
    // <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
    <>
      <div className="bg-dark scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent h-screen overflow-y-scroll ">
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Layout
