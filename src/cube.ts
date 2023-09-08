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
  len: 120,
  size: 100,
  //右、左、上、下、前、后
  colors: ['#ff6b02', '#ffffff', '#dd422f', '#fdcd02', '#3d81f7', '#019d53'],
}
const createBox = ({ x, y, z }: positionType) => {
  console.log(x, y, z)
  const geometry = new THREE.BoxGeometry(
    boxConfig.size,
    boxConfig.size,
    boxConfig.size
  )
  const materials = boxConfig.colors.map((color) => {
    return new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0,
    })
  })

  const meshFaces = []
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 'red' })
  const edgesMesh = new THREE.LineSegments(edges, lineMaterial)

  for (let i = 0; i < 6; i++) {
    const mesh = new THREE.Mesh(geometry, materials[i])
    meshFaces.push(mesh)
  }
  // const len = boxConfig.len*i
  meshFaces[0].position.set(x + 0, 0.5, y + 0) // 前面
  meshFaces[1].position.set(x + 0, -0.5, y + 0) // 后面
  meshFaces[2].position.set(x + 0, 0, y + 0.5) // 上面
  meshFaces[3].position.set(x + 0, 0, y + -0.5) // 下面
  meshFaces[4].position.set(x + 0.5, 0, y + 0) // 右面
  meshFaces[5].position.set(x + -0.5, 0, y + 0) // 左面

  meshFaces.forEach((mesh) => {
    // 为每个块创建边缘线
    // 创建边缘线的材质
  })
}
export const createCube = () => {

  
}
