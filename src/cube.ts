import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

//开始

function initThree() {
  //...
}
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let light: THREE.AmbientLight
let cubes

function initCamera() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    2000
  )
  //...
}
function initScene() {
  scene = new THREE.Scene()
  scene.add(light)
  //...
}
function initLight() {
  // light = new THREE.DirectionalLight('#000', 1)
  // light.position.set(1000, 100, 50)
  light = new THREE.AmbientLight(0xffffff, 1)
  //...
}
function initObject() {
  //...
}
function render() {
  const root = document.querySelector('.webgl') as HTMLElement
  const renderer = new THREE.WebGL1Renderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  root.innerHTML = ''
  root.appendChild(renderer.domElement)
  renderer.render(scene, camera)
  //...
}

export function threeStart() {
  initThree()
  initCamera()
  initScene()
  initLight()
  initObject()
  render()
}
