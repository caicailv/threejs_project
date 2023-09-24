import * as THREE from 'three'
type PositionType = {
  x: number
  y: number
  z: number
}
interface CoverCubeMesh extends THREE.Mesh {
  cubeType: string
}
const boxConfig = {
  x: 0,
  y: 0,
  z: 0,
  num: 3,
  size: 100,
  opacity: 1,
  colors: ['#ff6b02', '#ffffff', '#dd422f', '#fdcd02', '#3d81f7', '#019d53'],
}
const setCenter = (ns: [number, number, number], size: number) => {
  return ns.map((n) => size / 2 + n) as [number, number, number]
}
const createBox = ({ x, y, z }: PositionType) => {
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
  mesh.position.set(...setCenter([x, y, z], boxConfig.size))
  edgesMesh.position.set(...setCenter([x, y, z], boxConfig.size))
  return { mesh, edgesMesh }
}
export const createCube = (scene: THREE.Scene) => {
  const cube = createItemCube(boxConfig)
  cube.position.set(0, 0, 0)
  scene.add(cube)
  const bigBoix = createTransparentCube()
  scene.add(bigBoix)

  return cube
}
const createItemCube = (config: typeof boxConfig) => {
  const group = new THREE.Group()
  for (let i = 0; i < config.num; i++) {
    for (let j = 0; j < config.num; j++) {
      for (let t = 0; t < config.num; t++) {
        const { mesh, edgesMesh } = createBox({
          x: i * config.size + config.x,
          y: j * config.size + config.y,
          z: t * config.size + config.z,
        })
        group.add(mesh)
        group.add(edgesMesh)
      }
    }
  }
  return group
}

// 创建透明方块用来简化坐标系
const createTransparentCube = () => {
  const [x, y, z] = [0, 0, 0]
  const size = boxConfig.size * boxConfig.num
  const geometry = new THREE.BoxGeometry(size, size, size)

  const materials = boxConfig.colors.map((color) => {
    return new THREE.MeshBasicMaterial({
      color: color,
    })
  })
  const mesh = new THREE.Mesh(geometry, materials)
  mesh.position.set(...setCenter([x, y, z], size))
  ;(mesh as any).cubeType = 'coverCube'
  return mesh
}
