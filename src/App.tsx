import type { Component } from 'solid-js';
import styles from './App.module.scss';

import Display from './components/display/display';
import SimulationContainer from './components/simulation-container/simulation-container';

const App: Component = () => {
  return (
    <div class={styles.App}>
        <Display />
        <SimulationContainer />
    </div>
  );
};

export default App;
