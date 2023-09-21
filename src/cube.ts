import * as THREE from 'three'
type positionType = {
  x: number
  y: number
  z: number
}
const boxConfig = {
  x: 0,
  y: 0,
  z: 0,
  num: 3,
  len: 100,
  size: 100,
  opacity: 1,
  colors: ['#ff6b02', '#ffffff', '#dd422f', '#fdcd02', '#3d81f7', '#019d53'],
}

const createBox = ({ x, y, z }: positionType) => {
  const geometry = new THREE.BoxGeometry(
    boxConfig.size,
    boxConfig.size,
    boxConfig.size
  )

  const materials = boxConfig.colors.map((color) => {
    return new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: boxConfig.opacity,
    })
  })

  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 'black',
  })
  const edgesMesh = new THREE.LineSegments(edges, lineMaterial)

  const mesh = new THREE.Mesh(geometry, materials)
  mesh.position.set(x, y, z)
  edgesMesh.position.set(x, y, z)
  return { mesh, edgesMesh }
}
export const createCube = (scene: THREE.Scene) => {
  const cube = createItemCube(boxConfig)
  cube.position.set(-100, -100, -100);
  cube.position.set(0, 0, 0);
  scene.add(cube)
  // console.log('cube',cube);
  return cube
}

const createItemCube = (config: typeof boxConfig) => {
  const group = new THREE.Group()
  for (let i = 0; i < config.num; i++) {
    for (let j = 0; j < config.num; j++) {
      for (let t = 0; t < config.num; t++) {
        const { mesh, edgesMesh } = createBox({
          x: i * config.len + config.x,
          y: j * config.len + config.y,
          z: t * config.len + config.z,
        })
        group.add(mesh)
        group.add(edgesMesh)
      }
    }
  }
  return group
}
