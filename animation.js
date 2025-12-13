import * as THREE from "three";
import { GridSystem } from "./GridSystem.js";

export function initAnimation(container) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  
  const { width: initialW, height: initialH } = container.getBoundingClientRect();
  renderer.setSize(initialW, initialH);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x007385, 0.04);

  const camera = new THREE.PerspectiveCamera(
    65,
    initialW / initialH,
    0.1,
    2000
  );
  camera.position.set(0, 14, 26);
  camera.lookAt(0, -6, 0);

  const light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(10, 40, 10);
  scene.add(light);

  const fill = new THREE.AmbientLight(0x402060, 0.85);
  scene.add(fill);

  const gridSystem = new GridSystem({
    scene,
    size: 400,
    divisions: 40,
    color: 0x5cbcf0,
    opacity: 0.6,
    speed: 0.2, // Slowest speed
  });


  let prevTime = performance.now();

  function handleResize() {
    const { width, height } = container.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function renderLoop(now) {
    requestAnimationFrame(renderLoop);
    const delta = (now - prevTime) / 1000;
    prevTime = now;

    gridSystem.update(delta);
    renderer.render(scene, camera);
  }

  requestAnimationFrame(renderLoop);
  window.addEventListener("resize", handleResize);
}
