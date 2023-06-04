import { A } from '@solidjs/router'
import { onMount, For, createEffect } from 'solid-js'
import { useLocation } from 'solid-start'
import { signIn } from '@solid-auth/next/client'
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

  const indicator: HTMLDivElement = (
    <div class='indicator' />
  ) as HTMLDivElement

  // Update indicator position and opacity based on navigation.
  createEffect(() => {
    // Check if new path is on navbar.
    const location = useLocation()
    const currentLink = getCurrentLink()

    if (currentLink) {
      // If the link is found.
      setIndicator(currentLink, indicator)
    } else {
      if (!indicator || !(indicator instanceof HTMLDivElement)) return
      // Not on a navbar page.
      indicator.style.opacity = '0'
      // Set to no position after fade finishes.
      setTimeout(() => {
        indicator.style.width = ''
        indicator.style.left = ''
      }, parseInt(window.getComputedStyle(indicator).transitionDuration.slice(0, -1)) * 1000)
    }
  })

  // Update indicater on page resize.
  onMount(() => {
    addEventListener('resize', () => {
      const currentLink = getCurrentLink()
      if (currentLink !== undefined) {
        setIndicator(currentLink, indicator)
      }
    })
  })

  return (
    <header class='panel'>
      <A href='/'>
        <img src='/images/EOSCON LOGO.svg' alt='EOSCON' draggable='false' />
      </A>
      {indicator}
      <For each={links}>{(item) => item}</For>
      <button onClick={() => signIn('discord')}>Login</button>
    </header>
  )
}

/**
 * Moves the current indicator to the provided anchor
 */
const setIndicator = (
  anchor: HTMLAnchorElement,
  indicator: HTMLDivElement,
  animate = true
) => {
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
