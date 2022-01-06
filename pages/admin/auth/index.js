/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { parseCookies } from 'nookies'
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
