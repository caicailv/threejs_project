import * as THREE from 'three'
// 创建场景
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer()

// 相机
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.3,
  400,
)
// camera.position.set(200, 200, 200)
camera.position.set(100, 0, 0)

// camera.lookAt(0, 0, 0); //坐标原点
// 创建几何体(长方体)
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 创建材质对象
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, //0xff0000设置材质颜色为红色
  transparent: true, //开启透明
  opacity: 0.2,
})
// 纹理加载器对象
// const textureLoader = new THREE.TextureLoader()
// const textureSurface = textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-elevation.jpg")
// const textureSpecular = textureLoader.load(
//   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-specular.jpg'
// )
// 设置纹理贴图
// const material = new THREE.MeshLambertMaterial({
//   map: textureSurface,
//   specularMap: textureSpecular,
//   // shininess: 80, // 高光部分的亮度
// })
console.log('material', material)
// 创建网格模型
const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
mesh.position.set(0, 10, 0)
scene.add(mesh)
camera.lookAt(mesh.position) //指向mesh对应的位置

// 创建坐标系
const axesHelper = new THREE.AxesHelper(320)
scene.add(axesHelper)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('green')
document.body.innerHTML = ''
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)
export const init = () => {
  renderer.render(scene, camera)
}
