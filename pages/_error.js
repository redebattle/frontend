import * as Sentry from '@sentry/nextjs'

function Error({ statusCode }) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <p>
      {statusCode
        ? `Ocorreu um erro ${statusCode} no servidor.`
        : 'Ocorreu um erro no cliente.'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 400
  Sentry.captureException(err)
  return { statusCode }
}

export default Error
