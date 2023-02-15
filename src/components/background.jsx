import { onMount } from 'solid-js'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import './background.scss'

export default function Background() {
  const canvas = <canvas></canvas>

  onMount(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    })
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    const starmat = new LineMaterial({
      color: 0xffffff,
      linewidth: 0.1,
      worldUnits: true,
    })

    const geo = new LineGeometry()
    geo.setPositions([0, 0, 0, 0, 0.0001, 0])

    const line = new Line2(geo, starmat)
    line.computeLineDistances()
    line.scale.set(1, 1, 1)

    scene.add(line)
    renderer.render(scene, camera)

    // Rescale updates.
    addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    })
  })
  return canvas
}
