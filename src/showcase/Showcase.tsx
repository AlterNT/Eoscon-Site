import { Outlet } from '@solidjs/router'
import { Component } from 'solid-js'

const Showcase: Component = () => {
    return (
        <>
            Showcase
            <Outlet />
        </>
    )
}

export default Showcase
