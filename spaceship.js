import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
camera.position.z = 120; // Adjust camera distance to fit the object

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 400);
renderer.shadowMap.enabled = true; // Enable shadows
document.getElementById("model-container").appendChild(renderer.domElement);

// Add ambient light (soft base light)
const ambientLight = new THREE.AmbientLight(0x404040, 80.0); // Low-intensity ambient light
scene.add(ambientLight);

// Add a directional light (key light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 80.0); // Bright white light
directionalLight.position.set(100, 200, 150); // Position above and to the side
directionalLight.castShadow = true; // Enable shadows
directionalLight.shadow.mapSize.width = 1024; // Shadow resolution
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Add a spotlight (focused light on the model)
const spotLight = new THREE.SpotLight(0xffffff, 80.0); // Bright spotlight
spotLight.position.set(-150, 100, 100); // Position above and to the side
spotLight.angle = Math.PI / 6; // Narrow beam
spotLight.penumbra = 0.3; // Soft edges
spotLight.castShadow = true; // Enable shadows
spotLight.shadow.mapSize.width = 1024; // Shadow resolution
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);

// Add a backlight (to illuminate edges and create separation from the background)
const backLight = new THREE.DirectionalLight(0xffffff, 80.0); // Softer intensity
backLight.position.set(-50, -50, -150); // Position behind the model
scene.add(backLight);

// GLB file URL
const glbUrl = "https://storage.googleapis.com/arda-branding-assets/spaceship.glb";

// Load the GLB file
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    glbUrl,
    (gltf) => {
        const model = gltf.scene; // Access the loaded model
        model.scale.set(5, 5, 5); // Adjust scale for visibility
        model.position.set(0, 0, 0); // Center the model
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true; // Enable shadows on meshes
                child.receiveShadow = true; // Allow meshes to receive shadows
            }
        });
        scene.add(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded for GLB");
    },
    (error) => {
        console.error("An error occurred while loading the GLB model", error);
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