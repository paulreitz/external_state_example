import { Component } from "solid-js";
import styles from "./display.module.scss";

import { count } from "../../state/counter";

const Display: Component = () => {
    return (
        <div class={styles.container}>
            <div class={styles.title}>Cube Clicks:</div>
            <div class={styles.count}>{count()}</div>
        </div>
    );
};

export default Display;