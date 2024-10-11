import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getCourseName, Course } from '../../backend/src/canvasApiTest'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    getCourseName('1016~HrEEmUtZyBQ4xhJeC38WVRQU9wEEFkhFBQWH3NAN7ccFm2AM6tmD9wfxNJVXtHf7').then(setCourse);
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <br></br>
        {
          course && <p>{course.name}</p>
        }
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
