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
const CubeTextureLoader = new THREE.CubeTextureLoader()

const colortexture = textureLoader.load('/textures/door/basecolor.jpg')
const alphatexture = textureLoader.load('/textures/door/opacity.jpg')
const heightTexture = textureLoader.load('/textures/door/height.png')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metallic.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const environmentTexture = CubeTextureLoader.load([
    '/textures/environmentMaps/1/px.png',
    '/textures/environmentMaps/1/nx.png',
    '/textures/environmentMaps/1/py.png',
    '/textures/environmentMaps/1/ny.png',
    '/textures/environmentMaps/1/pz.png',
    '/textures/environmentMaps/1/nz.png',
])

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

// const geometry = new THREE.BoxGeometry(1, 1, 1)

// const parameters = {
//     color: 0xff0000,
//     spin: () => {
//         gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2})
//     }
// };

// const material = new THREE.MeshBasicMaterial({ map: colortexture, wireframe: false })
// const material = new THREE.MeshBasicMaterial()
// material.map = colortexture
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = alphatexture
// material.side = THREE.DoubleSide
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(0.5, 0.5, 1);
// scene.add(mesh)

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// material.map = colortexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alphatexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentTexture

gui.add(material, 'metalness').min(0).max(1).step(0.01)
gui.add(material, 'roughness').min(0).max(1).step(0.01)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 3)
pointLight.position.x = 0.5
pointLight.position.y = 1
pointLight.position.z = 0.5
scene.add(pointLight)

// gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('elevation - x')
// gui.add(mesh.position, 'y', -3, 3, 0.01)
// gui.add(mesh.position, 'z', -3, 3, 0.01)

// gui.add(mesh, 'visible')

// gui.add(material, 'wireframe')

// gui.addColor(parameters, 'color')
// .onChange(() => {
//     material.color.set(parameters.color)
// })

// gui.add(parameters, 'spin')

// window.addEventListener('keydown', (e) => {
//     if(e.key === 'h') {
//         if(gui._hidden)
//             gui.show()
//         else 
//             gui.hide()    
//     }
// })

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

// mesh.rotation.reorder('ZYX')

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
// controls.enableDamping = true

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // mesh.rotation.x = elapsedTime;

    renderer.render(scene, camera)

    controls.update();

    window.requestAnimationFrame(tick)
}

tick()