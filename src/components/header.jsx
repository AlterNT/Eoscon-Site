import { A } from '@solidjs/router'
import { onMount, For, createEffect } from 'solid-js'
import { useLocation } from 'solid-start'
import './header.scss'

export default function Header() {
  /** @type {[HTMLAnchorElement]} */
  const links = [
    <A href='/map'>Map</A>,
    <A href='/schedule'>Schedule</A>,
    <A href='/catalog'>Catalog</A>,
  ]

  const indicator = <div class='indicator' />

  // Update indicator position and opacity based on navigation.
  createEffect(() => {
    // Check if new path is on navbar.
    const location = useLocation()
    const currentLink = links.find((link) =>
      location.pathname.includes(link.getAttribute('href'))
    )

    if (currentLink) {
      // If the link is found.
      setIndicator(currentLink, indicator)
    } else {
      // Not on a navbar page.
      indicator.style.opacity = 0
      // Set to no position after fade finishes.
      setTimeout(() => {
        indicator.style.width = ''
        indicator.style.left = ''
      }, window.getComputedStyle(indicator).transitionDuration.slice(0, -1) * 1000)
    }
  })

  // Update indicater on page resize.
  onMount(() => {
    addEventListener('resize', () => {
      const currentLink = links.find((link) =>
        location.pathname.includes(link.getAttribute('href'))
      )
      if (currentLink != undefined) {
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
      <A href='/login'>Login</A>
    </header>
  )
}

/**
 * Moves the current indicator to the provided anchor
 * @param {HTMLAnchorElement} anchor
 * @param {HTMLDivElement} indicator
 * @param {Boolean} animate
 */
function setIndicator(anchor, indicator, animate = true) {
  const rect = anchor.getBoundingClientRect()

  // Determine width of text in anchor.
  const canvas =
    setIndicator.canvas ??
    (setIndicator.canvas = document.createElement('canvas'))
  const font = window.getComputedStyle(anchor).font
  let context = canvas.getContext('2d')
  context.font = font
  let width = context.measureText(anchor.innerText).width

  // Set properties.
  indicator.style.left = `${rect.left + (rect.width / 2 - width / 2)}px`
  indicator.style.width = `${width}px`
  indicator.style.opacity = 1
}
