import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const containerId = 'threejs-container-3d-model';
const container = document.getElementById(containerId);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const aspectRatio = container.clientWidth / container.clientHeight || 16 / 9;
const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth || 800, container.clientHeight || 450);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Lighting setup (matching STLPileViewer)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Main key light
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 8, 5);
keyLight.castShadow = true;
scene.add(keyLight);

// Fill light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight.position.set(-3, 3, -5);
scene.add(fillLight);

// Rim/back light
const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
rimLight.position.set(-5, 5, -8);
scene.add(rimLight);

// Top point light for depth
const topLight = new THREE.PointLight(0xffffff, 0.3, 30);
topLight.position.set(0, 10, 0);
scene.add(topLight);

// Orbit controls - initialized before model loads
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0);

// Load STL file
const loader = new STLLoader();
loader.load('./assets/webrender/stl/Mic Tally Enclosure.stl', (geometry) => {
    // Center the geometry at origin
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
        color: 0x1a73e8,
        roughness: 0.5,
        metalness: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Scale based on bounding box
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;
    mesh.scale.set(scale, scale, scale);

    scene.add(mesh);

    // Set orbit target to model center and position camera
    controls.target.set(0, 0, 0);
    camera.position.set(6, 4, 8);
    controls.update();
});

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();
