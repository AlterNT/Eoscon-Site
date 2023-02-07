// @refresh reload
import { Suspense } from 'solid-js'
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'
import Header from './components/header'
import Background from './components/background'
import './root.scss'

export default function Root() {
  return (
    <Html lang='en'>
      <Head>
        <Title>EOSCON</Title>
        <Meta charset='utf-8' />
        <Meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Body>
        <Background />
        <Header />
        <Routes>
          <FileRoutes />
        </Routes>
        <Scripts />
      </Body>
    </Html>
  )
}
