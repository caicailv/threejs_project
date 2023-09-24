import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { createCube } from './cube'
import { listenerMove } from './move'

// 创建场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer({
  antialias: true,
})
export const render = () => {
  renderer.render(scene, camera)
}
const getCamer = () => {
  return new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )
}
let camera = getCamer()

const cube = createCube(scene)
const init = () => {
  document.body.innerHTML = ''
  camera.position.set(500, 500, 500) // 设置摄像机位置
  camera.lookAt(0, 0, 0) //指向mesh对应的位置
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('pink')
  render()

  document.body.innerHTML = '<div id="app"></div>'
  document.body.appendChild(renderer.domElement)
  listenerMove(scene, camera)
}

const animate = () => {
  requestAnimationFrame(() => {
    // while (deadline.timeRemaining() > 0) {
    // 在空闲时间内执行任务

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    render()
    animate()
    // }
  })
}
// 镜头
// const controls = new OrbitControls(camera, renderer.domElement)
// // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
// controls.addEventListener('change', render)

// 创建坐标系
// const axesHelper = new THREE.AxesHelper(2000)
// scene.add(axesHelper)
//魔方

init()
window.addEventListener('resize', () => {
  console.log('resize')
  // camera = getCamer()
  init()
})
