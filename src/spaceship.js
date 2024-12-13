import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
camera.position.z = 20; // Adjust camera distance to fit the object

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 400);
renderer.setClearColor(0x202020); // Dark gray background for better contrast
renderer.shadowMap.enabled = true; // Enable shadows
document.getElementById("model-container").appendChild(renderer.domElement);

// Add ambient light (soft base light)
const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // Low-intensity ambient light
scene.add(ambientLight);

// Add a directional light (key light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Bright white light
directionalLight.position.set(100, 200, 150); // Position above and to the side
directionalLight.castShadow = true; // Enable shadows
directionalLight.shadow.mapSize.width = 1024; // Shadow resolution
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Add a spotlight (focused light on the model)
const spotLight = new THREE.SpotLight(0xffffff, 1.2); // Bright spotlight
spotLight.position.set(-150, 100, 100); // Position above and to the side
spotLight.angle = Math.PI / 6; // Narrow beam
spotLight.penumbra = 0.3; // Soft edges
spotLight.castShadow = true; // Enable shadows
spotLight.shadow.mapSize.width = 1024; // Shadow resolution
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

// Add a backlight (to illuminate edges and create separation from the background)
const backLight = new THREE.DirectionalLight(0xffffff, 0.8); // Softer intensity
backLight.position.set(-50, -50, -150); // Position behind the model
scene.add(backLight);

// Add an AxesHelper for debugging (can be removed later)
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// URLs for remote .obj and .mtl files
const objUrl = "https://storage.googleapis.com/arda-branding-assets/spaceship.obj";
const mtlUrl = "https://storage.googleapis.com/arda-branding-assets/spaceship.mtl";

// Load the MTL file
const mtlLoader = new MTLLoader();
mtlLoader.load(
    mtlUrl,
    (materials) => {
        materials.preload(); // Preload materials

        // Load the OBJ file with the materials
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials); // Set the loaded materials
        objLoader.load(
            objUrl,
            (object) => {
                object.scale.set(0.2, 0.2, 0.2); // Adjust scale for visibility
                object.position.set(0, 0, 0); // Center the object
                object.castShadow = true; // Enable shadows on the model
                object.receiveShadow = true; // Allow the model to receive shadows
                scene.add(object);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded for OBJ');
            },
            (error) => {
                console.error('An error occurred while loading the .obj model', error);
            }
        );
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded for MTL');
    },
    (error) => {
        console.error('An error occurred while loading the .mtl file', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the object (or the entire scene for now)
    scene.rotation.y += 0.005; // Adjust rotation speed

    renderer.render(scene, camera);
}

animate();