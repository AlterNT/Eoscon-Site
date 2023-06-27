import { getSession } from '@auth/solid-start'
import { signIn } from '@auth/solid-start/client'
import { For, Suspense, createEffect, createResource, onMount } from 'solid-js'
import { useLocation } from 'solid-start'
import { A } from 'solid-start/router'
import server$ from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'
import './header.scss'

export default function Header() {
  const links: HTMLAnchorElement[] = [
    <A href='/map'>Map</A>,
    <A href='/schedule'>Schedule</A>,
    <A href='/catalog'>Catalog</A>,
  ] as HTMLAnchorElement[]

  const getCurrentLink = () =>
    links.find((link) => {
      if (link && link instanceof HTMLAnchorElement) {
        const href = link.getAttribute('href')

        if (href === null) return false

        return location.pathname.includes(href)
      }
    })

  const indicator = (<div class='indicator' />) as HTMLDivElement

  // Update indicator position and opacity when location changes.
  const location = useLocation()
  createEffect(() => {
    // Check if new path is on navbar.

    const currentLink = getCurrentLink()

    if (currentLink) {
      // If the link is found.
      setIndicator(currentLink, indicator)
    } else {
      // Not on a navbar page.
      indicator.style.opacity = '0'
      // Set to no position after fade finishes.
      setTimeout(() => {
        indicator.style.width = ''
        indicator.style.left = ''
      }, parseFloat(window.getComputedStyle(indicator).transitionDuration.slice(0, -1)) * 1000)
    }
  }, [location])

  // Update indicater on page resize.
  onMount(() => {
    addEventListener('resize', () => {
      const currentLink = getCurrentLink()
      if (currentLink !== undefined) {
        setIndicator(currentLink, indicator)
      }
    })
  })

  // Fetch current user.
  const [session, { refetch }] = createResource(
    server$(async () => await getSession(server$.request, authOpts))
  )
  refetch()

  return (
    <header>
      <A href='/'>
        <img src='/images/EOSCON LOGO.svg' alt='EOSCON' draggable={false} />
      </A>
      {indicator}
      <For each={links}>{(item) => item}</For>
      <Suspense>
        {session()?.user ? (
          <A href='/account' class='user'>
            {session()?.user?.name}
          </A>
        ) : (
          <button onClick={() => signIn('discord')}>Login </button>
        )}
      </Suspense>
    </header>
  )
}

/**
 * Moves the current indicator to the provided anchor
 */
const setIndicator = (anchor: HTMLAnchorElement, indicator: HTMLDivElement) => {
  const rect = anchor.getBoundingClientRect()

  const canvas = document.createElement('canvas')

  // Determine width of text in anchor.
  const font = window.getComputedStyle(anchor).font
  const context = canvas.getContext('2d')

  if (!context) return // Ancient IE versions...

  context.font = font
  let width = context.measureText(anchor.innerText).width

  // Set properties.
  indicator.style.left = `${rect.left + (rect.width / 2 - width / 2)}px`
  indicator.style.width = `${width}px`
  indicator.style.opacity = '1'
}
