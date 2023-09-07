import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls'
// 创建场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer()

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  30000
)
// camera.position.set(200, 200, 200)
// camera.position.set(100, 0, 0)

// camera.lookAt(0, 0, 0); //坐标原点
// 创建几何体(长方体)
const boxConfig = {
  x: 0,
  y: 0,
  z: 0,
  num: 3,
  len: 101,
  size: 100,
  //右、左、上、下、前、后
  colors: ['#ff6b02', '#ffffff', '#dd422f', '#fdcd02', '#3d81f7', '#019d53'],
}
const geometry = new THREE.BoxGeometry(
  boxConfig.size,
  boxConfig.size,
  boxConfig.size
)

//MeshLambertMaterial受光照影响
const materials = boxConfig.colors.map((color) => {
  return new THREE.MeshBasicMaterial({
    color: color,
  })
})
for (let i = 0; i < boxConfig.num; i++) {
  for (let j = 0; j < boxConfig.num; j++) {
    const meshFaces = []

    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(geometry, materials[i])
      meshFaces.push(mesh)
    }
    const len = boxConfig.len
    meshFaces[0].position.set(i * len + 0, 0.5, j * len + 0) // 前面
    meshFaces[1].position.set(i * len + 0, -0.5, j * len + 0) // 后面
    meshFaces[2].position.set(i * len + 0, 0, j * len + 0.5) // 上面
    meshFaces[3].position.set(i * len + 0, 0, j * len + -0.5) // 下面
    meshFaces[4].position.set(i * len + 0.5, 0, j * len + 0) // 右面
    meshFaces[5].position.set(i * len + -0.5, 0, j * len + 0) // 左面

    meshFaces.forEach((mesh) => {
      scene.add(mesh)
    })
    // const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
    // 在XOZ平面上分布
  }
}

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10000)
scene.add(axesHelper)
//点光源位置
// renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', () => {
  // renderer.render(scene, camera) //执行渲染操作
  render()
}) //监听鼠标、键盘事件

const createCube = () => {
  
}

const init = () => {
  // 平行光
  const directionalLight = new THREE.DirectionalLight('#000', 1)
  // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
  directionalLight.position.set(1000, 100, 50)
  // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
  // directionalLight.target = mesh
  scene.add(directionalLight)
  const dirLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    5,
    0xff0000
  )
  scene.add(dirLightHelper)
  camera.position.set(500, 500, 500) // 设置摄像机位置
  // camera.rotation.set(200, 200, 200) // 旋转镜头
  camera.lookAt(0, 0, 0) //指向mesh对应的位置
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('pink')
  render()

  document.body.innerHTML = '<div id="app"></div>'
  document.body.appendChild(renderer.domElement)
  // renderer.render(scene, camera)
}
export const render = () => {
  // meshFaces.forEach((mesh) => {
  //   scene.add(mesh)
  // })
  renderer.render(scene, camera)
  // mesh.rotateY(0.01) //每次绕y轴旋转0.01弧度
  // requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
/* 




*/
init()
