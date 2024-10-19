import React, { useMemo, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook";

export const ExampleComponent: React.FC = () => {
    const [count, setCount] = useState(0);
    const squaredCount = useMemo(() => count * 2, [count])
  
    const ref = useHotkeys('b', () => setCount(squaredCount + 1), [squaredCount])
    return (
      <div>
        <span ref={ref} tabIndex={-1}>Pressed the 'b' key {squaredCount} times.</span>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    )
}
