import { useState } from 'react'
import reactLogo from './assets/react.svg'
import handleSubmit from './handles/handlesubmit';
import { useRef } from 'react';
import './App.css'
import Signup from './Signup';

function App() {
  const [count, setCount] = useState(0)
  const dataRef = useRef()

    const submithandler = (e) => {
        e.preventDefault()
        handleSubmit(dataRef.current.value)
        dataRef.current.value = ""
      }

  return (
    <div className="App">
      <Signup/>

      <form onSubmit={submithandler}>
        <input type= "text" ref={dataRef} />
        <button type = "submit">Save</button>
      </form>
    </div>
    
  )
}

export default App