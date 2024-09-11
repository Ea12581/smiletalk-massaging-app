import { useEffect, useRef, useState } from "react";

//the final bottom
function UsernameLog({setVal}) {

  const nameRef = useRef(null);
  function setName(){
    setVal(nameRef.current.value);
  }
  return (
    <>
      <div className="lable">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Username
            </span>
          </div>
          <input
            ref={nameRef}
            onKeyUp={() => {
              setName();
            }}
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </>
  );
}

export default UsernameLog;

