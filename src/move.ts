import * as THREE from 'three'

let isRotating = false // 魔方是否在转动
let startPoint = null as THREE.Vector3 | null
const raycaster = new THREE.Raycaster()
let intersect = null // 表示转动魔方时手指触碰的小方块；
let normalize = null // 表示转动魔方时手指触碰的平面的法向量；
const targetRubik = null // 表示转动魔方时手指触碰的魔方；
const anotherRubik = null // 表示转动魔方时手指没触碰的魔方；
let camera: THREE.PerspectiveCamera | null = null
let scene: THREE.Scene | null = null
/* 
this.xLine = new THREE.Vector3(1, 0, 0);
this.xLineAd = new THREE.Vector3(-1, 0, 0);
this.yLine = new THREE.Vector3(0, 1, 0);
this.yLineAd = new THREE.Vector3(0, -1, 0);
this.zLine = new THREE.Vector3(0, 0, 1);
this.zLineAd = new THREE.Vector3(0, 0, -1);
*/

export const listenerMove = (
  pScene: THREE.Scene,
  pCamera: THREE.PerspectiveCamera
) => {
  camera = pCamera
  scene = pScene
  document.body.addEventListener('mousedown', mouseDown)
  document.body.addEventListener('mouseup', mouseUp)
}
const getIntersects = (event: MouseEvent) => {
  if (camera === null || scene === null) return
  const mouse = new THREE.Vector2()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  if (!intersects.length) return
  if (!intersects[0]) return
  if ((intersects[0].object as any).cubeType === 'coverCube') {
    intersect = intersects[1]
    normalize = intersects[0]?.face?.normal
  } else {
    intersect = intersects[0]
    normalize = intersects[1]?.face?.normal
  }
  return intersect
}

const mouseDown = (event: MouseEvent) => {
  const intersect = getIntersects(event)
  if (!intersect) return
  if (isRotating) return
  startPoint = intersect.point
  document.body.addEventListener('mousemove', mouseMove)

  // 拿到滑动向量
  // const movePosition = { x: event.clientX, y: event.clientY }
}
const mouseMove = (event: MouseEvent) => {
  // const intersect = getIntersects(event)
  // movePoint = intersect.point
  // console.log('movePoint',movePoint);
}
const mouseUp = (event: MouseEvent) => {
  const intersect = getIntersects(event)
  if (!intersect) return
  const upPoint = intersect.point
  document.body.removeEventListener('mousemove', mouseMove)

  const sub = upPoint.sub(startPoint!)
  getDirection(sub)
}

const getDirection = (sub: THREE.Vector3) => {
  /* Rubik.js 第190行至第196行 */
  /* 
var xAngle = sub.angleTo(this.xLine);
var xAngleAd = sub.angleTo(this.xLineAd);
var yAngle = sub.angleTo(this.yLine);
var yAngleAd = sub.angleTo(this.yLineAd);
var zAngle = sub.angleTo(this.zLine);
var zAngleAd = sub.angleTo(this.zLineAd);
var minAngle = Math.min.apply(null, [xAngle, xAngleAd, yAngle, yAngleAd, zAngle, zAngleAd]);//最小夹角


*/

  const directions = {
    xLine: new THREE.Vector3(1, 0, 0),
    xLineAd: new THREE.Vector3(-1, 0, 0),
    yLine: new THREE.Vector3(0, 1, 0),
    yLineAd: new THREE.Vector3(0, -1, 0),
    zLine: new THREE.Vector3(0, 0, 1),
    zLineAd: new THREE.Vector3(0, 0, -1),
  }
  const minAngle = Math.min(
    ...Object.keys(directions).map((key) =>
      sub.angleTo(directions[key as keyof typeof directions])
    )
  )
  console.log('minAngle', minAngle)
}
