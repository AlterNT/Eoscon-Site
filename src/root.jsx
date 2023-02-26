// @refresh reload
import { onMount, Suspense } from 'solid-js'
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
import { lerp } from 'three/src/math/MathUtils'

export default function Root() {
  const wrapper = (
    <div class='wrapper'>
      <Header />
      <Routes>
        <FileRoutes />
      </Routes>
      <Scripts />
    </div>
  )
  const body = (
    <Body>
      <Background />
      {wrapper}
    </Body>
  )

  const SMOOTHING = 0.15

  let currentScroll = 0

  // Smooth scrolling
  onMount(() => {
    body.style.height = wrapper.scrollHeight + 'px'
    wrapper.style.position = 'fixed'

    let moving = false

    const render = () => {
      const newScroll = lerp(currentScroll, window.scrollY, SMOOTHING)
      // Fire custom event for other uses.
      dispatchEvent(
        new CustomEvent('smoothscroll', {
          detail: {
            y: newScroll,
            v: newScroll - currentScroll,
          },
        })
      )

      currentScroll = newScroll
      wrapper.style.translate = `0px -${currentScroll}px`
      // Update until it's 'close enough'.
      if (
        currentScroll - window.scrollY > 0.1 ||
        currentScroll - window.scrollY < -0.1
      ) {
        moving = true
        requestAnimationFrame(render)
      } else {
        moving = false
        wrapper.style.translate = `0px -${window.scrollY}px`
      }
    }

    addEventListener('scroll', () => {
      if (!moving) {
        requestAnimationFrame(render)
      }
    })
  })

  return (
    <Html lang='en'>
      <Head>
        <Title>EOSCON</Title>
        <Meta charset='utf-8' />
        <Meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap'
          rel='stylesheet'
        />
      </Head>
      {body}
    </Html>
  )
}
