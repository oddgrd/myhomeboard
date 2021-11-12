import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/favicon.png' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/icons/logo152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='192x192'
            href='/icons/logo192.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='512x512'
            href='/icons/logo512.png'
          />
          <meta name='theme-color' content='#1c1c31' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='black-translucent'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='modal-root'></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
