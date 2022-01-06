/* eslint-disable handle-callback-err */
/* eslint-disable react/react-in-jsx-scope */
export default function AdminAuthIndex() {
  return <></>
}

export const getServerSideProps = async ctx => {
  return {
    redirect: {
      destination: '/admin/auth/login',
      permanent: false
    }
  }
}
