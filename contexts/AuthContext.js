import { createContext, useState, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { useToasts } from 'react-toast-notifications'

import api from '../service/api'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [roles, setRoles] = useState([])
  const { addToast } = useToasts()

  const delay = (amount = 500) =>
    new Promise(resolve => setTimeout(resolve, amount))

  const isAuthenticated = !!user

  useEffect(async () => {
    const { 'redebattle.token': token } = parseCookies()

    if (token) {
      try {
        const getUser = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(getUser.data)
        setRoles(getUser.data.roles)
      } catch (e) {
        const errorToString = JSON.stringify(e.toJSON().message)
        if (errorToString.indexOf('status code 401') >= 0) {
          console.log('Você não está autorizado a acessar o painel.')
          addToast('Você não está autorizado a acessar o painel.', {
            appearance: 'error',
            autoDismiss: true
          })
          await destroyCookie(null, 'redebattle.token')
          Router.push('/admin/auth/login')
        } else {
          console.log('Ocorreu um erro ao acessar o painel.')
        }
      }
    }
  }, [])

  async function signIn({ email, senha }, recaptchaToken) {
    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
        recaptchaToken
      })

      const resUser = response.data.user
      const resToken = response.data.token

      const getRoles = await api.get('/roles/admin/get', {
        headers: { Authorization: `Bearer ${resToken}` }
      })
      const resRoles = getRoles.data.permissoes

      setCookie(undefined, 'redebattle.token', resToken, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      })

      setUser(resUser)
      setRoles(resRoles)

      addToast('Autenticado com sucesso! Redirecionando...', {
        appearance: 'success',
        autoDismiss: true
      })

      await delay()

      Router.push('/admin')
    } catch (e) {
      if (e.toJSON().message === 'Network Error') {
        return addToast('Ocorreu um erro na conexão com a API', {
          appearance: 'error',
          autoDismiss: true
        })
      }
      if (e.response.data.error.nextValidRequestDate) {
        return addToast(e.response.data.error.nextValidRequestDate, {
          appearance: 'error',
          autoDismiss: true
        })
      }
      return addToast(e.response.data.error, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, roles }}>
      {children}
    </AuthContext.Provider>
  )
}
