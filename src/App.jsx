import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Memorygame from './components/Memorygame/Memorygame'
import File from './components/fileexplorer/file'
import data from './data.json'
function App() {
  const [count, setCount] = useState(0)
 const [tree, setTree] = useState(data);
  return (
    <>
     
      {/* <Memorygame /> */}
      <File  data={tree}
      tree={tree}
      setTree={setTree}/>
    </>
  )
}

export default App
