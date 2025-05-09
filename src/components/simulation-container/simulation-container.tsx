import { Component, createSignal, onMount, onCleanup } from 'solid-js';
import styles from './simulation-container.module.scss';

import Simulation from '../../simulation/simulation';

const SimulationContainer: Component = () => {
    let simulation: Simulation | null = null;
    const [canvasID, _setCanvasID] = createSignal<string>('simulation-canvas');

    onMount(() => {
        if (!simulation) {
            simulation = new Simulation(canvasID());
        }
    });

    onCleanup(() => {
        if (simulation) {
            simulation.dispose();
            simulation = null;
        }
    });

    return (
        <div class={styles.container}>
            <canvas id={canvasID()} class={styles.canvas}></canvas>
        </div>
    );
}

export default SimulationContainer;