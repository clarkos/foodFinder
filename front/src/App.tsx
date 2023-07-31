import { useState } from 'react';
import { Button } from './components/ui/button';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)} variant="destructive">
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-blue-700 ">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
