import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
//Read about useCallBack array and useEffect Array
function App() {
  let [length,setLength] = useState(8);
  let [numAllowed,setNumAllowed] = useState(false);
  let [charAllowed,setCharAllowed] = useState(false);
  let [output,setOutput] = useState("")


  // function changeLength(event){
  //   setLength(event.target.value);
  // }
  // function changeNumAllowed(){
  //   setNumAllowed(~numAllowed);
  //   if(numAllowed){
  //     document.querySelector("#b1").innerHTML = "Without numbers"
  //   }
  //   else{
  //     document.querySelector("#b1").innerHTML = "With numbers"
  //   }
  // }
  // function changeCharAllowed(){
  //   setCharAllowed(~charAllowed);
  //   if(charAllowed){
  //     document.querySelector("#b2").innerHTML = "Without special characters"
  //   }
  //   else{
  //     document.querySelector("#b2").innerHTML = "With special characters"
  //   }
  // }

  //useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(output)
  },[output])
  let generate = useCallback(() => {

    let options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed)
      options += "0123456789"
    if(charAllowed)
      options += "!@#$%^&*()_+="

    let result = "";
    for(let i=0;i<length;i++){
      let idx = Math.floor(Math.random()*(options.length+1));
      // let idx=4 
      result += options.charAt(idx);
    }
    setOutput(result)
          console.log(result+" executed")
        } , [length,numAllowed,charAllowed,setOutput])

        useEffect(()=>{generate()},[length,numAllowed,charAllowed])
  return (
    <div>
      <h1 className='text-center text-4xl'>Password Generator</h1> 
      <input type='text' value={output} placeholder='Password' readOnly ref={passwordRef}/>
      <button onClick={copyPasswordToClipboard}>Copy</button><br />
      {/* <input type="number" placeholder='Size' value={length} onChange={changeLength}/>
      <button id="b1" onClick={changeNumAllowed}>With Numbers</button>
      <button id="b2" onClick={changeCharAllowed}>With Special Characters</button> */}

      <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
      <label>Length : {length}</label><br />
      <input type='checkbox' defaultChecked={numAllowed} id='numberInput' onChange={() => {
        setNumAllowed((prev) => !prev)
      }}/>
      <label htmlFor="numberInput">Numbers </label><br />
      <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => {
        setCharAllowed((prev) => !prev)
      }}/>
      <label htmlFor="numberInput">Characters </label>
    </div> 
  )
}

export default App
