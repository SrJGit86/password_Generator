import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumallowed] = useState(false)
  const [charAllowed, setCharallowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=> {
    let pass = "";
    let str = "ABCDEFCHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += '123456789';
    if(charAllowed) str += '!@#$%^&*(){}[]_/~'
    
    for(let i=1 ; i<=length ; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length , numAllowed , charAllowed , setPassword])

  const copyPasteClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length , numAllowed , charAllowed , passwordGenerator])
  

  return (
    <div className='flex w-full justify-center align-middle bg-orange-800 h-screen'>
      <div className='flex-col justify-center align-middle bg-black w-4/5 rounded-xl my-auto py-4'>
      <h1 className='text-white text-center my-3 text-4xl'>Password generator</h1>
        <div className='flex justify-center'>
          <input 
          className='w-1/2 py-1 px-3 outline-none rounded-xl'
          type="text"
          value={password}
          placeholder='password'
          ref={passwordRef}
          readOnly
           />
          <button
          onClick={copyPasteClipboard}
           className=' bg-lime-700 text-white py-1 px-3 rounded-xl'>Copy</button>
        </div>
        <div className='flex justify-around text-white my-4'>
          <div className='flex gap-1 align-middle '>
          <input
          onChange={(e) => {setLength(e.target.value)}}
          min={8}
          max={100}
          value={length}
          className='cursor-pointer' 
          type="range" />
          <label>range: {length}</label>
          </div>
          <div className='flex gap-1 align-middle '>
          <input
          onChange={() => {
            setNumallowed((prev) => !prev)
          }}
          defaultChecked={numAllowed}
          type="checkbox" />
          <label >number included</label>
          </div>
          <div className='flex gap-1 align-middle '>
          <input
          onChange={() => {
            setCharallowed((prev) => !prev)
          }}
          defaultChecked={charAllowed} 
          type="checkbox" />
          <label >character included</label>
          </div>
        </div>
      
     </div>
    </div>
     
  )
}

export default App
