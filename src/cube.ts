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
  //右、左、上、下、前、后
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
  const group = new THREE.Group()

  for (let i = 0; i < boxConfig.num; i++) {
    for (let j = 0; j < boxConfig.num; j++) {
      for (let t = 0; t < boxConfig.num; t++) {
        const { mesh, edgesMesh } = createBox({
          x: i * boxConfig.len,
          y: j * boxConfig.len,
          z: t * boxConfig.len,
        })
        group.add(mesh)
        group.add(edgesMesh)
      }
    }
  }
  // group 设置中心点
  
  scene.add(group)
}
