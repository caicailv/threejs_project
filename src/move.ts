import * as THREE from 'three'

let isDragging = false
let startPosition = { x: 0, y: 0 }

const raycaster = new THREE.Raycaster()

const intersect = null // 表示转动魔方时手指触碰的小方块；
const normalize = null // 表示转动魔方时手指触碰的平面的法向量；
const targetRubik = null // 表示转动魔方时手指触碰的魔方；
const anotherRubik = null // 表示转动魔方时手指没触碰的魔方；

export const listenerMove = (camera: THREE.PerspectiveCamera) => {
  document.body.addEventListener('mousedown', (event) => {
    isDragging = true
    startPosition = { x: event.clientX, y: event.clientY }
  })
  document.body.addEventListener('mousemove', (event) => {
    if (!isDragging) return

    const mouse = new THREE.Vector2()
    mouse.x = event.clientX
    mouse.y = event.clientY
    raycaster.setFromCamera(mouse, camera)
    //   mouse.y = -(touch.clientY / this.height) * 2 + 1;
    //   mouse.y = -(touch.clientY / this.height) * 2 + 1;
    // 
  })

  document.body.addEventListener('mouseup', () => {
    isDragging = false
    startPosition = { x: 0, y: 0 }
  })
}

/* 
getIntersects(event) {
  var touch = event.touches[0];
  var mouse = new THREE.Vector2();
  mouse.x = (touch.clientX / this.width) * 2 - 1;
  mouse.y = -(touch.clientY / this.height) * 2 + 1;
  
  this.raycaster.setFromCamera(mouse, this.camera);
  
  var rubikTypeName;
  if (this.touchLine.screenRect.top > touch.clientY) {
      this.targetRubik = this.frontRubik;
      this.anotherRubik = this.endRubik;
      rubikTypeName = this.frontViewName;
  } else if (this.touchLine.screenRect.top + this.touchLine.screenRect.height < touch.clientY) {
      this.targetRubik = this.endRubik;
      this.anotherRubik = this.frontRubik;
      rubikTypeName = this.endViewName;
  }
  var targetIntersect;
  for (var i = 0; i < this.scene.children.length; i++) {
      if (this.scene.children[i].childType == rubikTypeName) {
          targetIntersect = this.scene.children[i];
          break;
      }
  }
  
  if (targetIntersect) {
      var intersects = this.raycaster.intersectObjects(targetIntersect.children);
      if (intersects.length >= 2) {
          if (intersects[0].object.cubeType === 'coverCube') {
              this.intersect = intersects[1];
              this.normalize = intersects[0].face.normal;
          } else {
              this.intersect = intersects[0];
              this.normalize = intersects[1].face.normal;
          }
      }
  }
}

*/
