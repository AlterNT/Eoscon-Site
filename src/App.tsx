import type { Component } from 'solid-js'
import { A, Route, Routes } from '@solidjs/router'

import styles from './App.module.scss'
import Home from './home/Home'
import Map from './map/Map'
import Showcase from './showcase/Showcase'
import Schedule from './schedule/Schedule'
import Exhibit from './showcase/exhibit/Exhibit'
import User from './user/User'
import Starfield from './starfield/Starfield'

const App: Component = () => {
    const indicator = (<span class={styles.Indicator} />) as HTMLSpanElement
    const onNavigate = (e: PointerEvent) => {
        const targ = e.target as HTMLElement
        const box = targ.getBoundingClientRect()

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!
        context.font = getComputedStyle(document.body).font

        const w = context.measureText(targ.innerText).width

        indicator.style.setProperty(
            '--l',
            `${box.left + box.width / 2 - w / 2}px`
        )
        indicator.style.setProperty('--w', `${w}px`)
    }

    let i = 0
    return (
        <>
            <Starfield />
            <header class={styles.Header}>
                {indicator}
                <A href="/" style={{ '--i': i++ }} onClick={onNavigate}>
                    EOSCON
                </A>
                <A href="/map" style={{ '--i': i++ }} onClick={onNavigate}>
                    Map
                </A>
                <A href="/schedule" style={{ '--i': i++ }} onClick={onNavigate}>
                    Schedule
                </A>
                <A href="/showcase" style={{ '--i': i++ }} onClick={onNavigate}>
                    Showcase
                </A>
                <A href="/login" style={{ '--i': i++ }} onClick={onNavigate}>
                    Login
                </A>
            </header>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/map" component={Map} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/showcase" component={Showcase}>
                    <Route path="/" />
                    <Route path="/:user" component={Exhibit} />
                </Route>
                <Route path={['login', 'user']} component={User} />
            </Routes>
        </>
    )
}

export default App
