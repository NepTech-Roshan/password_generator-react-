import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
const [length,setLength] = useState(8);
const [numberAllowed,setNumberAllowed] = useState(false);
const [charAllowed,setCharAllowed] = useState(false);
const [password,setPassword] = useState();
 const passwordRef = useRef(null);

const passwordGenerator = useCallback(()=>{
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if(numberAllowed) str += '1234567890';
  if(charAllowed) str += '@#$_&-+()/*":!?;';
  for(let i=1;i<=length;i++){
    const char = Math.floor(Math.random() * str.length+1);
    pass += str.charAt(char);
  }
  setPassword(pass);
},[length,numberAllowed,charAllowed,setPassword]);

useEffect(()=>{
  passwordGenerator();
},[length,numberAllowed,charAllowed,passwordGenerator])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(password)
},[password])

  return (
    <>
    <div className="w-full max-w-lg h-52  px-10 py-3 rounded shadow text-orange-400 bg-gray-700 ">
    <h1 className="py-1 text-3xl">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input 
    type="text" 
    value={password}
    className="px-3 py-1 outline-none w-full text-black"
    placeholder="Password"
    readOnly
    ref={passwordRef}
    />
    <button  
    onClick={copyPasswordToClipboard}
    className="px-6 py-2 bg-blue-700 text-white font-bold">Copy</button>
    </div>
    <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
    <input 
    type="range"
    min={8}
    max={30}
    value={length}
    className="cursor-pointer"
    onChange={(e)=>{setLength(e.target.value)}}
    />
    <label>Label : {length}</label>
    </div>
   <div className="flex items-center gap-x-1">
   <input 
   type="checkbox"
   defaultChecked={numberAllowed}
   onChange={()=>{
     setNumberAllowed((prev)=>!prev);
   }}
   />
   <label>Number</label>
   </div>
      <div className="flex items-center gap-x-1">
   <input 
   type="checkbox"
   defaultChecked={charAllowed}
   onChange={()=>{
     setCharAllowed((prev)=>!prev);
   }}
   />
   <label>Characters</label>
    </div>
    </div>
    </div>
  </>
  )
}

export default App
