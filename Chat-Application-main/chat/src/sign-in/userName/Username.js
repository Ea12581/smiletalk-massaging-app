import { useEffect, useRef, useState } from "react";

//the final bottom
function Username({setIsReady,setVal}) {
  //get the input
  const nameRef = useRef(null);

  //check if ready to submit
  const setUser = () => {
    const name = nameRef.current.value
    if( name != ''){
      setIsReady(true);
      setVal(name);
    }else{
      setIsReady(false);
    }

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
              setUser();
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

export default Username;
