/* eslint-disable react/react-in-jsx-scope */
import * as Sentry from '@sentry/nextjs';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Analytics from '../components/Analytics'

process.on('unhandledRejection', () => {
  getSentryRelease.captureException(e);
});

process.on('uncaughtException', () => {
  Sentry.captureException(e);
});

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    Sentry.addBreadcrumb({
      message: `Rendering _document`,
      level: Sentry.Severity.Debug,
    });

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>

          {/* Google Adsense */}
          <script data-ad-client="ca-pub-4583572814077870" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <Analytics />

          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
