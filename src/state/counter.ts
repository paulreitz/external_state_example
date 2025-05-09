import { createSignal } from 'solid-js';

const [count, setCount] = createSignal<number>(0);
const increment = () => setCount(count() + 1);

export { count, increment };