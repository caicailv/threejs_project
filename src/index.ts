import * as THREE from 'three'
export const init = () => {
  // 创建场景
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGL1Renderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('hotpink')
  document.body.appendChild(renderer.domElement)
  // 相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(200, 200, 200)
  // camera.lookAt(0, 0, 0); //坐标原点
  // 创建几何体(长方体)
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  // 创建材质对象
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000, //0xff0000设置材质颜色为红色
  })
  // 创建网格模型
  const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  mesh.position.set(0, 10, 0)
  scene.add(mesh)
  camera.lookAt(mesh.position);//指向mesh对应的位置
}
