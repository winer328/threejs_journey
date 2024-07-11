import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Textures
 * */ 
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('onStart')
}
loadingManager.onLoaded = () => {
    console.log('onLoaded')
}
loadingManager.onProgress = () => {
    console.log('onProgress')
}
loadingManager.onError = () => {
    console.log('onError')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colortexture = textureLoader.load('/panda.jpg')
const alphatexture = textureLoader.load('/textures/door/opacity.jpg')
const heightTexture = textureLoader.load('/textures/door/height.png')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metallic.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// colortexture.repeat.x = 2
// colortexture.repeat.y = 3

// colortexture.wrapS = THREE.MirroredRepeatWrapping
// colortexture.wrapT = THREE.MirroredRepeatWrapping

// colortexture.offset.x = 0.5
// colortexture.offset.y = 0.5

// colortexture.rotation = Math.PI * 0.25

colortexture.generateMipmaps = false
colortexture.minFilter = THREE.NearestFilter
colortexture.magFilter = THREE.NearestFilter

// const geometry = new THREE.BufferGeometry()

// const count = 5000
// const positionArray = new Float32Array(count * 3 * 3)
// for(let i = 0; i < count * 3 * 3; i++) {
//     positionArray[i] = (Math.random() - 0.5) * 4
// }

// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute('position', positionAttribute)

const canvas = document.querySelector('canvas.webgl')

const gui = new GUI({ width: 500 })

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2})
    }
};

const material = new THREE.MeshBasicMaterial({ map: colortexture, wireframe: false })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(0.5, 0.5, 1);
scene.add(mesh)

gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('elevation - x')
gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.position, 'z', -3, 3, 0.01)

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

gui.addColor(parameters, 'color')
.onChange(() => {
    material.color.set(parameters.color)
})

gui.add(parameters, 'spin')

window.addEventListener('keydown', (e) => {
    if(e.key === 'h') {
        if(gui._hidden)
            gui.show()
        else 
            gui.hide()    
    }
})

// const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

mesh.rotation.reorder('ZYX')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExistFullscreen) {
            document.webkitExistFullscreen()
        }
    }
})

const controls = new OrbitControls(camera, canvas)
// controls.enabled = false
controls.enableDamping = true

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.x = elapsedTime;

    renderer.render(scene, camera)

    controls.update();

    window.requestAnimationFrame(tick)
}

tick()