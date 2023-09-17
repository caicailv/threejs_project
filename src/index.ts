import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { createCube } from './cube'
// 创建场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer({
  antialias:true,
})

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  10000
)

// 创建坐标系
const axesHelper = new THREE.AxesHelper(2000)
scene.add(axesHelper)
createCube(scene)

const controls = new OrbitControls(camera, renderer.domElement)
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', () => {
  // renderer.render(scene, camera) //执行渲染操作
  render()
}) //监听鼠标、键盘事件

const init = () => {
  // 平行光
  // const directionalLight = new THREE.DirectionalLight('#000', 1)
  // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
  // directionalLight.position.set(1000, 100, 50)
  camera.position.set(500, 500, 500) // 设置摄像机位置
  camera.lookAt(0, 0, 0) //指向mesh对应的位置
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('pink')
  render()

  document.body.innerHTML = '<div id="app"></div>'
  document.body.appendChild(renderer.domElement)
}
export const render = () => {
  renderer.render(scene, camera)
}
/* 




*/
init()
