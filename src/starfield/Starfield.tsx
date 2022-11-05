import { Outlet } from '@solidjs/router'
import { Component } from 'solid-js'

import styles from './Starfield.module.scss'

const Starfield: Component = () => {
    const canvas: HTMLCanvasElement = (
        <canvas class={styles.Starfield}></canvas>
    ) as HTMLCanvasElement

    const gl = canvas.getContext('webgl2')

    if (gl === null) {
        // Show fallback image.
    }

    return canvas
}

export default Starfield
