import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import { reactive } from 'vue'

// export const formData = reactive({
//   camera: {
//     position: {
//       x: 200,
//       y: 200,
//       z: 200,
//     },
//     rotation: {
//       x: 0,
//       y: 0,
//       z: 0,
//     },
//   },
// })
// 创建场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer()

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  30000
)
// camera.position.set(200, 200, 200)
// camera.position.set(100, 0, 0)

// camera.lookAt(0, 0, 0); //坐标原点
// 创建几何体(长方体)
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 创建材质对象
//MeshBasicMaterial不受光照影响
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000, //0xff0000设置材质颜色为红色
//   transparent: true, //开启透明
//   opacity: 0.2,
// })
//MeshLambertMaterial受光照影响

const textures = [
  new THREE.TextureLoader().load('/public/1.jpg'),
  new THREE.TextureLoader().load('/public/2.jpg'),
  new THREE.TextureLoader().load('/public/3.jpg'),
  new THREE.TextureLoader().load('/public/4.jpg'),
  new THREE.TextureLoader().load('/public/5.jpg'),
  new THREE.TextureLoader().load('/public/6.jpg'),
]

textures.sort(() => Math.random() - 0.5)

const materials = textures.map((texture) => {
  return new THREE.MeshBasicMaterial({ map: texture })
})
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// const geometry = new THREE.BoxGeometry(100, 100, 100);
//材质对象Material

for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    const meshFaces = []

    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(
        geometry,
        materials[randomIntFromInterval(0, 5)]
      )
      meshFaces.push(mesh)
    }

    meshFaces[0].position.set(i * 200 + 0, 0.5, j * 200 + 0) // 前面
    meshFaces[1].position.set(i * 200 + 0, -0.5, j * 200 + 0) // 后面
    meshFaces[2].position.set(i * 200 + 0, 0, j * 200 + 0.5) // 上面
    meshFaces[3].position.set(i * 200 + 0, 0, j * 200 + -0.5) // 下面
    meshFaces[4].position.set(i * 200 + 0.5, 0, j * 200 + 0) // 右面
    meshFaces[5].position.set(i * 200 + -0.5, 0, j * 200 + 0) // 左面

    meshFaces.forEach((mesh) => {
      scene.add(mesh)
    })
    console.log('meshFaces', meshFaces)
    // const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
    // 在XOZ平面上分布
  }
}
camera.lookAt(0, 0, 0) //指向mesh对应的位置

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10000)
scene.add(axesHelper)
//点光源位置
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  renderer.render(scene, camera) //执行渲染操作
}) //监听鼠标、键盘事件
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
// scene.add(pointLightHelper)
export const init = () => {
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
  const ambient = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambient)
  camera.position.set(200, 200, 200)
  camera.rotation.set(200, 200, 200)

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('pink')
  let root = document.querySelector('.webgl') as HTMLElement
  root.innerHTML = ''
  root.appendChild(renderer.domElement)
  renderer.render(scene, camera)
  render()
}

export const render = () => {
  console.log('aaaa')
  renderer.render(scene, camera)
  // mesh.rotateY(0.01) //每次绕y轴旋转0.01弧度
  // requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
