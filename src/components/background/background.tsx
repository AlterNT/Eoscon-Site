import { onMount } from 'solid-js'
import * as THREE from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { SmoothScrollEvent } from '~/root'
import './background.scss'

export default function Background() {
  const canvas = (<canvas></canvas>) as HTMLCanvasElement

  onMount(async () => {
    // Parameters.
    const CAMERA_DISTANCE = 200
    const STAR_COUNT = 10000
    const STARS_WIDTH = 1000
    const SPEED = 0.1
    const CLOUD_COUNT = 150
    const CLOUD_MIN = 1000
    const CLOUD_MAX = 4000
    const CLOUDS_WIDTH = 5000
    const CLOUD_OPACITY = 0.2

    // Tweakables
    let vx = 0
    let vy = 0
    let vz = 0
    let stretch = 0.05

    // Setup scene.
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00010a)
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      CLOUDS_WIDTH + CAMERA_DISTANCE
    )
    camera.position.set(0, 0, CAMERA_DISTANCE)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight, false)

    // Materials
    const starmat = new LineMaterial({
      color: 0xffffff,
      linewidth: 0.4,
      worldUnits: true,
      depthWrite: true,
    })

    const cloudtex = await new THREE.TextureLoader().loadAsync(
      'images/cloud.png'
    )
    const cloudmat = new THREE.MeshBasicMaterial({
      map: cloudtex,
      transparent: true,
      opacity: CLOUD_OPACITY,
      color: 0x00bbff,
      depthWrite: false,
    })

    // Modify cloud material to fade both near/far to prevent 'popping'.
    cloudmat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <output_fragment>',
        `#include <output_fragment> gl_FragColor.a *= 1.0-pow(abs(2.0/${CLOUDS_WIDTH.toFixed(
          1
        )}*(gl_FragCoord.z / gl_FragCoord.w - ${(
          CLOUDS_WIDTH / 2 +
          CAMERA_DISTANCE
        ).toFixed(1)})), 1.0);`
      )
    }

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
      posarray[6 * i + 5] = z + 0.01 // Negligible length so that the line rendersb.
    }
    const geometry = new LineSegmentsGeometry().setPositions(posarray)
    const lines = new LineSegments2(geometry, starmat)
    scene.add(lines)

    const cloud = new THREE.InstancedMesh(
      new THREE.PlaneGeometry(1, 1),
      cloudmat,
      CLOUD_COUNT
    )

    // Randomly distribute clouds.
    for (let i = 0; i < CLOUD_COUNT; i++) {
      const mat = new THREE.Matrix4()

      const x = 2 * CLOUDS_WIDTH * Math.random() - CLOUDS_WIDTH
      const y = 2 * CLOUDS_WIDTH * Math.random() - CLOUDS_WIDTH
      const z = -CLOUDS_WIDTH * Math.random()
      const scale = Math.random() * (CLOUD_MAX - CLOUD_MIN) + CLOUD_MIN

      mat.makeRotationZ(Math.random() * 2 * Math.PI)
      mat.scale(new THREE.Vector3(scale, scale, scale))
      mat.setPosition(x, y, z)

      cloud.setMatrixAt(i, mat)
    }
    scene.add(cloud)

    // Rescale updates.
    addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      requestAnimationFrame(render)
    })

    // Capture scroll events.
    addEventListener('smoothscroll', (e: SmoothScrollEvent) => {
      vy = e.detail.v
      requestAnimationFrame(render)
    })

    const render = () => {
      // Update star positions.
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

        posarray[6 * i] = x + vx * (SPEED + stretch)
        posarray[6 * i + 1] = y + vy * (SPEED + stretch)
        posarray[6 * i + 2] = z + vz * (SPEED + stretch)
        posarray[6 * i + 3] = x + vx * (SPEED - stretch)
        posarray[6 * i + 4] = y + vy * (SPEED - stretch)
        posarray[6 * i + 5] = z + vz * (SPEED - stretch) + 0.01
      }
      geometry.setPositions(posarray)

      // Update cloud positions.
      for (let i = 0; i < CLOUD_COUNT; i++) {
        // Get transform.
        let mat = new THREE.Matrix4()
        cloud.getMatrixAt(i, mat)
        let position = new THREE.Vector3().setFromMatrixPosition(mat)

        // Loop clouds around on edges of box. Slight offset to eliminate repeats.
        if (position.x > CLOUDS_WIDTH) {
          position.x -= 2 * CLOUDS_WIDTH
          position.y += 200
        } else if (position.x < -CLOUDS_WIDTH) {
          position.x += 2 * CLOUDS_WIDTH
          position.y -= 200
        }
        if (position.y > CLOUDS_WIDTH) {
          position.y -= 2 * CLOUDS_WIDTH
          position.z += 200
        } else if (position.y < -CLOUDS_WIDTH) {
          position.y += 2 * CLOUDS_WIDTH
          position.z -= 200
        }
        if (position.z > 0) {
          position.z -= CLOUDS_WIDTH
          position.x += 200
        } else if (position.z < -CLOUDS_WIDTH) {
          position.z += CLOUDS_WIDTH
          position.x -= 200
        }

        // Set transform.
        cloud.setMatrixAt(
          i,
          mat.setPosition(
            position.x + vx * SPEED,
            position.y + vy * SPEED,
            position.z + vz * SPEED
          )
        )
      }
      cloud.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
    }

    requestAnimationFrame(render)
  })
  return canvas
}
