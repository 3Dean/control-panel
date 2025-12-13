declare module './GridSystem.js' {
  import * as THREE from 'three';
  export class GridSystem {
    constructor(scene: THREE.Scene, options?: object);
    update(time: number): void;
  }
}
