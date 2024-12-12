import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 5);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// ------

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();

// renderer.setSize(600, 400);
// document.getElementById("model-container").appendChild(renderer.domElement);

// // Add lighting to make the 3D model visible
// const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(10, 10, 10);
// scene.add(pointLight);

// // Position the camera
// camera.position.z = 5;

// // Load the OBJ model
// const objLoader = new THREE.OBJLoader();
// objLoader.load(
//     'SpaceShip_001.obj', 
//     function (object) {
//         object.scale.set(0.5, 0.5, 0.5); // Adjust the scale as needed
//         scene.add(object);
//     },
//     function (xhr) {
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Log the progress
//     },
//     function (error) {
//         console.error('An error occurred while loading the .obj model', error);
//     }
// );

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);

//     // Rotate the entire scene (including the loaded model)
//     scene.rotation.y += 0.01;

//     renderer.render(scene, camera);
// }

// animate();