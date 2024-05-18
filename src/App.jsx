import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false) 
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) {
      str += "0123456789"
    }
    if(charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`"
    }

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)
    
  }, [length,numberAllowed,charAllowed,setpassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,49)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full h-[25vh] max-w-md px-4 py-3 mx-auto my-8 text-yellow-400 rounded-lg shadow-md bg-slate-700'>
      <h1 className='my-3 font-mono text-2xl font-bold text-center text-white'>Password Generator</h1>
        <div className='flex h-10 mt-6 mb-4 overflow-hidden rounded-lg shadow'>
          <input 
          type="text" 
          value={password}
          className='w-full px-3 py-1 outline-none'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}
          className='px-3 text-white bg-blue-700 outline-none py-0.5 shrink-0 '>Copy</button> 
          
        </div>
        <div className='flex text-sm gap-x-3'>
          <div className='flex items-center gap-x-2'>
            <input 
            type="range" 
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length} </label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input 
            type="checkbox" 
            defaultChecked = {charAllowed}
            id='characterInput'
            onChange={() => {
              setcharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
