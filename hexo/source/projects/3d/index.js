// https://cdnjs.cloudflare.com/ajax/libs/three.js/104/three.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js

let scene, camera, container, GL_Renderer
let materials = {}, lights = {}, objects = {}

let FOV = 75

/*---[ HELPERS ]---*/
function moveObject(object, x, y, z) {
    object.position.x += x
    object.position.y += y
    object.position.z += z
}

function rotateObject(object, x, y, z) {
    object.rotateX(x)
    object.rotateY(y)
    object.rotateZ(z)
}

function setScale(object, scale) {
    object.scale.x = object.scale.y = object.scale.z = scale
}

/*---[ EVENTS ]---*/
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    GL_Renderer.setSize(window.innerWidth, window.innerHeight)
}

function Start() {
    window.addEventListener("resize", onWindowResize, false)
    container = document.getElementById("3dView")

    // Scene
    {
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000)
        scene.fog = new THREE.Fog(0xffffff, 0, 750)
    }

    // Camera
    {
        camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 10000)
        moveObject(camera, 0, 0, 500)
        scene.add(camera)
    }

    // Lights
    {
        lights.ambientLight = new THREE.AmbientLight(0x404040, 0.3)
        moveObject(lights.ambientLight, 10, 10, 10)
        scene.add(lights.ambientLight)

        lights.one = new THREE.DirectionalLight(0x00ffff, 0.3)
        lights.one.position = camera.position
        scene.add(lights.one)

        lights.mainLight = new THREE.DirectionalLight(0xaabbff, 0.7)
        moveObject(lights.mainLight, 0, 10, 20)
        scene.add(lights.mainLight)
    }

    // Material
    {
        materials.main = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
        })
        materials.wire = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            wireframe: true
        })
    }

    // Objects
    {
        objects.rotatingGeo = {}
        objects.rotatingGeo.main = new THREE.Mesh(new THREE.IcosahedronGeometry(8, 1), materials.main)
        setScale(objects.rotatingGeo.main, 15)
        scene.add(objects.rotatingGeo.main)

        let outerGeo = new THREE.IcosahedronBufferGeometry(15, 1)
        objects.rotatingGeo.outer = new THREE.Mesh(outerGeo, materials.wire)
        setScale(objects.rotatingGeo.outer, 10)
        scene.add(objects.rotatingGeo.outer)

        let vertices = outerGeo.attributes.position.array;
        for (let k=0; k<vertices.length; k+=3) {
            let vertexSphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 5, 5), materials.main);
            vertexSphere.applyMatrix(new THREE.Matrix4().makeTranslation(vertices[k],vertices[k+1],vertices[k+2]));
            objects.rotatingGeo.outer.add(vertexSphere);
        }
    }

    // Renderer
    {
        GL_Renderer = new THREE.WebGLRenderer({antialias: true, alpha: true })
        GL_Renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1)
        GL_Renderer.setSize(window.innerWidth, window.innerHeight)
        GL_Renderer.autoClear = false
        GL_Renderer.setClearColor(0x000000, 0.0)
        container.appendChild(GL_Renderer.domElement)
    }
}

function Update() {
    requestAnimationFrame(Update)

    rotateObject(objects.rotatingGeo.main, 0.002, 0.003, 0)
    rotateObject(objects.rotatingGeo.outer, 0.001, 0.003, 0)

    GL_Renderer.render(scene, camera)
}

window.onload = () => {
    Start()
    Update()
}
