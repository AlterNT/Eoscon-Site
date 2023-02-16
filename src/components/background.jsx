import { onMount } from 'solid-js'
import * as THREE from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import './background.scss'

export default function Background() {
  const canvas = <canvas></canvas>

  onMount(() => {
    // Setup scene.
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.set(0, 0, 200)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    // Populate stars.
    const starmat = new LineMaterial({
      color: 0xffffff,
      linewidth: 0.4,
      worldUnits: true,
    })

    // Parameters.
    const STAR_COUNT = 10000
    const STARS_WIDTH = 1000
    const SPEED = 0.1
    const STRETCH = 0.05

    // Randomly distribute stars.
    let posarray = new Float32Array(6 * STAR_COUNT)
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = 2 * STARS_WIDTH * Math.random() - STARS_WIDTH
      const y = 2 * STARS_WIDTH * Math.random() - STARS_WIDTH
      const z = -STARS_WIDTH * Math.random()

      posarray[6 * i] = x
      posarray[6 * i + 1] = y
      posarray[6 * i + 2] = z
      posarray[6 * i + 3] = x
      posarray[6 * i + 4] = y
      posarray[6 * i + 5] = z + 0.01 // Negligible length so that the line renders.
    }
    const geometry = new LineSegmentsGeometry().setPositions(posarray)
    const lines = new LineSegments2(geometry, starmat)
    scene.add(lines)

    // Rescale updates.
    addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    })

    let vx = 0
    let vy = 0
    let vz = 0

    // Capture scroll events.
    addEventListener('smoothscroll', (e) => {
      vy = e.detail.v
      requestAnimationFrame(render)
    })

    const render = () => {
      for (let i = 0; i < STAR_COUNT; i++) {
        // Average position is center of line.
        let x = (posarray[6 * i] + posarray[6 * i + 3]) / 2
        let y = (posarray[6 * i + 1] + posarray[6 * i + 4]) / 2
        let z = (posarray[6 * i + 2] + posarray[6 * i + 5]) / 2

        // Loop stars around on edges of box. Slight offset to eliminate repeats.
        if (x > STARS_WIDTH) {
          x -= 2 * STARS_WIDTH
          y += 20
        } else if (x < -STARS_WIDTH) {
          x += 2 * STARS_WIDTH
          y -= 20
        }
        if (y > STARS_WIDTH) {
          y -= 2 * STARS_WIDTH
          z += 20
        } else if (y < -STARS_WIDTH) {
          y += 2 * STARS_WIDTH
          z -= 20
        }
        if (z > 0) {
          z -= STARS_WIDTH
          x += 20
        } else if (z < -STARS_WIDTH) {
          z += STARS_WIDTH
          x -= 20
        }

        posarray[6 * i] = x + vx * (SPEED + STRETCH)
        posarray[6 * i + 1] = y + vy * (SPEED + STRETCH)
        posarray[6 * i + 2] = z + vz * (SPEED + STRETCH)
        posarray[6 * i + 3] = x + vx * (SPEED - STRETCH)
        posarray[6 * i + 4] = y + vy * (SPEED - STRETCH)
        posarray[6 * i + 5] = z + vz * (SPEED - STRETCH) + 0.01
      }
      geometry.setPositions(posarray)
      renderer.render(scene, camera)
    }

    requestAnimationFrame(render)
  })
  return canvas
}
