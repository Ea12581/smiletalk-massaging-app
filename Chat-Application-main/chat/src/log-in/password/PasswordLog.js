import { useRef, useState, useEffect } from "react";


function PasswordLog({ setVal}) {
  const passRef = useRef(null);
  function setPass(){
    setVal(passRef.current.value);
  }

  //check if this name exists or match to this password
  

  return (
    <>
      <div className="container  lable">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Password
            </span>
          </div>
          <input
            ref={passRef}
            onKeyUp={() => {
              setPass();
            }}
            type="password"
            className="form-control"
            aria-label="password"
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </div>
    </>
  );
}

export default PasswordLog;

 