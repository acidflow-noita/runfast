import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const containerId = 'threejs-container-3d-model';
const container = document.getElementById(containerId);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const aspectRatio = container.clientWidth / container.clientHeight || 16 / 9;
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth || 800, container.clientHeight || 450);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight1.position.set(1, 1, 1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-1, -1, -1);
scene.add(directionalLight2);

// Load STL file
const loader = new STLLoader();
loader.load('./assets/webrender/stl/Mic Tally Enclosure.stl', (geometry) => {
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a73e8,
        metalness: 0.3,
        roughness: 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Center the geometry
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    mesh.position.sub(center);

    // Scale to fit view
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 100 / maxDim;
    mesh.scale.set(scale, scale, scale);

    scene.add(mesh);

    // Position camera based on model size
    camera.position.set(80, 60, 120);
    camera.lookAt(0, 0, 0);
});

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

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