import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Script async src="https://www.googletagmanager.com/gtag/js?id=G-T4GDMGLEYV"></Script>
  <Script>{`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-T4GDMGLEYV');;`}
  </Script>

    
  <Component {...pageProps} />
  </>

}

export default MyApp

