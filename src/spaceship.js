import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 680 / 400, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(680, 400);

document.getElementById("model-container").appendChild(renderer.domElement);

// Add lighting to make the 3D model visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Position the camera
camera.position.z = 250;

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// const objUrl = new URL("assets/SpaceShip_001.obj", import.meta.url);
// const mtlUrl = new URL("assets/SpaceShip_001.mtl", import.meta.url);

const objUrl = new URL("https://storage.googleapis.com/arda-branding-assets/SpaceShip_001.obj",
    import.meta.url
);

// Load the OBJ model
const objLoader = new OBJLoader();
objLoader.load(
    objUrl, 
    function (object) {
        object.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Log the progress
    },
    function (error) {
        console.error('An error occurred while loading the .obj model', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire scene (including the loaded model)
    scene.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();