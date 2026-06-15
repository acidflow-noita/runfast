import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const containerId = 'threejs-container-fbx-model';
const container = document.getElementById(containerId);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbb4d00);

const aspectRatio = container.clientWidth / container.clientHeight || 16 / 9;
const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth || 800, container.clientHeight || 450);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Lighting setup with high quality shadows
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 8, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
keyLight.shadow.camera.near = 0.1;
keyLight.shadow.camera.far = 50;
keyLight.shadow.camera.left = -10;
keyLight.shadow.camera.right = 10;
keyLight.shadow.camera.top = 10;
keyLight.shadow.camera.bottom = -10;
keyLight.shadow.bias = -0.0001;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
fillLight.position.set(-3, 3, -5);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
rimLight.position.set(-5, 5, -8);
scene.add(rimLight);

const topLight = new THREE.PointLight(0xffffff, 0.3, 30);
topLight.position.set(0, 10, 0);
scene.add(topLight);

// Orbit controls with auto-rotate
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

// Stop auto-rotate when user interacts
controls.addEventListener('start', () => {
    controls.autoRotate = false;
});

// Set initial camera position
camera.position.set(6, 4, 8);

// Group to hold the model
let modelGroup = null;

// Load FBX file
const loader = new FBXLoader();
const fbxPath = './assets/webrender/fbx/Mic%20Tally%20Enclosure.fbx';

loader.load(
    fbxPath,
    (object) => {
        // Enable shadows on all meshes (keep original materials)
        object.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Get bounding box first
        const box = new THREE.Box3().setFromObject(object);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // Scale to fit
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        object.scale.setScalar(scale);

        // Recompute after scale
        box.setFromObject(object);
        box.getCenter(center);

        // Center the object
        object.position.x = -center.x;
        object.position.y = -center.y;
        object.position.z = -center.z;

        // Wrap in a group for rotation
        modelGroup = new THREE.Group();
        modelGroup.add(object);

        // Rotate to match expected orientation (Z-up to Y-up, then rotate to show front)
        modelGroup.rotation.x = -Math.PI / 2;
        modelGroup.rotation.z = Math.PI;

        scene.add(modelGroup);

        // Update camera and controls
        camera.position.set(5, 3, 5);
        controls.target.set(0, 0, 0);
        controls.update();
    },
    undefined,
    (error) => {
        console.error('Error loading FBX:', error);
    }
);

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
