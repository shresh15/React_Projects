import { useState, useCallback,useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

//useRef hook
//take the reference of any element and bring changes in it
const passwordRef=useRef(null)

//password generator
//callback memories the function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz";

    if (numberAllowed) str = str + "0123456789";
    if (charAllowed) str = str + "!@#$%^&*_+={}[]~`";

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass =pass+ str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);
//setPassword is given because whrn password is given.. an infinite loop is created and instead of optimising it goes on changing
 
//Copying the password to clipboard
const copyPasswordtoClipboard =useCallback(() =>{
  //Getting a more optimised result that is color changes upon copying it
  passwordRef.current?.select()
  // declaring the range to get a more optimised result
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(password)
 },[password])

 //when the page is loaded.. this function is called
  useEffect(() => { 
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="  flex flex-col justify-between h-screen w-screen " >
      <h1 className=" content-between text-black-500 text-3xl font-serif font-medium text-center h-12 bg-gradient-to-r from-sky-700 to-indigo-200">
        Password Generator
      </h1>
      <div className="  h-full flex items-center space-y-7">
      <div className=" pb-8 outline outline-offset-2 outline-blue-500 mb-4 shadow-black-500/40 h-fit  w-full max-w-md mx-auto shadow-2xl rounded-lg ">
        <div className=" first-line:rounded-lg overflow-hidden mb-4 p-8">
          <input
            type="text"
            value={password}
            className=" outline-none auto-cols-max py-2 px-1 border-solid border-2 border-sky-500 flex-initial w-80 rounded-l-lg"
            placeholder="password"
            readOnly
            ref={passwordRef} 
          />
          <button 
          onClick={copyPasswordtoClipboard}
          className=" py-2 px-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-r-lg  ">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-lg font-medium">Length:{length}</label>
          </div>
          <div className="flex place-items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label  className="text-lg font-medium" htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex place-items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label  className="text-lg font-medium" htmlFor="charInput">Characters</label>
          </div>
        </div>
      
      </div>
    
      </div>
      </div>
  );
}

export default App;
