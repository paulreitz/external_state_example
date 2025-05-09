import * as THREE from "three";
import { increment } from "../state/counter";

export default class CubeScene {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private cube: THREE.Mesh;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private animationFrameId: number;

    constructor(canvasID: string) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById(canvasID) as HTMLCanvasElement,
        });

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.setupCube();
        this.setupCamera();
        this.setupLights();
        this.addEventListeners();
        this.animate();
        this.onWindowResize();
    }

    private setupCube(): void {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x80d8ff });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    private setupCamera(): void {
        this.camera.position.z = 5;
    }

    private setupLights(): void {
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    private addEventListeners(): void {
        window.addEventListener("resize", this.onWindowResize.bind(this));
        window.addEventListener("click", this.onMouseClick.bind(this));
    }

    private onWindowResize(): void {
        const canvas = this.renderer.domElement;
        const parent = canvas.parentElement;

        if (parent) {
            const width = parent.clientWidth;
            const height = parent.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }

    private onMouseClick(event: MouseEvent): void {
        const canvas = this.renderer.domElement;
        const rect = canvas.getBoundingClientRect();

        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.cube);

        if (intersects.length > 0) {
            this.handleCubeClick();
        }
    }

    private handleCubeClick(): void {
        increment();
    }

    private animate(): void {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }

    public dispose(): void {
        cancelAnimationFrame(this.animationFrameId);

        window.removeEventListener("resize", this.onWindowResize.bind(this));
        window.removeEventListener("click", this.onMouseClick.bind(this));

        const geometry = this.cube.geometry;
        const material = this.cube.material as THREE.Material;

        geometry.dispose();
        material.dispose();

        this.scene.remove(this.cube);
        this.renderer.dispose();
    }
}
