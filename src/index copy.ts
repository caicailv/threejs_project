import * as THREE from 'three'

const handleTouch = (camera, scene) => {
  // 定义动效对象
  let mouseX = 0
  let mouseY = 0
  const moveAnimate = {
    coordinates(clientX: number, clientY: number) {
      const limit = 270
      const limitNeg = limit * -1

      mouseX = clientX - window.innerWidth / 2
      mouseY = clientY - window.innerHeight / 2

      mouseX = mouseX >= limit ? limit : mouseX
      mouseX = mouseX <= limitNeg ? limitNeg : mouseX

      mouseY = mouseY >= limit ? limit : mouseY
      mouseY = mouseY <= limitNeg ? limitNeg : mouseY
      camera.position.x += (mouseX * -1 - camera.position.x) * 0.05
      camera.position.y += (mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)
    },
    onMouseMove(e: any) {
      moveAnimate.coordinates(e.clientX, e.clientY)
    },
  }
  document.addEventListener('mousemove', moveAnimate.onMouseMove)
}
export const init = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // 渲染器
  const renderer = new THREE.WebGLRenderer()
  // { antialias: true }
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('hotpink')
  document.body.appendChild(renderer.domElement)

  // 添加一个球体
  const cRadius = 100
  const geometry = new THREE.SphereGeometry(
    cRadius,
    cRadius * 6.4,
    cRadius * 6.4
  )

  // 纹理加载器对象
  const textureLoader = new THREE.TextureLoader()
  const textureSurface = textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-elevation.jpg")
  const textureSpecular = textureLoader.load(
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/249663/world-specular.jpg'
  )
  // 设置纹理贴图
  const material = new THREE.MeshLambertMaterial({
    map: textureSurface,
    specularMap: textureSpecular,
    // shininess: 80, // 高光部分的亮度
  })
  // 网格体 Mesh，两个参数分别为几何体和材质
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)
  // 设置相机的位置
  camera.position.set(0, 0, 220)
  // 设置相机焦点的方向
  camera.lookAt(scene.position)
  // 声明平行光
  const light = new THREE.DirectionalLight()
  // 设置平行光源位置
  light.position.set(0, 0, 1)
  // 将平行光源添加到场景中
  scene.add(light)
  // 声明点光源
  const point = new THREE.PointLight(0xeeeeee)
  // 设置点光源位置
  point.position.set(400, 200, 300)
  // 点光源添加到场景中
  scene.add(point)
  const createAnimRotation = () => {
    const speed = 0.005

    sphere.rotation.z += speed / 2
    sphere.rotation.y += speed
  }
  const render = () => {
    createAnimRotation()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
  handleTouch(camera, scene)
}
