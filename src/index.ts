import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

document.body.innerHTML = '<div id="app"></div>'

const renderer = new THREE.WebGLRenderer()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  3000
)
// 创建坐标系
const axesHelper = new THREE.AxesHelper(10000)
scene.add(axesHelper)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, 
})
// 长方体尺寸100, 100, 100
const geometry = new THREE.BoxGeometry(100, 100, 100)
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, 0)

renderer.setClearColor('pink')
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(20, 20, 500) // 设置摄像机位置
camera.lookAt(0, 0, 0) // 设置摄像机视点方向
scene.add(mesh)

renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', () => {
//   renderer.render(scene, camera);
// })
