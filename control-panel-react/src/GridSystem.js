import * as THREE from "three";

/**
 * GridSystem
 * ----------
 * A reusable synthwave-style infinite grid built on top of THREE.GridHelper.
 * You can drop this into other Three.js scenes by:
 *
 *   const gridSystem = new GridSystem({ scene });
 *   gridSystem.update(dt);
 */
export class GridSystem {
  constructor({
    scene,
    size = 500,
    divisions = 10,
    color = 0xff00ff,
    opacity = 0.65,
    speed = 0.9,
  }) {
    this.scene = scene;
    this.speed = speed;
    this._baseSpeed = speed;

    const grid = new THREE.GridHelper(size, divisions, color, color);
    grid.material.opacity = opacity;
    grid.material.transparent = true;
    grid.material.blending = THREE.AdditiveBlending;
    grid.position.set(0, 3, 0);
    scene.add(grid);

    const glowGrid = new THREE.GridHelper(size, divisions, color, color);
    glowGrid.material.opacity = 0.2;
    glowGrid.material.transparent = true;
    glowGrid.material.blending = THREE.AdditiveBlending;
    glowGrid.position.set(0, 3.1, 0);
    scene.add(glowGrid);

    this.grid = grid;
    this.glowGrid = glowGrid;
    this.offset = 0;
    this.segmentLength = size / divisions; // world units between grid rows
  }

  setSpeed(multiplier) {
    this.speed = this._baseSpeed * multiplier;
  }

  setBaseSpeed(speed) {
    this._baseSpeed = speed;
    this.speed = speed;
  }

  update(delta) {
    const distance = this.speed * delta * 60; // normalize vs. 60fps
    this.offset += distance;
    // Using modulo keeps it "endless"
    this.grid.position.z = this.offset % (this.segmentLength * 2);
    this.glowGrid.position.z = this.grid.position.z;
  }
}
