import { ToastContainer } from 'react-toastify'

import Header from 'components/Header/index'

import type { AppProps } from 'next/app'

import styles from 'styles/Home.module.scss'
import 'styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer position="top-center" />
    </div>
  )
}
export default MyApp
