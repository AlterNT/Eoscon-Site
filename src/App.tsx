import type { Component } from 'solid-js'

import styles from './App.module.css'
import Home from './home/Home'
import { A, Route, Routes } from '@solidjs/router'
import Map from './map/Map'
import Showcase from './showcase/Showcase'
import Schedule from './schedule/Schedule'
import Exhibit from './showcase/exhibit/Exhibit'
import User from './user/User'

const App: Component = () => {
    return (
        <div class={styles.App}>
            <header>
                <A href="/">EOSCON</A>
                <A href="/map">Map</A>
                <A href="/schedule">Schedule</A>
                <A href="/showcase">Showcase</A>
                <A href="/login">Login</A>
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
        </div>
    )
}

export default App
